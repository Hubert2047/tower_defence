import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js'
import { I_explosion } from '../../types/interface.js'
import ExplosionProjectile from './index.js'

export default class ThunderExplosion extends ExplosionProjectile {
    name: string
    constructor({
        position,
        offset = { x: -10, y: -10 },
        width = 140,
        height = 140,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: I_explosion) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/explosions/thunder/thunder.png',
                    maxX: 4,
                    maxY: 1,
                    holdTime: 2,
                },
            },
        }
        super({
            name: 'Thunder Explosion',
            explosionType: E_explosion.THUNDER,
            position,
            initFrames,
            offset,
            width,
            height,
            behaviorKey,
            angelKey,
        })
        this.name = 'Thunder Explosion'
    }
}
