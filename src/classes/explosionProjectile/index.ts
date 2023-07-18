import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_explosion, T_frame } from '../../types/index.js'
import Sprite from '../sprite/index.js'

export default class ExplosionProjectile extends Sprite {
    public name: string
    public explosionType: E_explosion
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    constructor({
        name,
        explosionType,
        position,
        offset = { x: 0, y: 0 },
        initFrames,
        width = 50,
        height = 50,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: T_explosion) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames })
        this.name = name
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.explosionType = explosionType
    }
    public update(): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    get hasFinishedAnimation() {
        const currentExplosionFrame = this.currentFrame
        if (!currentExplosionFrame) return false
        return (
            this.cropPosition.x === currentExplosionFrame.maxX - 1 &&
            this.cropPosition.y === currentExplosionFrame.maxY - 1
        )
    }
}
