import { position } from '@/types/index'
import context2D from '../context2D/index.js'
export default class Sprite {
    public position: position
    private width: number
    private image: HTMLImageElement
    private height: number
    private frameMax: number
    private frameTime: number
    private countFrameTime: number
    private currentFrameIndex: number
    constructor({
        position = { x: 0, y: 0 },
        width = 100,
        height = 100,
        imageSrc,
        frameMax = 1,
        frameTime = 5,
    }: {
        position: position
        width?: number
        height?: number
        imageSrc: string
        frameMax?: number
        frameTime?: number
    }) {
        this.position = position
        this.width = width
        this.height = height
        this.image = new Image()
        this.frameMax = frameMax
        this.frameTime = frameTime
        this.image.src = imageSrc
        this.currentFrameIndex = 0
        this.countFrameTime = 0
    }
    protected draw() {
        if (context2D) {
            context2D.drawImage(
                this.image,
                (this.currentFrameIndex * this.image.width) / this.frameMax,
                0,
                this.image.width / this.frameMax,
                this.image.height,
                this.position.x - this.width / 2,
                this.position.y - this.height / 2,
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
            if (this.currentFrameIndex === this.frameMax - 1) {
                this.currentFrameIndex = 0
            } else {
                this.currentFrameIndex++
            }
        }
    }
}