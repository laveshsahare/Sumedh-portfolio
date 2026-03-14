import { create } from 'zustand'

export const useStore = create((set) => ({
  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),

  isAdmin: !!localStorage.getItem('lc_admin'),
  setIsAdmin: (v) => {
    if (v) localStorage.setItem('lc_admin', 'true')
    else localStorage.removeItem('lc_admin')
    set({ isAdmin: v })
  },

  activeCategory: 'all',
  setActiveCategory: (c) => set({ activeCategory: c }),
}))