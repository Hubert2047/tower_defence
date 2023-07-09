import { T_frame, T_position } from '../../types/index.js'
import Sprite from '../sprite/index.js'

interface props {
    position: T_position
    offset: T_position
    width?: number
    height?: number
    imageSources: HTMLImageElement[]
    frame: T_frame
}
export default class ExplosionProjectile extends Sprite {
    constructor({ position, offset, imageSources, frame, width = 50, height = 50 }: props) {
        super({ position, offset, width, height, frame, imageSources })
    }
    public update(): void {
        this.draw({ sourceIndex: 0 })
    }
}
