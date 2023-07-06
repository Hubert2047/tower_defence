import c from '../context2D.js'
import { getVectorNomalized } from '../helper/index.js'

export default class Projectile {
    constructor({ position = { x: 0, y: 0 }, moveSpeed = 5, enemy, damage }) {
        this.position = position
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.radius = 10
        this.enemy = enemy
        this.damage = damage
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        c.fillStyle = 'orange'
        c.fill()
    }
    update() {
        this.draw()
        this.updatePosition()
    }
    updatePosition() {
        this.updateVelocity()
        this.position.x += this.velocityX
        this.position.y += this.velocityY
        if (parseInt(this.position.x) >= parseInt(this.enemy.position.x) && this.velocityX > 0) {
            this.position.x = this.enemy.position.x
        }
        if (parseInt(this.position.y) >= parseInt(this.enemy.position.y) && this.velocityY > 0) {
            this.position.y = this.enemy.position.y
        }
        if (
            parseInt(this.position.x) === parseInt(this.enemy.position.x) &&
            parseInt(this.position.y) === parseInt(this.enemy.position.y)
        ) {
            this.hasReachedTarget = true
        }
    }
    updateVelocity() {
        const v_normalized = getVectorNomalized(this.position, this.enemy.position)
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}
