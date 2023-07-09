import context2D from '../../context2D/index.js';
import { E_projectileType } from '../../enum/index.js';
import { calculateDistanceTwoPoint } from '../../helper/index.js';
import BloodMoonProjectile from '../projectiles/BloodMoon.projectile.js';
import Sprite from '../sprite/index.js';
export default class Tower extends Sprite {
    constructor({ position, offset, width, height, frame, imageSources, projectileType, damage, attackSpeed, attackArea, }) {
        super({ position, offset, width, height, imageSources, frame });
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.attackArea = attackArea;
        this.projectileType = projectileType;
        this.projectiles = [];
        this.countAttackTime = 0;
        this.holdAttack = parseInt((200 / attackSpeed).toString());
    }
    draw({ sourceIndex }) {
        super.draw({ sourceIndex });
        // this.drawAttackRangeCicle()
    }
    drawAttackRangeCicle() {
        if (context2D) {
            context2D.beginPath();
            context2D.arc(this.position.x - this.width / 2 + 4 * this.offset.x, this.position.y - this.height / 2 + this.offset.y, this.attackArea, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(225,225,225,0,1)';
            context2D.fill();
        }
    }
    update({ enemies }) {
        this.draw({ sourceIndex: 0 });
        this.attackEnemies(enemies);
        this.updateProjectile();
    }
    attackEnemies(enemies) {
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++;
            return;
        }
        this.countAttackTime = 0;
        if (enemies.length <= 0)
            return;
        const enemiesInRange = this.getEnemiesInAttackRange(enemies);
        if (enemiesInRange.length > 0) {
            const newProjectile = this.createProjectile(enemiesInRange[0]);
            this.projectiles.push(newProjectile);
        }
    }
    createProjectile(enemy) {
        const projectileSetting = {
            position: {
                x: this.position.x - this.width / 2,
                y: this.position.y - this.height / 2,
            },
            damage: this.damage,
            enemy,
            moveSpeed: 5,
        };
        switch (this.projectileType) {
            case E_projectileType.BLOOD_MOON:
                return new BloodMoonProjectile(projectileSetting);
            default:
                throw new Error('we dont have this projectile');
        }
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
    updateProjectile() {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            const realX = currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4;
            const realY = currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5;
            const distance = calculateDistanceTwoPoint(currentProjectile.position, { x: realX, y: realY });
            if (distance < 5) {
                currentProjectile.targetEnemy.attacked(currentProjectile);
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
    }
}
