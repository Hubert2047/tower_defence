import { waypoints } from '../../data/index.js';
import { getAngleFromPointAToPointB, getVectorNomalized } from '../../helper/index.js';
import Sprite from '../Sprite/index.js';
var DragonSourceIndex;
(function (DragonSourceIndex) {
    DragonSourceIndex[DragonSourceIndex["TopSource"] = 0] = "TopSource";
    DragonSourceIndex[DragonSourceIndex["LeftSource"] = 1] = "LeftSource";
    DragonSourceIndex[DragonSourceIndex["RightSource"] = 2] = "RightSource";
    DragonSourceIndex[DragonSourceIndex["BottomSource"] = 3] = "BottomSource";
})(DragonSourceIndex || (DragonSourceIndex = {}));
export default class Enemy extends Sprite {
    constructor({ position = { x: 0, y: 0 }, offset, width = 200, height = 200, imageSources, frame, moveSpeed = 2, HP = 1000, }) {
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            frame,
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
    draw(sourceIndex) {
        super.draw(sourceIndex);
    }
    update() {
        this.draw(this.getCurrentImageSourceIndex());
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
    getCurrentImageSourceIndex() {
        const angel = getAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex]);
        if (angel <= 45 && angel > -45) {
            return DragonSourceIndex.RightSource;
        }
        if (angel <= -45 && angel > -135) {
            return DragonSourceIndex.TopSource;
        }
        if (angel <= 135 && angel > 45) {
            return DragonSourceIndex.BottomSource;
        }
        if (angel <= 180 && angel > 135) {
            return DragonSourceIndex.LeftSource;
        }
        return 1;
    }
    attacked(projectile) {
        this.HP -= projectile.damage;
    }
}
