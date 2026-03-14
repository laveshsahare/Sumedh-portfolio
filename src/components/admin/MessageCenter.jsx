import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Mail, MailOpen, Trash2 } from 'lucide-react'

export default function MessageCenter() {
  const [messages, setMessages] = useState([])
  const [selected, setSelected] = useState(null)

  const load = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (data) setMessages(data)
  }

  useEffect(() => { load() }, [])

  const markRead = async (msg) => {
    if (!msg.is_read) { await supabase.from('messages').update({ is_read: true }).eq('id', msg.id); await load() }
    setSelected(msg)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    await supabase.from('messages').delete().eq('id', id)
    if (selected?.id === id) setSelected(null)
    await load()
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-medium text-charcoal mb-8">Messages</h2>
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="font-sans text-sm text-charcoal/40 text-center py-16">No messages yet.</p>
          ) : messages.map((msg) => (
            <button key={msg.id} onClick={() => markRead(msg)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${selected?.id === msg.id ? 'bg-charcoal/5 border-charcoal/20' : 'bg-white border-charcoal/5'}`}>
              <div className="flex items-start gap-3">
                {msg.is_read ? <MailOpen size={16} className="text-charcoal/30 mt-0.5 shrink-0" /> : <Mail size={16} className="text-charcoal mt-0.5 shrink-0" />}
                <div className="min-w-0 flex-1">
                  <p className={`font-sans text-sm truncate ${msg.is_read ? 'text-charcoal/60' : 'text-charcoal font-medium'}`}>{msg.name}</p>
                  <p className="font-sans text-xs text-charcoal/40 truncate">{msg.subject || msg.message.slice(0, 50)}</p>
                  <p className="font-sans text-xs text-charcoal/25 mt-1">{new Date(msg.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="md:col-span-3">
          {selected ? (
            <div className="bg-white rounded-xl p-6 border border-charcoal/5">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-sans text-lg font-medium text-charcoal">{selected.name}</h3>
                  <p className="font-sans text-sm text-charcoal/40">{selected.email}</p>
                  {selected.subject && <p className="font-sans text-sm text-charcoal/60 mt-1">Re: {selected.subject}</p>}
                </div>
                <button onClick={() => handleDelete(selected.id)} className="text-charcoal/30 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
              <div className="border-t border-charcoal/5 pt-4">
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <p className="font-sans text-xs text-charcoal/25 mt-6">Received: {new Date(selected.created_at).toLocaleString()}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-charcoal/5">
              <p className="font-sans text-sm text-charcoal/30">Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}