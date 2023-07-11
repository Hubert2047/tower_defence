import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_explosion, T_frame } from '../../types/index.js'
import Sprite from '../sprite/index.js'

export default class ExplosionProjectile extends Sprite {
    public name: string
    public explosionType: E_explosion
    constructor({
        name,
        explosionType,
        position,
        offset = { x: 0, y: 0 },
        initFrames,
        width = 50,
        height = 50,
    }: T_explosion) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames })
        this.name = name
        this.explosionType = explosionType
    }
    public update(): void {
        this.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    }
}
