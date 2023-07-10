import context2D from '../../context2D/index.js'
import { T_frame, T_position, T_Sprite } from '../../types/index.js'
interface props {}
export default class Sprite {
    public position: T_position
    public width: number
    public height: number
    private imageSources: HTMLImageElement[]
    public frame: T_frame
    private countFrameTime: number
    public cropPosition: T_position
    public offset: T_position
    constructor({ position, offset = { x: 0, y: 0 }, width = 128, height = 128, imageSources, frame }: T_Sprite) {
        this.position = position
        this.offset = offset
        this.width = width
        this.height = height
        this.frame = frame
        this.imageSources = imageSources
        this.cropPosition = { x: 0, y: 0 }
        this.countFrameTime = 0
    }
    public draw({ sourceIndex }: { sourceIndex: number }): void {
        if (context2D) {
            context2D.drawImage(
                this.imageSources[sourceIndex],
                (this.cropPosition.x * this.imageSources[sourceIndex].width) / this.frame.maxX,
                (this.cropPosition.y * this.imageSources[sourceIndex].height) / this.frame.maxY,
                this.imageSources[sourceIndex].width / this.frame.maxX,
                this.imageSources[sourceIndex].height / this.frame.maxY,
                this.position.x - this.offset.x,
                this.position.y - this.height + this.offset.y,
                this.width,
                this.height
            )
            this.updateFrameIndex()
        }
    }
    updateFrameIndex() {
        this.countFrameTime++
        if (this.countFrameTime === this.frame.holdTime) {
            this.countFrameTime = 0
            if (this.cropPosition.x === this.frame.maxX - 1 && this.cropPosition.y === this.frame.maxY - 1) {
                this.cropPosition = { x: 0, y: 0 }
            } else if (this.cropPosition.x === this.frame.maxX - 1) {
                this.cropPosition.x = 0
                this.cropPosition.y++
            } else {
                this.cropPosition.x++
            }
        }
    }
}
