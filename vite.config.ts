import path from 'path'
import { UserConfig } from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '@/anims': path.join(__dirname, 'src', 'anims'),
      '@/characters': path.join(__dirname, 'src', 'characters'),
      '@/components': path.join(__dirname, 'src', 'components'),
      '@/npcs': path.join(__dirname, 'src', 'npcs'),
      '@/scenes': path.join(__dirname, 'src', 'scenes'),
      '@/constants': path.join(__dirname, 'src', 'constants'),
      '@/events': path.join(__dirname, 'src', 'events')
    }
  }
}

export default config
