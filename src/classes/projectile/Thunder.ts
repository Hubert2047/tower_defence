import ThunderExplosion from '../../classes/explosionProjectile/Thunder.js'
import ExplosionProjectile from '../../classes/explosionProjectile/index.js'
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js'
import { T_thunderExplosion } from '../../types/index.js'
import { I_projectile } from '../../types/interface.js'
import Projectile from './index.js'

export default class ThunderProjectile extends Projectile {
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
            name: 'Thunder',
            projectileType: E_projectile.THUNDER,
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
        this.name = 'Thunder'
    }
    public update(): void {
        this.updatePosition()
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public updatePosition(): void {
        this.position.x = this.targetEnemy.position.x + this.targetEnemy.width / 2
        this.position.y = this.targetEnemy.position.y + this.targetEnemy.height / 2
    }
    public get canHitEnemy(): boolean {
        const currentProjectileFrame = this.currentFrame
        if (!currentProjectileFrame) return true
        return (
            this.cropPosition.x === currentProjectileFrame.maxX - 1 &&
            this.cropPosition.y === currentProjectileFrame.maxY - 1
        )
    }
    public createExplosion(): ExplosionProjectile {
        let explosionOptions: T_thunderExplosion = {
            position: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
        }
        return new ThunderExplosion(explosionOptions)
    }
}
