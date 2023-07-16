import GameMap from '../gameMap/index.js'

type T_RequestAnimationFrame = {
    loopFunction: ({ gameMap }: { gameMap: GameMap }) => void
    fps: number
}
export default class RequestAnimationFrame {
    loopFunction: ({ gameMap }: { gameMap: GameMap }) => void
    fps: number
    lastTime: number
    currentTime: number
    constructor({ loopFunction, fps }: T_RequestAnimationFrame) {
        this.loopFunction = loopFunction
        this.fps = fps
        this.lastTime = Date.now()
        this.currentTime = Date.now()
    }
    public start({ gameMap }: { gameMap: GameMap }) {
        this.currentTime = Date.now()
        const distance = this.currentTime - this.lastTime
        if (distance > 1000 / this.fps) {
            this.loopFunction({ gameMap })
            this.lastTime = this.currentTime
        }
        requestAnimationFrame(() => {
            this.start({ gameMap })
        })
    }
}
