import context2D from '../context2D/index.js';
import { getCurrentEnemies } from '../data/enemies.js';
import { calculateDistanceTwoPoint, createImageSources } from '../helper/index.js';
import Projectile from './Projectile.js';
import Sprite from './Sprite.js';
export default class Tower extends Sprite {
    constructor({ position = { x: 0, y: 0 }, attackSpeed = 1, damage = 300, width = 120, height = 220, }) {
        const sources = ['../../public/src/assets/images/Tower/BloodMoon/tower_bloodmoon.png'];
        const projectileSources = ['../../public/src/assets/images/Tower/BloodMoon/projectile_bloodmoon.png'];
        const imageSources = createImageSources(sources);
        // super({ position, imageSources, width, height, frameMaxX: 11, offset: { x: -30, y: 80 } })
        super({ position, imageSources, width, height, frameMaxX: 11, offset: { x: 0, y: 0 } });
        this.attackSpeed = attackSpeed;
        this.center = { x: position.x + width / 2, y: position.y + height / 2 };
        this.attackIntervalId = null;
        this.attackArea = 300;
        this.damage = damage;
        this.projectileImageSources = createImageSources(projectileSources);
        this.projectiles = [];
        this.startAttack();
    }
    draw(sourceIndex) {
        super.draw(sourceIndex);
        if (context2D) {
            context2D.beginPath();
            context2D.arc(this.center.x, this.center.y, this.attackArea, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(225,225,225,0,1)';
            context2D.fill();
        }
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
            const newProjectile = new Projectile({
                position: Object.assign({}, this.center),
                damage: this.damage,
                imageSources: this.projectileImageSources,
                enemy: enemiesInRange[0],
                frameMaxX: 1,
                frameMaxY: 1,
                width: 30,
                height: 30,
                offset: { x: -80, y: 60 },
            });
            this.projectiles.push(newProjectile);
        }
    }
    getEnemiesInAttackRange(currentEnemies) {
        const enemiesInRange = [];
        currentEnemies.forEach((enemy) => {
            const distance = calculateDistanceTwoPoint(enemy.position, Object.assign({}, this.center));
            console.log('distance', distance);
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
            if (distance < 10) {
                currentProjectile.targetEnemy.attacked(currentProjectile);
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
    }
}
