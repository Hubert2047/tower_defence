import c from '../context2D.js'
import { waypoints } from '../data/index.js'
import { getVectorNomalized } from '../helper/index.js'
class Enemy {
    constructor({ position = { x: 0, y: 0 }, moveSpeed = 1 }) {
        this.position = position
        this.width = 50
        this.height = 50
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.currentWayPointIndex = 0
        this.radius = 30
    }
    draw() {
        c.fillStyle = 'red'
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
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
        if (this.position.x >= waypoints[this.currentWayPointIndex].x && this.velocityX > 0) {
            this.position.x = waypoints[this.currentWayPointIndex].x
        }
        if (this.position.y >= waypoints[this.currentWayPointIndex].y && this.velocityY > 0) {
            this.position.y = waypoints[this.currentWayPointIndex].y
        }
        if (
            this.position.x === waypoints[this.currentWayPointIndex].x &&
            this.position.y === waypoints[this.currentWayPointIndex].y &&
            this.currentWayPointIndex < waypoints.length - 1
        ) {
            this.currentWayPointIndex++
        }
    }
    updateVelocity() {
        const v_normalized = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex])
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
}
export default Enemy
