import { getVectorNomalized } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class Projectile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, offset = { x: 0, y: 0 }, width = 50, height = 50, imageSources, frame, moveSpeed = 0.000001, damage = 300, enemy, }) {
        super({ position, offset, width, height, imageSources, frame });
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.damage = damage;
        this.targetEnemy = enemy;
    }
    update() {
        this.draw({ sourceIndex: 0 });
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
