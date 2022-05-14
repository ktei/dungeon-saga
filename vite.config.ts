import { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  resolve: {
    alias: {
      '@root': path.join(__dirname, 'src')
    }
  }
}

export default config
