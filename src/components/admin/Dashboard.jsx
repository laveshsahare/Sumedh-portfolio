import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Image, FolderOpen, MessageSquare, Eye } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({ artworks: 0, categories: 0, messages: 0, unread: 0 })
  const [recent, setRecent] = useState([])

  useEffect(() => {
    async function load() {
      const [artRes, catRes, msgRes, unreadRes, recentRes] = await Promise.all([
        supabase.from('artworks').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }),
        supabase.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('artworks').select('*, categories(name)').order('created_at', { ascending: false }).limit(5),
      ])
      setStats({ artworks: artRes.count || 0, categories: catRes.count || 0, messages: msgRes.count || 0, unread: unreadRes.count || 0 })
      if (recentRes.data) setRecent(recentRes.data)
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Artworks', value: stats.artworks, icon: Image, color: 'bg-blue-50 text-blue-600' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, color: 'bg-amber-50 text-amber-600' },
    { label: 'Messages', value: stats.messages, icon: MessageSquare, color: 'bg-green-50 text-green-600' },
    { label: 'Unread', value: stats.unread, icon: Eye, color: 'bg-red-50 text-red-600' },
  ]

  return (
    <div>
      <h2 className="font-jack text-xl sm:text-2xl text-charcoal mb-6 sm:mb-8">Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="canvas-card rounded-xl p-4 sm:p-5">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${card.color} flex items-center justify-center mb-2 sm:mb-3`}>
                <Icon size={18} />
              </div>
              <p className="font-jack text-xl sm:text-2xl text-charcoal">{card.value}</p>
              <p className="font-jack text-[10px] sm:text-xs text-charcoal/40 mt-1">{card.label}</p>
            </div>
          )
        })}
      </div>
      <h3 className="font-jack text-xs sm:text-sm text-charcoal/60 uppercase tracking-wider mb-3 sm:mb-4">Recent Uploads</h3>
      {recent.length === 0 ? (
        <p className="font-jack text-sm text-charcoal/40">No artworks uploaded yet.</p>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {recent.map((art) => (
            <div key={art.id} className="flex items-center gap-3 sm:gap-4 canvas-card rounded-lg p-2.5 sm:p-3">
              <img src={art.image_url} alt={art.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-jack text-xs sm:text-sm text-charcoal truncate">{art.title}</p>
                <p className="font-jack text-[10px] sm:text-xs text-charcoal/40">{art.categories?.name || 'Uncategorized'}</p>
              </div>
              <p className="font-jack text-[10px] sm:text-xs text-charcoal/30 hidden sm:block">{new Date(art.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}