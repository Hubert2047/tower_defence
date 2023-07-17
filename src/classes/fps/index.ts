import { FPS } from '../../constants/index.js'
import GameMap from '../gameMap/index.js'
type T_RequestAnimationFrame = {
    loopFunction: ({ gameMap }: { gameMap: GameMap }) => void
}
export default class RequestAnimationFrame {
    loopFunction: ({ gameMap }: { gameMap: GameMap }) => void
    lastTime: number
    currentTime: number
    constructor({ loopFunction }: T_RequestAnimationFrame) {
        this.loopFunction = loopFunction
        this.lastTime = performance.now()
        this.currentTime = performance.now()
    }
    public start({ gameMap }: { gameMap: GameMap }) {
        this.currentTime = performance.now()
        const distance = this.currentTime - this.lastTime
        if (distance > 1000 / FPS) {
            this.loopFunction({ gameMap })
            this.lastTime = this.currentTime
        }
        requestAnimationFrame(() => {
            this.start({ gameMap })
        })
    }
}
