import { getVectorNomalized } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Enemy from '../enemies/index.js'
import Sprite from '../sprite/index.js'
interface props {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    imageSources: HTMLImageElement[]
    frame?: T_frame
    moveSpeed?: number
    damage: number
    enemy: Enemy
}
export default class Projectile extends Sprite {
    public moveSpeed: number
    private velocityX: number
    private velocityY: number
    public targetEnemy: Enemy
    public damage: number
    constructor({
        position = { x: 0, y: 0 },
        offset = { x: 0, y: 0 },
        width = 50,
        height = 50,
        imageSources,
        frame,
        moveSpeed = 10,
        damage = 300,
        enemy,
    }: props) {
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
        this.position.x += parseInt(this.velocityX.toString())
        this.position.y += parseInt(this.velocityY.toString())
        // if (this.position.x >= this.targetEnemy.position.x && this.velocityX > 0) {
        //     this.position.x = this.targetEnemy.position.x - this.targetEnemy.width / 2 - this.offset.x
        // }
        // if (this.position.y >= this.targetEnemy.position.y && this.velocityY > 0) {
        //     this.position.y = this.targetEnemy.position.y - this.targetEnemy.height / 2
        // }
    }
    private updateVelocity(): void {
        const v_normalized: T_position = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 2 - this.offset.x,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 2,
        })
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}
