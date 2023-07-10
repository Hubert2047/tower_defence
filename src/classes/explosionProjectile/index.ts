import { E_explosion } from '../../enum/index.js'
import { createImageSources } from '../../helper/index.js'
import { T_explosion } from '../../types/index.js'
import Sprite from '../sprite/index.js'

export default class ExplosionProjectile extends Sprite {
    public name: string
    public explosionType: E_explosion
    constructor({
        name,
        explosionType,
        position,
        offset = { x: 0, y: 0 },
        imageSourceString,
        frame,
        width = 50,
        height = 50,
    }: T_explosion) {
        const imageSources: HTMLImageElement[] = createImageSources(imageSourceString)
        super({ position, offset, width, height, frame, imageSources })
        this.name = name
        this.explosionType = explosionType
    }
    public update(): void {
        this.draw({ sourceIndex: 0 })
    }
}
