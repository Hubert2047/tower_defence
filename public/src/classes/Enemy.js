import { waypoints } from '../data/index.js';
import { createImageSources, getAngleFromPointAToPointB, getVectorNomalized } from '../helper/index.js';
import Sprite from './Sprite.js';
export default class Enemy extends Sprite {
    constructor({ position = { x: 0, y: 0 }, moveSpeed = 2, HP = 1000, }) {
        const sources = [
            '../../public/src/assets/images/dragon_top.png',
            '../../public/src/assets/images/dragon_left.png',
            '../../public/src/assets/images/dragon_right.png',
            '../../public/src/assets/images/dragon_bottom.png',
        ];
        const imageSources = createImageSources(sources);
        super({
            position,
            imageSources,
            frameMaxX: 4,
            frameMaxY: 4,
            width: 20,
            height: 20,
        });
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentWayPointIndex = 0;
        this._HP = HP;
    }
    get HP() {
        return this._HP;
    }
    set HP(hp) {
        if (hp <= 0) {
            this._HP = 0;
        }
        else {
            this._HP = hp;
        }
    }
    update() {
        this.draw(2);
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
        const angel = getAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex]);
        console.log('Enemy ~ updateVelocity ~ angel:', angel);
        this.velocityX = this.moveSpeed * v_normalized.x;
        this.velocityY = this.moveSpeed * v_normalized.y;
    }
    attacked(projectile) {
        this.HP -= projectile.damage;
    }
}
