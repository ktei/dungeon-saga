import { emitter } from '@/events/bus'
import Phaser from 'phaser'
import { io, Socket } from 'socket.io-client'

class Game extends Phaser.Game {
  private socket!: Socket

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  protected start(): void {
    this.socket = io('http://localhost:4000')
    emitter.on('message', this.handleMessage)
    super.start()
  }

  private handleMessage = (data: unknown) => {
    this.socket.emit('message', data)
  }

  destroy(removeCanvas: boolean, noReturn?: boolean): void {
    if (this.socket) {
      this.socket.disconnect()
    }
    emitter.off('message', this.handleMessage)
    super.destroy(removeCanvas, noReturn)
  }
}

export default Game
