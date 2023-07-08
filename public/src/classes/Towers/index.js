// import context2D from '../../context2D/index.js'
import { getCurrentEnemies } from '../../data/enemies.js';
import { calculateDistanceTwoPoint } from '../../helper/index.js';
import BloodMoonProjectile from '../projectiles/BloodMoon.projectile.js';
import Sprite from '../sprite/index.js';
export default class Tower extends Sprite {
    constructor({ position = { x: 0, y: 0 }, offset, width = 100, height = 200, frame, imageSources, attackSpeed = 1, damage = 300, }) {
        super({ position, offset, width, height, imageSources, frame });
        this.attackSpeed = attackSpeed;
        this.attackIntervalId = null;
        this.attackArea = 300;
        this.damage = damage;
        this.projectiles = [];
        this.startAttack();
    }
    draw(sourceIndex) {
        super.draw(sourceIndex);
        // if (context2D) {
        //     context2D.beginPath()
        //     context2D.arc(
        //         this.position.x - this.width / 2 + 4 * this.offset.x,
        //         this.position.y - this.height / 2 + this.offset.y,
        //         this.attackArea,
        //         0,
        //         2 * Math.PI
        //     )
        //     context2D.fillStyle = 'rgba(225,225,225,0,1)'
        //     context2D.fill()
        // }
    }
    update() {
        this.draw(0);
        this.updateProjectile();
    }
    startAttack() {
        this.handleAttack();
        this.attackIntervalId = setInterval(() => {
            this.handleAttack();
        }, 1000 / this.attackSpeed);
    }
    handleAttack() {
        const currentEnemies = getCurrentEnemies();
        if (currentEnemies.length <= 0)
            return;
        const enemiesInRange = this.getEnemiesInAttackRange(currentEnemies);
        if (enemiesInRange.length > 0) {
            const newProjectile = this.createBloodMoonProjectile(enemiesInRange[0]);
            this.projectiles.push(newProjectile);
        }
    }
    createBloodMoonProjectile(enemy) {
        return new BloodMoonProjectile({
            position: {
                x: this.position.x - this.width / 2,
                y: this.position.y - this.height / 2,
            },
            damage: this.damage,
            enemy,
            moveSpeed: 20,
        });
    }
    getEnemiesInAttackRange(currentEnemies) {
        const enemiesInRange = [];
        currentEnemies.forEach((enemy) => {
            const realX = this.position.x - this.width / 2 + 2.5 * this.offset.x;
            const realY = this.position.y - this.height / 2 + this.offset.y;
            const distance = calculateDistanceTwoPoint(enemy.position, { x: realX, y: realY });
            if (distance <= this.attackArea) {
                enemiesInRange.push(enemy);
            }
        });
        return enemiesInRange;
    }
    clearAttackAction() {
        if (this.attackIntervalId) {
            clearInterval(this.attackIntervalId);
        }
    }
    updateProjectile() {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            const realX = currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 2;
            const realY = currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 2;
            const distance = calculateDistanceTwoPoint(currentProjectile.position, { x: realX, y: realY });
            if (distance < 70) {
                currentProjectile.targetEnemy.attacked(currentProjectile);
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
    }
}
