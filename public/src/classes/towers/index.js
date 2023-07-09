import context2D from '../../context2D/index.js';
import { E_projectile } from '../../enum/index.js';
import { calculateDistanceTwoPoint } from '../../helper/index.js';
import ExplosionProjectile from '../explosionProjectile/index.js';
import BloodMoonProjectile from '../projectiles/bloodMoon/index.js';
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
        this.explosions = [];
    }
    draw({ sourceIndex }) {
        super.draw({ sourceIndex });
        // this.drawAttackRangeCicle()
    }
    drawAttackRangeCicle() {
        if (context2D) {
            context2D.beginPath();
            context2D.arc(this.position.x + this.offset.x, this.position.y, this.attackArea, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(225,225,225,0,1)';
            context2D.fill();
        }
    }
    update({ enemies, shootingAudio, }) {
        this.draw({ sourceIndex: 0 });
        this.attackEnemies(enemies);
        this.updateProjectile(shootingAudio);
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
            const targetEnemy = this.findTargetEnemy(enemiesInRange);
            const newProjectile = this.createProjectile(targetEnemy);
            this.projectiles.push(newProjectile);
        }
    }
    //Find the closest enemy to the objective
    findTargetEnemy(enemies) {
        const enemyTarget = enemies.reduce((target, currentEnemy) => {
            if (target.position.x < currentEnemy.position.x) {
                return currentEnemy;
            }
            else
                return target;
        });
        return enemyTarget;
    }
    createProjectile(enemy) {
        const projectileSetting = {
            position: {
                x: this.position.x - this.width + 1.5 * this.offset.x,
                y: this.position.y - this.height + 1.8 * this.offset.y,
            },
            damage: this.damage,
            enemy,
            moveSpeed: 5,
        };
        switch (this.projectileType) {
            case E_projectile.BLOOD_MOON:
                return new BloodMoonProjectile(projectileSetting);
            default:
                throw new Error('we dont have this projectile');
        }
    }
    getEnemiesInAttackRange(currentEnemies) {
        const enemiesInRange = [];
        currentEnemies.forEach((enemy) => {
            const realPostion = { x: this.position.x + this.offset.x, y: this.position.y };
            const distance = calculateDistanceTwoPoint(enemy.position, realPostion);
            if (distance <= this.attackArea) {
                enemiesInRange.push(enemy);
            }
        });
        return enemiesInRange;
    }
    updateProjectile(shootingAudio) {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            const realEnemyPostion = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            };
            const distance = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion);
            if (distance < 5) {
                currentProjectile.targetEnemy.attacked(currentProjectile);
                const position = {
                    x: currentProjectile.position.x - currentProjectile.offset.x,
                    y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                };
                const explosion = new ExplosionProjectile({
                    position,
                    offset: currentProjectile.explosionProjectileInfo.offset,
                    imageSources: currentProjectile.explosionProjectileInfo.imageSources,
                    frame: currentProjectile.explosionProjectileInfo.frame,
                });
                this.explosions.push(explosion);
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosion = this.explosions[i];
            const isFinishFrame = currentExplosion.cropPosition.x === currentExplosion.frame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosion.frame.maxY - 1;
            if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                shootingAudio.play();
            }
            if (isFinishFrame) {
                this.explosions.splice(i, 1);
            }
            else {
                this.explosions[i].update();
            }
        }
    }
}
