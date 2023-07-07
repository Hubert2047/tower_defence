import { position } from '@/types/index'
import context2D from '../../context2D/index.js'
export default class Sprite {
    public position: position
    public width: number
    public height: number
    private imageSources: HTMLImageElement[]
    private frameMaxX: number
    private frameMaxY: number
    private frameTime: number
    private countFrameTime: number
    private cropPosition: position
    public offset: position
    constructor({
        position = { x: 0, y: 0 },
        offset = { x: 0, y: 0 },
        width = 200,
        height = 200,
        imageSources,
        frameMaxX = 1,
        frameMaxY = 1,
        frameTime = 4,
    }: {
        position: position
        offset?: position
        width?: number
        height?: number
        imageSources: HTMLImageElement[]
        frameMaxX?: number
        frameMaxY?: number
        frameTime?: number
    }) {
        this.position = position
        this.offset = offset
        this.width = width
        this.height = height
        this.frameMaxX = frameMaxX
        this.frameMaxY = frameMaxY
        this.frameTime = parseInt(frameTime.toString())
        this.imageSources = imageSources
        this.cropPosition = { x: 0, y: 0 }
        this.countFrameTime = 0
    }
    protected draw(sourceIndex: number): void {
        if (context2D) {
            context2D.drawImage(
                this.imageSources[sourceIndex],
                (this.cropPosition.x * this.imageSources[sourceIndex].width) / this.frameMaxX,
                (this.cropPosition.y * this.imageSources[sourceIndex].height) / this.frameMaxY,
                this.imageSources[sourceIndex].width / this.frameMaxX,
                this.imageSources[sourceIndex].height / this.frameMaxY,
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
        if (this.countFrameTime === this.frameTime) {
            this.countFrameTime = 0
            if (this.cropPosition.x === this.frameMaxX - 1 && this.cropPosition.y === this.frameMaxY - 1) {
                this.cropPosition = { x: 0, y: 0 }
            } else if (this.cropPosition.x === this.frameMaxX - 1) {
                this.cropPosition.x = 0
                this.cropPosition.y++
            } else {
                this.cropPosition.x++
            }
        }
    }
}
