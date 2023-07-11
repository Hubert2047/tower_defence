import { E_spriteStatus } from '../../enum/index.js';
import { createFrames, getVectorNomalized } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class Projectile extends Sprite {
    constructor({ position, offset = { x: 0, y: 0 }, width = 64, height = 64, initFrames, moveSpeed = 1, damage = 100, enemy, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames });
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.damage = damage;
        this.targetEnemy = enemy;
    }
    update() {
        this.draw({ frameKey: E_spriteStatus.IDLE });
        this.updatePosition();
    }
    updatePosition() {
        this.updateVelocity();
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
        if (this.position.x >= this.targetEnemy.position.x - this.targetEnemy.width / 4 && this.velocityX > 0) {
            this.position.x = this.targetEnemy.position.x - this.targetEnemy.width / 4;
        }
        if (this.position.y >= this.targetEnemy.position.y - this.targetEnemy.height / 5 && this.velocityY > 0) {
            this.position.y = this.targetEnemy.position.y - this.targetEnemy.height / 5;
        }
    }
    updateVelocity() {
        const v_normalized = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 4,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 5,
        });
        this.velocityX = this.moveSpeed * v_normalized.x;
        this.velocityY = this.moveSpeed * v_normalized.y;
    }
}
