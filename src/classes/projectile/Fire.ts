import ThunderExplosion from '../../classes/explosionProjectile/Thunder.js'
import ExplosionProjectile from '../../classes/explosionProjectile/index.js'
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js'
import { T_thunderExplosion } from '../../types/index.js'
import { I_projectile } from '../../types/interface.js'
import Projectile from './index.js'
export default class FireProjectile extends Projectile {
    name: string
    constructor({
        position,
        enemy,
        offset = { x: 0, y: 0 },
        width = 40,
        height = 40,
        moveSpeed = 5,
        damage = 300,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: I_projectile) {
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
            name: 'Fire Projectile',
            projectileType: E_projectile.FIRE,
            position,
            initFrames,
            enemy,
            offset,
            width,
            height,
            moveSpeed,
            damage,
            behaviorKey,
            angelKey,
        })
        this.name = 'Fire Projectile'
    }

    public createExplosion(): ExplosionProjectile {
        let explosionOptions: T_thunderExplosion = {
            position: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
        }
        return new ThunderExplosion(explosionOptions)
    }
}
