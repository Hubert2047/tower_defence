import FireExplosion from '../../classes/explosionProjectile/Fire.js'
import ExplosionProjectile from '../../classes/explosionProjectile/index.js'
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js'
import { I_explosion, I_projectile } from '../../types/interface.js'
import Projectile from './index.js'
export default class FireProjectile extends Projectile {
    name: string
    currentMove: number
    constructor({
        position,
        enemy,
        offset = { x: 0, y: 0 },
        width = 320,
        height = 200,
        moveSpeed = 100,
        damage = 300,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: I_projectile) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire.png',
                    maxX: 8,
                    maxY: 8,
                    holdTime: 2,
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
        this.currentMove = 0
    }
    public update(): void {
        this.updatePosition()
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public updatePosition(): void {
        this.currentMove += 8
        this.position.x = this.targetEnemy.position.x + this.targetEnemy.width / 2
        this.position.y = this.targetEnemy.position.y - this.targetEnemy.position.y / 4 + this.currentMove
    }
    public get canHitEnemy(): boolean {
        return this.position.y > this.targetEnemy.position.y
    }
    public createExplosion(): ExplosionProjectile {
        let explosionOptions: I_explosion = {
            position: {
                x:
                    this.targetEnemy.position.x +
                    (this.targetEnemy.width - 2 * this.targetEnemy.offset.x) / 2 -
                    (this.width - 2 * this.offset.x) / 2,
                y: this.targetEnemy.position.y,
            },
            offset: { x: 80, y: 0 },
        }
        return new FireExplosion(explosionOptions)
    }
}
