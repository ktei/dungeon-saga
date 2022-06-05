import { emitter } from '@/events/hub'
import { SEND_DATA } from '@/events/types'
import Phaser from 'phaser'
import { io, Socket } from 'socket.io-client'

class Game extends Phaser.Game {
  private socket!: Socket

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  protected start(): void {
    this.socket = io('http://localhost:4000', { transports: ['websocket'] })
    emitter.on(SEND_DATA, this.sendData)
    super.start()
  }

  private sendData = (data: unknown) => {
    this.socket.emit('message', data)
  }

  destroy(removeCanvas: boolean, noReturn?: boolean): void {
    if (this.socket) {
      this.socket.disconnect()
    }
    emitter.off(SEND_DATA, this.sendData)
    super.destroy(removeCanvas, noReturn)
  }
}

export default Game
