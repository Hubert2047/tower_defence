import context2D from '../context2D/index.js'
import { getVectorNomalized } from '../helper/index.js'
import { position } from '../interface/index.js'
import Enemy from './Enemy.js'

export default class Projectile {
    public position: position
    public moveSpeed: number
    private velocityX: number
    private velocityY: number
    private radius: number
    public targetEnemy: Enemy
    public damage: number
    constructor({
        position = { x: 0, y: 0 },
        moveSpeed = 5,
        enemy,
        damage,
    }: {
        position: position
        moveSpeed?: number
        damage: number
        enemy: Enemy
    }) {
        this.position = position
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.radius = 10
        this.damage = damage
        this.targetEnemy = enemy
    }

    private draw(): void {
        if (context2D) {
            context2D.beginPath()
            context2D.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
            context2D.fillStyle = 'orange'
            context2D.fill()
        }
    }
    public update(): void {
        this.draw()
        this.updatePosition()
    }
    private updatePosition(): void {
        this.updateVelocity()
        this.position.x += parseInt(this.velocityX.toString())
        this.position.y += parseInt(this.velocityY.toString())
        if (this.position.x >= this.targetEnemy.position.x && this.velocityX > 0) {
            this.position.x = this.targetEnemy.position.x
        }
        if (this.position.y >= this.targetEnemy.position.y && this.velocityY > 0) {
            this.position.y = this.targetEnemy.position.y
        }
        if (this.position.x === this.targetEnemy.position.x && this.position.y === this.targetEnemy.position.y) {
        }
    }
    private updateVelocity(): void {
        const v_normalized: position = getVectorNomalized(this.position, this.targetEnemy.position)
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}
