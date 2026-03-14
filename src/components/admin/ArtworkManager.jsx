import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Upload, Trash2, X } from 'lucide-react'

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', category_id: '', file: null })

  const load = async () => {
    const [artRes, catRes] = await Promise.all([
      supabase.from('artworks').select('*, categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('sort_order'),
    ])
    if (artRes.data) setArtworks(artRes.data)
    if (catRes.data) setCategories(catRes.data)
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!form.file || !form.title || !form.category_id) { alert('Fill title, category, and select file.'); return }
    setUploading(true)
    try {
      const fileExt = form.file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
      const filePath = `uploads/${fileName}`
      const { error: uploadErr } = await supabase.storage.from('artworks').upload(filePath, form.file)
      if (uploadErr) throw uploadErr
      const { data: urlData } = supabase.storage.from('artworks').getPublicUrl(filePath)
      const { error: insertErr } = await supabase.from('artworks').insert([{
        title: form.title, description: form.description, image_url: urlData.publicUrl, storage_path: filePath, category_id: form.category_id,
      }])
      if (insertErr) throw insertErr
      setForm({ title: '', description: '', category_id: '', file: null })
      setShowUpload(false)
      await load()
    } catch (err) { alert('Upload failed: ' + err.message) }
    finally { setUploading(false) }
  }

  const handleDelete = async (art) => {
    if (!confirm(`Delete "${art.title}"?`)) return
    if (art.storage_path) await supabase.storage.from('artworks').remove([art.storage_path])
    await supabase.from('artworks').delete().eq('id', art.id)
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-medium text-charcoal">Artworks</h2>
        <button onClick={() => setShowUpload(true)} className="flex items-center gap-2 bg-charcoal text-canvas px-5 py-2.5 rounded-lg font-sans text-sm hover:bg-pitch transition-colors">
          <Upload size={16} />Upload
        </button>
      </div>
      {showUpload && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-medium">Upload Artwork</h3>
              <button onClick={() => setShowUpload(false)} className="text-charcoal/40 hover:text-charcoal"><X size={20} /></button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <input type="text" placeholder="Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
                className="w-full border border-charcoal/10 rounded-lg px-4 py-2.5 font-sans text-sm outline-none focus:border-charcoal/30" />
              <textarea placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                className="w-full border border-charcoal/10 rounded-lg px-4 py-2.5 font-sans text-sm outline-none resize-none" />
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required
                className="w-full border border-charcoal/10 rounded-lg px-4 py-2.5 font-sans text-sm outline-none bg-white">
                <option value="">Select Category *</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="border-2 border-dashed border-charcoal/10 rounded-lg p-6 text-center">
                <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} required className="font-sans text-sm" />
              </div>
              <button type="submit" disabled={uploading}
                className="w-full bg-charcoal text-canvas py-3 rounded-lg font-sans text-sm hover:bg-pitch transition-colors disabled:opacity-50">
                {uploading ? 'Uploading...' : 'Upload Artwork'}
              </button>
            </form>
          </div>
        </div>
      )}
      {artworks.length === 0 ? (
        <p className="font-sans text-sm text-charcoal/40 text-center py-16">No artworks yet. Click Upload to add your first piece.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map((art) => (
            <div key={art.id} className="group relative bg-white rounded-lg overflow-hidden border border-charcoal/5">
              <div className="aspect-square"><img src={art.image_url} alt={art.title} className="w-full h-full object-cover" /></div>
              <div className="p-3">
                <p className="font-sans text-sm font-medium text-charcoal truncate">{art.title}</p>
                <p className="font-sans text-xs text-charcoal/40">{art.categories?.name}</p>
              </div>
              <button onClick={() => handleDelete(art)}
                className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}