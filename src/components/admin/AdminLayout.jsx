import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { LayoutDashboard, FolderOpen, Image, MessageSquare, Settings as SettingsIcon, LogOut, Menu, X } from 'lucide-react'
import FloatingElements from '../ui/FloatingElements'
import { useSiteContent } from '../../hooks/useSiteContent'
import Dashboard from './Dashboard'
import CategoryManager from './CategoryManager'
import ArtworkManager from './ArtworkManager'
import MessageCenter from './MessageCenter'
import Settings from './Settings'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'categories', label: 'Categories', icon: FolderOpen },
  { id: 'artworks', label: 'Artworks', icon: Image },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const setIsAdmin = useStore((s) => s.setIsAdmin)
  const { content } = useSiteContent()

  const switchTab = (id) => { setActiveTab(id); setSidebarOpen(false) }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />
      case 'categories': return <CategoryManager />
      case 'artworks': return <ArtworkManager />
      case 'messages': return <MessageCenter />
      case 'settings': return <Settings />
      default: return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-canvas flex relative">
      <div className="canvas-vignette" />
      <FloatingElements />

      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed top-4 left-4 z-50 bg-charcoal text-canvas p-2 rounded-lg">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-60 sm:w-64 canvas-card border-r border-charcoal/10 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 sm:p-6 border-b border-charcoal/10 flex items-center gap-3">
          <img
            src={content.logo_url}
            alt="Logo"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <p className="font-jack text-xs text-charcoal/40">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 sm:p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => switchTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-jack text-sm transition-colors ${
                  activeTab === tab.id ? 'bg-charcoal text-canvas' : 'text-charcoal/60 hover:bg-charcoal/5'
                }`}
              >
                <Icon size={18} />{tab.label}
              </button>
            )
          })}
        </nav>
        <div className="p-3 sm:p-4 border-t border-charcoal/10">
          <a href="/" className="block text-center font-jack text-xs text-charcoal/40 hover:text-charcoal mb-3">← View Portfolio</a>
          <button onClick={() => setIsAdmin(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-jack text-sm text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={16} />Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto min-h-screen relative z-10">{renderContent()}</main>
    </div>
  )
}