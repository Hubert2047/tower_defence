import { E_angels, E_behaviors, E_explosion } from '../../enum/index.js'
import { T_thunderExplosion } from '../../types/index.js'
import ExplosionProjectile from './index.js'

export default class ThunderExplosion extends ExplosionProjectile {
    name: string
    constructor({
        position,
        offset = { x: 0, y: 0 },
        width = 40,
        height = 40,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: T_thunderExplosion) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                    maxX: 9,
                    maxY: 8,
                    holdTime: 10,
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
