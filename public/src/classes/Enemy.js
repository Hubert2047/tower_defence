import context2D from '../context2D/index.js';
import { waypoints } from '../data/index.js';
import { getVectorNomalized } from '../helper/index.js';
class Enemy {
    constructor({ position = { x: 0, y: 0 }, moveSpeed = 1, HP = 1000, }) {
        this.position = position;
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentWayPointIndex = 0;
        this.radius = 30;
        this.HP = HP;
    }
    draw() {
        if (context2D) {
            context2D.beginPath();
            context2D.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            context2D.fillStyle = 'red';
            context2D.fill();
        }
    }
    update() {
        this.draw();
        this.updatePosition();
    }
    updatePosition() {
        this.updateVelocity();
        this.position.x += parseInt(this.velocityX.toString());
        this.position.y += parseInt(this.velocityY.toString());
        if (this.position.x >= waypoints[this.currentWayPointIndex].x && this.velocityX > 0) {
            this.position.x = waypoints[this.currentWayPointIndex].x;
        }
        if (this.position.y >= waypoints[this.currentWayPointIndex].y && this.velocityY > 0) {
            this.position.y = waypoints[this.currentWayPointIndex].y;
        }
        if (this.position.x === waypoints[this.currentWayPointIndex].x &&
            this.position.y === waypoints[this.currentWayPointIndex].y &&
            this.currentWayPointIndex < waypoints.length - 1) {
            this.currentWayPointIndex++;
        }
    }
    updateVelocity() {
        const v_normalized = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex]);
        this.velocityX = this.moveSpeed * v_normalized.x;
        this.velocityY = this.moveSpeed * v_normalized.y;
    }
    attacked(projectile) {
        this.HP -= projectile.damage;
        if (this.HP < 0)
            this.HP = 0;
    }
}
export default Enemy;
