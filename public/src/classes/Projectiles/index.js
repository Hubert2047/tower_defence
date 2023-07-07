import { getVectorNomalized } from '../../helper/index.js';
import Sprite from '../Sprite/index.js';
export default class Projectile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, offset = { x: 0, y: 0 }, width = 50, height = 50, projectileSources, frameMaxX = 1, frameMaxY = 1, moveSpeed = 10, damage = 300, enemy, }) {
        super({ position, offset, width, height, imageSources: projectileSources, frameMaxX, frameMaxY });
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.damage = damage;
        this.targetEnemy = enemy;
    }
    update() {
        this.draw(0);
        this.updatePosition();
    }
    updatePosition() {
        this.updateVelocity();
        this.position.x += parseInt(this.velocityX.toString());
        this.position.y += parseInt(this.velocityY.toString());
        // if (this.position.x >= this.targetEnemy.position.x && this.velocityX > 0) {
        //     this.position.x = this.targetEnemy.position.x - this.targetEnemy.width / 2 - this.offset.x
        // }
        // if (this.position.y >= this.targetEnemy.position.y && this.velocityY > 0) {
        //     this.position.y = this.targetEnemy.position.y - this.targetEnemy.height / 2
        // }
    }
    updateVelocity() {
        const v_normalized = getVectorNomalized(this.position, {
            x: this.targetEnemy.position.x - this.targetEnemy.width / 2 - this.offset.x,
            y: this.targetEnemy.position.y - this.targetEnemy.height / 2,
        });
        this.velocityX = this.moveSpeed * v_normalized.x;
        this.velocityY = this.moveSpeed * v_normalized.y;
    }
}
