import ExplosionProjectile from '../../classes/explosionProjectile/index.js'
import NuclearExplosion from '../../classes/explosionProjectile/Nuclear.js'
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js'
import { calculateDistanceTwoPoint, getVectorNomalized } from '../../helper/index.js'
import { T_position } from '../../types/index.js'
import { I_explosion, I_projectile } from '../../types/interface.js'
import Projectile from './index.js'
export default class NuclearProjectile extends Projectile {
    name: string
    constructor({
        position,
        enemy,
        offset = { x: 0, y: 0 },
        width = 40,
        height = 40,
        moveSpeed = 300,
        damage = 300,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: I_projectile) {
        const initFrames = {
            [E_behaviors.ATTACK]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_22]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_45]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_67]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_112]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_135]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_157]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_202]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_225]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_247]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_270]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_292]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_315]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
                [E_angels.ANGEL_337]: {
                    imageSourceString: '../../../public/src/assets/images/projectiles/nuclear/nuclear.png',
                    maxX: 10,
                    maxY: 6,
                    holdTime: 5,
                },
            },
        }
        super({
            name: 'Nuclear',
            projectileType: E_projectile.NUCLEAR,
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
    public updatePosition(): void {
        this.updateVelocity()
        this.position.x += this.velocityX
        this.position.y += this.velocityY
        if (
            this.position.x >=
                this.targetEnemy.position.x + this.targetEnemy.width / 2 - this.offset.x - this.width / 2 &&
            this.velocityX > 0
        ) {
            this.position.x = this.targetEnemy.position.x + this.targetEnemy.width / 2 - this.offset.x - this.width / 2
        }
        if (this.position.y >= this.targetEnemy.position.y && this.velocityY > 0) {
            this.position.y = this.targetEnemy.position.y
        }
    }
    public updateVelocity(): void {
        const v_normalized: T_position = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x + +this.targetEnemy.width / 2 - this.offset.x - this.width / 2,
            y: this.targetEnemy.position.y,
        })
        this.velocityX = (this.moveSpeed / 10) * v_normalized.x
        this.velocityY = (this.moveSpeed / 10) * v_normalized.y
    }
    public get canHitEnemy(): boolean {
        const realEnemyPostion: T_position = {
            x: this.targetEnemy.position.x + this.targetEnemy.width / 2 - this.offset.x - this.width / 2,
            y: this.targetEnemy.position.y,
        }
        const distance: number = calculateDistanceTwoPoint(this.position, realEnemyPostion)
        return distance < 5
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
            offset: { x: 50, y: 10 },
            moveSpeed: this.moveSpeed,
        }
        return new NuclearExplosion(explosionOptions)
    }
}
