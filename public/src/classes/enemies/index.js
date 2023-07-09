import context2D from '../../context2D/index.js';
import { calAngleFromPointAToPointB, calFullHealthWidth, getVectorNomalized } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
var DragonSourceIndex;
(function (DragonSourceIndex) {
    DragonSourceIndex[DragonSourceIndex["TopSource"] = 0] = "TopSource";
    DragonSourceIndex[DragonSourceIndex["LeftSource"] = 1] = "LeftSource";
    DragonSourceIndex[DragonSourceIndex["RightSource"] = 2] = "RightSource";
    DragonSourceIndex[DragonSourceIndex["BottomSource"] = 3] = "BottomSource";
})(DragonSourceIndex || (DragonSourceIndex = {}));
export default class Enemy extends Sprite {
    constructor({ position, offset, width, height, imageSources, frame, coins, moveSpeed, health, enemyType }) {
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
        this._remainHealth = health;
        this.health = health;
        this.enemyType = enemyType;
    }
    set remainHealth(remainHealth) {
        if (remainHealth <= 0) {
            this._remainHealth = 0;
        }
        else {
            this._remainHealth = remainHealth;
        }
    }
    get remainHealth() {
        return this._remainHealth;
    }
    update(waypoints) {
        this.draw({ sourceIndex: this.getCurrentImageSourceIndex(waypoints) });
        this.updatePosition(waypoints);
        this.updateHealthBars();
    }
    drawRemainHealthBar({ drawOption, remainHealthWidth, fullHealthWidth, fillStyle, }) {
        if (context2D) {
            const center = (this.width - 2 * this.offset.x - fullHealthWidth) / 2;
            const x = this.position.x + center;
            const y = this.position.y - this.height + 2 * this.offset.y;
            // start draw
            context2D.beginPath();
            // draw top
            context2D.moveTo(x + drawOption.borderRadius, y);
            context2D.lineTo(x + remainHealthWidth, y);
            context2D.arcTo(x + remainHealthWidth, y, x + remainHealthWidth, y + drawOption.borderRadius, drawOption.borderRadius);
            // draw right
            context2D.lineTo(x + remainHealthWidth, y + drawOption.height);
            // draw bottom
            context2D.arcTo(x + remainHealthWidth, y + drawOption.height, x + remainHealthWidth - drawOption.borderRadius, y + drawOption.height, drawOption.borderRadius);
            context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height);
            // draw left border radius
            context2D.arcTo(x, y + drawOption.height, x, y + drawOption.borderRadius, drawOption.borderRadius);
            context2D.lineTo(x, y + drawOption.borderRadius);
            // draw left border radius
            context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius);
            context2D.closePath();
            context2D.strokeStyle = drawOption.strokeStyle;
            context2D.fillStyle = fillStyle;
            context2D.lineWidth = drawOption.lineWidth;
            context2D.stroke();
            context2D.fill();
        }
    }
    drawHealthBarFull({ drawOption, fullHealthWidth, fillStyle, }) {
        if (context2D) {
            const center = (this.width - 2 * this.offset.x - fullHealthWidth) / 2;
            const x = this.position.x + center;
            const y = this.position.y - this.height + 2 * this.offset.y;
            context2D.beginPath();
            // draw top rectangle
            context2D.moveTo(x + drawOption.borderRadius, y);
            context2D.lineTo(x + fullHealthWidth - drawOption.borderRadius, y);
            context2D.arcTo(x + fullHealthWidth, y, x + fullHealthWidth, y + drawOption.borderRadius, drawOption.borderRadius);
            // draw right rectangle
            context2D.lineTo(x + fullHealthWidth, y + drawOption.height - drawOption.borderRadius);
            context2D.arcTo(x + fullHealthWidth, y + drawOption.height, x + fullHealthWidth - drawOption.borderRadius, y + drawOption.height, drawOption.borderRadius);
            // draw bottom rectangle
            context2D.lineTo(x + drawOption.borderRadius, y + drawOption.height);
            context2D.arcTo(x, y + drawOption.height, x, y + drawOption.height - drawOption.borderRadius, drawOption.borderRadius);
            // draw left rectangle
            context2D.lineTo(x, y + drawOption.borderRadius);
            context2D.arcTo(x, y, x + drawOption.borderRadius, y, drawOption.borderRadius);
            // end draw
            context2D.closePath();
            // draw stroke and color
            context2D.strokeStyle = drawOption.strokeStyle;
            context2D.fillStyle = fillStyle;
            context2D.lineWidth = drawOption.lineWidth;
            context2D.stroke();
            context2D.fill();
            this.drawHealthText(x, y, fullHealthWidth);
        }
    }
    drawHealthText(x, y, fullHealthWidth) {
        if (context2D) {
            context2D.font = '16px Arial';
            context2D.fillStyle = 'white';
            const remainHealthString = this.remainHealth.toString();
            const textWidth = context2D.measureText(remainHealthString).width;
            context2D.fillText(remainHealthString, x + fullHealthWidth / 2 - textWidth / 2, y - 8);
        }
    }
    updateHealthBars() {
        const drawOption = {
            lineWidth: 2,
            height: 8,
            borderRadius: 4,
            strokeStyle: 'white',
        };
        const fullHealthWidth = calFullHealthWidth(this.health);
        const remainHealthWidth = (this.remainHealth * fullHealthWidth) / this.health;
        this.drawHealthBarFull({ drawOption, fullHealthWidth, fillStyle: 'red' });
        if (fullHealthWidth === remainHealthWidth) {
            this.drawHealthBarFull({ drawOption, fullHealthWidth, fillStyle: 'green' });
        }
        else {
            this.drawRemainHealthBar({
                drawOption,
                fullHealthWidth,
                remainHealthWidth,
                fillStyle: 'green',
            });
        }
    }
    updatePosition(waypoints) {
        this.updateVelocity(waypoints);
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
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
        this.remainHealth -= projectile.damage;
    }
}
