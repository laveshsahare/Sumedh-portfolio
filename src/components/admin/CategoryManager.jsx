import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'

export default function CategoryManager() {
  const [categories, setCategories] = useState([])
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    if (data) setCategories(data)
  }

  useEffect(() => { load() }, [])

  const createSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setLoading(true)
    const { error } = await supabase.from('categories').insert([{ name: newName.trim(), slug: createSlug(newName.trim()), sort_order: categories.length + 1 }])
    if (!error) { setNewName(''); await load() } else alert('Error: ' + error.message)
    setLoading(false)
  }

  const handleRename = async (id) => {
    if (!editName.trim()) return
    await supabase.from('categories').update({ name: editName.trim(), slug: createSlug(editName.trim()) }).eq('id', id)
    setEditingId(null); setEditName(''); await load()
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return
    await supabase.from('categories').delete().eq('id', id)
    await load()
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-medium text-charcoal mb-8">Categories</h2>
      <form onSubmit={handleCreate} className="flex gap-3 mb-8">
        <input type="text" placeholder="New category name..." value={newName} onChange={(e) => setNewName(e.target.value)}
          className="flex-1 bg-white border border-charcoal/10 rounded-lg px-4 py-2.5 font-sans text-sm outline-none focus:border-charcoal/30" />
        <button type="submit" disabled={loading || !newName.trim()}
          className="flex items-center gap-2 bg-charcoal text-canvas px-5 py-2.5 rounded-lg font-sans text-sm hover:bg-pitch transition-colors disabled:opacity-50">
          <Plus size={16} />Add
        </button>
      </form>
      <div className="space-y-2">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-charcoal/5">
            {editingId === cat.id ? (
              <>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus
                  className="flex-1 bg-transparent border-b border-charcoal/20 py-1 font-sans text-sm outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleRename(cat.id)} />
                <button onClick={() => handleRename(cat.id)} className="text-green-600 p-1"><Check size={16} /></button>
                <button onClick={() => { setEditingId(null); setEditName('') }} className="text-charcoal/40 p-1"><X size={16} /></button>
              </>
            ) : (
              <>
                <span className="flex-1 font-sans text-sm text-charcoal">{cat.name}</span>
                <span className="font-sans text-xs text-charcoal/30 mr-2">{cat.slug}</span>
                <button onClick={() => { setEditingId(cat.id); setEditName(cat.name) }} className="text-charcoal/30 hover:text-charcoal p-1"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(cat.id, cat.name)} className="text-charcoal/30 hover:text-red-500 p-1"><Trash2 size={14} /></button>
              </>
            )}
          </div>
        ))}
      </div>
      {categories.length === 0 && <p className="font-sans text-sm text-charcoal/40 text-center py-8">No categories yet.</p>}
    </div>
  )
}