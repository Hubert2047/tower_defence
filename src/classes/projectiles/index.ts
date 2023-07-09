import { getVectorNomalized } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Enemy from '../enemies/index.js'
import Sprite from '../sprite/index.js'
interface props {
    position: T_position
    offset: T_position
    width: number
    height: number
    imageSources: HTMLImageElement[]
    frame: T_frame
    moveSpeed: number
    damage: number
    enemy: Enemy
}
export default class Projectile extends Sprite {
    public moveSpeed: number
    private velocityX: number
    private velocityY: number
    public targetEnemy: Enemy
    public damage: number
    constructor({ position, offset, width, height, imageSources, frame, moveSpeed, damage, enemy }: props) {
        super({ position, offset, width, height, imageSources, frame })
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.damage = damage
        this.targetEnemy = enemy
    }
    public update(): void {
        this.draw({ sourceIndex: 0 })
        this.updatePosition()
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
    private updateVelocity(): void {
        const v_normalized: T_position = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 4,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 5,
        })
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}
