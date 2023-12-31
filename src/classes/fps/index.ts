import { FPS } from '../../constants/index.js'
type T_RequestAnimationFrame = {
    loopFunction: () => void
}
export default class RequestAnimationFrame {
    private loopFunction: () => void
    private lastTime: number
    private currentTime: number
    constructor({ loopFunction }: T_RequestAnimationFrame) {
        this.loopFunction = loopFunction
        this.lastTime = performance.now()
        this.currentTime = performance.now()
    }
    public start(): void {
        this.currentTime = performance.now()
        const distance = this.currentTime - this.lastTime
        if (distance > 1000 / FPS) {
            this.loopFunction()
            this.lastTime = this.currentTime
        }
        requestAnimationFrame(() => {
            this.start()
        })
    }
}
