import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js'
import { I_explosion } from '../../types/interface.js'
import ExplosionProjectile from './index.js'

export default class DestroyExplosion extends ExplosionProjectile {
    name: string
    constructor({
        position,
        offset = { x: 120, y: -25 },
        width = 192,
        height = 192,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: I_explosion) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/explosions/destroy/destroy.png',
                    maxX: 10,
                    maxY: 1,
                    holdTime: 2,
                },
            },
        }
        super({
            name: 'Destroy Explosion',
            explosionType: E_explosion.DESTROY,
            position,
            initFrames,
            offset,
            width,
            height,
            behaviorKey,
            angelKey,
        })
        this.name = 'Destroy Explosion'
    }
}
