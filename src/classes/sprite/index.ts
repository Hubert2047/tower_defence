import context2D from '../../context2D/index.js'
import { T_frame, T_position, T_sprite } from '../../types/index.js'
export default class Sprite {
    public position: T_position
    public width: number
    public height: number
    public frames: Map<string, Map<string, T_frame>>
    private countFrameTime: number
    public cropPosition: T_position
    public currentFrame: T_frame | null
    private currentBehaviorKey: string | null
    private currentAngelKey: string | null
    public offset: T_position
    public opacity: number
    constructor({ position, offset = { x: 0, y: 0 }, width = 128, height = 128, frames, opacity = 1 }: T_sprite) {
        this.position = position
        this.offset = offset
        this.width = width
        this.height = height
        this.frames = frames
        this.currentFrame = null
        this.currentBehaviorKey = null
        this.opacity = opacity
        this.currentAngelKey = null
        this.cropPosition = { x: 0, y: 0 }
        this.countFrameTime = 0
    }
    public draw({ behaviorKey, angelKey }: { behaviorKey: string; angelKey: string }): void {
        if (context2D) {
            const currentBehavior = this.frames.get(behaviorKey)
            if (!currentBehavior) return
            const currentFrame = currentBehavior.get(angelKey)

            if (!currentFrame) return
            if (this.currentBehaviorKey !== behaviorKey || angelKey !== this.currentAngelKey) {
                this.cropPosition = { x: 0, y: 0 }
            }
            this.currentAngelKey = angelKey
            this.currentBehaviorKey = behaviorKey
            this.currentFrame = currentFrame
            context2D.globalAlpha = this.opacity
            context2D.drawImage(
                currentFrame.image,
                (this.cropPosition.x * currentFrame.image.width) / currentFrame.maxX,
                (this.cropPosition.y * currentFrame.image.height) / currentFrame.maxY,
                currentFrame.image.width / currentFrame.maxX,
                currentFrame.image.height / currentFrame.maxY,
                this.position.x - this.offset.x,
                this.position.y - this.height + this.offset.y,
                this.width,
                this.height
            )
            context2D.globalAlpha = 1
            this.updateFrame(currentFrame)
        }
    }
    updateFrame(currentFrame: T_frame): void {
        this.countFrameTime++
        if (this.countFrameTime >= currentFrame.holdTime) {
            this.countFrameTime = 0
            if (this.cropPosition.x >= currentFrame.maxX - 1 && this.cropPosition.y >= currentFrame.maxY - 1) {
                this.cropPosition = { x: 0, y: 0 }
                return
            }
            if (this.cropPosition.x >= currentFrame.maxX - 1) {
                this.cropPosition.x = 0
                this.cropPosition.y++
                return
            }
            this.cropPosition.x++
        }
    }
}
