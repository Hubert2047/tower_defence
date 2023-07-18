import { I_explosion } from 'src/types/interface.js'
import ExplosionProjectile from '../../classes/explosionProjectile/index.js'
import ThunderExplosion from '../../classes/explosionProjectile/Thunder.js'
import { E_angels, E_behaviors } from '../../enum/index.js'
import {
    calculateDistanceTwoPoint,
    createFrames,
    getAngleKeyByTwoPoint,
    getVectorNomalized,
} from '../../helper/index.js'
import { T_frame, T_position, T_projectile } from '../../types/index.js'
import Enemy from '../enemy/index.js'
import Sprite from '../sprite/index.js'
export default class Projectile extends Sprite {
    public moveSpeed: number
    public velocityX: number
    public velocityY: number
    public targetEnemy: Enemy
    public damage: number
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    constructor({
        position,
        offset = { x: 0, y: 0 },
        width = 64,
        height = 64,
        initFrames,
        moveSpeed = 100,
        damage = 100,
        enemy,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
    }: T_projectile) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames })
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.damage = damage
        this.targetEnemy = enemy
    }
    public update(): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.updatePosition()
        const realPosi = {
            x: this.targetEnemy.position.x - 2 * this.targetEnemy.offset.x,
            y: this.targetEnemy.position.y - 2 * this.targetEnemy.offset.y,
        }
        this.angelKey = getAngleKeyByTwoPoint(this.position, realPosi)
    }
    public updatePosition(): void {
        this.updateVelocity()
        this.position.x += this.velocityX
        this.position.y += this.velocityY
        if (this.position.x >= this.targetEnemy.position.x - this.targetEnemy.width / 4 && this.velocityX > 0) {
            this.position.x = this.targetEnemy.position.x - this.targetEnemy.width / 4
        }
        if (this.position.y >= this.targetEnemy.position.y - this.targetEnemy.height / 5 && this.velocityY > 0) {
            this.position.y = this.targetEnemy.position.y - this.targetEnemy.height / 5
        }
    }
    public updateVelocity(): void {
        const v_normalized: T_position = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 4,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 5,
        })
        this.velocityX = (this.moveSpeed / 10) * v_normalized.x
        this.velocityY = (this.moveSpeed / 10) * v_normalized.y
    }
    public get canHitEnemy(): boolean {
        const realEnemyPostion: T_position = {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 4,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 5,
        }
        const distance: number = calculateDistanceTwoPoint(this.position, realEnemyPostion)
        return distance < 5
    }
    public createExplosion(): ExplosionProjectile {
        let explosionOptions: I_explosion = {
            position: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
        }
        return new ThunderExplosion(explosionOptions)
    }
}
