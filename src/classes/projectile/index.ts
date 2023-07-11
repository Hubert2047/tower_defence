import { E_angels, E_behaviors } from '../../enum/index.js'
import { calAngleFromPointAToPointB, createFrames, getVectorNomalized } from '../../helper/index.js'
import { T_frame, T_position, T_projectile } from '../../types/index.js'
import Enemy from '../enemy/index.js'
import Sprite from '../sprite/index.js'
export default class Projectile extends Sprite {
    public moveSpeed: number
    private velocityX: number
    private velocityY: number
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
        moveSpeed = 1,
        damage = 100,
        enemy,
        behaviorKey = E_behaviors.IDLE,
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
        this.updateAngelKey()
    }
    private updatePosition(): void {
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
    private updateAngelKey(): void {
        const angel = calAngleFromPointAToPointB(this.position, this.targetEnemy.position)
        console.log(angel)
        let angelKey: E_angels = E_angels.ANGEL_0
        if (angel <= 45 && angel > -45) {
            angelKey = E_angels.ANGEL_0
        }
        if (angel <= -45 && angel > -135) {
            angelKey = E_angels.ANGEL_145
        }
        if (angel <= 135 && angel > 45) {
            angelKey = E_angels.ANGEL_35
        }
        if (angel <= 180 && angel > 160) {
            angelKey = E_angels.ANGEL_0
        }
        this.angelKey = angelKey
    }
    private updateVelocity(): void {
        const v_normalized: T_position = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 4,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 5,
        })
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}
