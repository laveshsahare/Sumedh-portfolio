import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const defaults = {
  logo_url: '/logo.png',
  profile_image_url: '/artist.png',
  artist_name: 'Sumedh Gaikwad',
  about_text: "Hi, I'm Sumedh Gaikwad, a digital artist and storyteller. I create character designs, illustrations, and comics inspired by animation, history, and fantasy. Using my iPad and Procreate, I focus on bringing unique stories and imaginative worlds to life through visual art.",
  instagram_url: '',
  youtube_url: '',
  linkedin_url: '',
  whatsapp_number: '',
  whatsapp_message: 'Hi Sumedh! I saw your portfolio and would love to connect.',
}

export function useSiteContent() {
  const [content, setContent] = useState(defaults)
  const [loading, setLoading] = useState(true)

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from('site_content')
        .select('*')
        .limit(1)
        .single()

      if (data) {
        setContent({
          logo_url: data.logo_url || defaults.logo_url,
          profile_image_url: data.profile_image_url || defaults.profile_image_url,
          artist_name: data.artist_name || defaults.artist_name,
          about_text: data.about_text || defaults.about_text,
          instagram_url: data.instagram_url || defaults.instagram_url,
          youtube_url: data.youtube_url || defaults.youtube_url,
          linkedin_url: data.linkedin_url || defaults.linkedin_url,
          whatsapp_number: data.whatsapp_number || defaults.whatsapp_number,
          whatsapp_message: data.whatsapp_message || defaults.whatsapp_message,
        })
      }
    } catch (err) {
      console.log('Using default site content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return { content, loading, refetch: fetchContent }
}