import { calAngleFromPointAToPointB, getVectorNomalized } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
var DragonSourceIndex;
(function (DragonSourceIndex) {
    DragonSourceIndex[DragonSourceIndex["TopSource"] = 0] = "TopSource";
    DragonSourceIndex[DragonSourceIndex["LeftSource"] = 1] = "LeftSource";
    DragonSourceIndex[DragonSourceIndex["RightSource"] = 2] = "RightSource";
    DragonSourceIndex[DragonSourceIndex["BottomSource"] = 3] = "BottomSource";
})(DragonSourceIndex || (DragonSourceIndex = {}));
export default class Enemy extends Sprite {
    constructor({ position = { x: 0, y: 0 }, offset, width = 200, height = 200, imageSources, frame, coins = 1, moveSpeed = 2, HP = 1000, }) {
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
        this.coins = coins;
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
    update(waypoints) {
        this.draw({ sourceIndex: this.getCurrentImageSourceIndex(waypoints) });
        this.updatePosition(waypoints);
    }
    updatePosition(waypoints) {
        this.updateVelocity(waypoints);
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
    updateVelocity(waypoints) {
        const v_normalized = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex]);
        this.velocityX = this.moveSpeed * v_normalized.x;
        this.velocityY = this.moveSpeed * v_normalized.y;
    }
    getCurrentImageSourceIndex(waypoints) {
        const angel = calAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex]);
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
