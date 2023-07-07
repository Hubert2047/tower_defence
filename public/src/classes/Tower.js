import { TILE_SIZE } from '../constants/index.js';
import context2D from '../context2D/index.js';
import currentEnemies from '../data/enemies.js';
import { calculateDistanceTwoPoint } from '../helper/index.js';
import Projectile from './Projectile.js';
export default class Tower {
    constructor({ position = { x: 0, y: 0 }, attackSpeed = 1, damage = 300, }) {
        this.position = position;
        this.width = 2 * TILE_SIZE;
        this.height = TILE_SIZE;
        this.attackSpeed = attackSpeed;
        this.center = { x: position.x + this.width / 2, y: position.y + this.height / 2 };
        this.attackIntervalId = null;
        this.attackArea = 300;
        this.damage = damage;
        this.projectiles = [];
        this.startAttack();
    }
    draw() {
        if (context2D) {
            context2D.fillStyle = 'green';
            context2D.fillRect(this.position.x, this.position.y, this.width, this.height);
            context2D.beginPath();
            context2D.arc(this.center.x, this.center.y, this.attackArea, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(255,255,255,0.15)';
            context2D.fill();
        }
    }
    update() {
        this.draw();
        this.updateProjectile();
    }
    startAttack() {
        this.handleAttack();
        this.attackIntervalId = setInterval(() => {
            this.handleAttack();
        }, 1000 / this.attackSpeed);
    }
    handleAttack() {
        if (currentEnemies.length <= 0)
            return;
        const enemiesInRange = this.getEnemiesInAttackRange();
        if (enemiesInRange.length > 0) {
            const newProjectile = new Projectile({
                position: Object.assign({}, this.center),
                damage: this.damage,
                enemy: enemiesInRange[0],
            });
            this.projectiles.push(newProjectile);
        }
    }
    getEnemiesInAttackRange() {
        const enemiesInRange = [];
        currentEnemies.forEach((enemy) => {
            const distance = calculateDistanceTwoPoint(enemy.position, Object.assign({}, this.center));
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
            const distance = calculateDistanceTwoPoint(currentProjectile.position, currentProjectile.targetEnemy.position);
            if (distance < 20) {
                currentProjectile.targetEnemy.attacked(currentProjectile);
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
    }
}
