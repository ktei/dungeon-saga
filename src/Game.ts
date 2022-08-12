import { Direction } from '@/components/types'
import { RECEIVE_DATA, SEND_DATA } from '@/events/constants'
import { emitter } from '@/events/hub'
import Phaser from 'phaser'
import { io, Socket } from 'socket.io-client'

class Game extends Phaser.Game {
  private socket!: Socket

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config)
  }

  protected start(): void {
    this.socket = io('http://localhost:4000', { transports: ['websocket'] })
    this.socket.on('data', this.receiveData)
    emitter.on(SEND_DATA, this.sendData)
    super.start()
  }

  private sendData = (data: unknown) => {
    this.socket.emit('data', data)
  }

  private receiveData = (data: Record<number, Direction>) => {
    emitter.emit(RECEIVE_DATA, data)
  }

  destroy(removeCanvas: boolean, noReturn?: boolean): void {
    if (this.socket) {
      this.socket.off('data', this.receiveData)
      this.socket.disconnect()
    }
    emitter.off(SEND_DATA, this.sendData)
    super.destroy(removeCanvas, noReturn)
  }
}

export default Game
