import context2D from '../../context2D/index.js';
import getGatesProperties from '../../data/baseProperties/gates/index.js';
import { E_angels, E_behaviors } from '../../enum/index.js';
import { calculateDistanceTwoPoint, createFrames, updateHealthBars } from '../../helper/index.js';
import ExplosionProjectile from '../explosionProjectile/index.js';
import Projectile from '../projectile/index.js';
import Sprite from '../sprite/index.js';
export default class Gate extends Sprite {
    constructor({ name, gateType, position, initFrames, offset = { x: 0, y: 0 }, width = 128, height = 128, health = 10000, damage = 2000, attackRange = 300, attackSpeed = 5, behaviorKey = E_behaviors.IDLE, angelKey = E_angels.ANGEL_270, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames });
        this.name = name;
        this.gateType = gateType;
        this.damage = damage;
        this.attackRange = attackRange;
        this.attackSpeed = attackSpeed;
        this.countAttackTime = 0;
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
        this._remainHealth = health;
        this.health = health;
        this.explosions = [];
        this.holdAttack = parseInt((500 / attackSpeed).toString());
        this.projectiles = [];
        this.baseGateProperties = getGatesProperties(this.gateType);
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
    draw() {
        super.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth });
        this.drawAttackRangeCicle();
    }
    drawAttackRangeCicle() {
        if (context2D) {
            context2D.beginPath();
            context2D.arc(this.position.x + this.offset.x, this.position.y, this.attackRange, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(225,225,225,0.15)';
            context2D.fill();
        }
    }
    update({ enemies }) {
        this.draw();
        this.attackEnemies(enemies);
        this.updateProjectile();
    }
    attackEnemies(enemies) {
        if (enemies.length <= 0) {
            this.behaviorKey = E_behaviors.IDLE;
            return;
        }
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++;
            return;
        }
        this.countAttackTime = 0;
        const enemiesInRange = this.getEnemiesInAttackRange(enemies);
        if (enemiesInRange.length <= 0) {
            this.behaviorKey = E_behaviors.IDLE;
            return;
        }
        const targetEnemy = this.findTargetEnemy(enemiesInRange);
        const distance = calculateDistanceTwoPoint(targetEnemy.position, this.position);
        if (distance <= 64 * 4) {
            this.behaviorKey = E_behaviors.ATTACK;
        }
        else {
            this.behaviorKey = E_behaviors.ATTACK_BOW;
        }
        if (this.baseGateProperties) {
            const projectileInfo = this.baseGateProperties.projectileInfo[this.behaviorKey];
            const projectileOptions = {
                name: projectileInfo.name,
                ProjectileType: projectileInfo.projectileType,
                position: {
                    x: this.position.x - this.width + 1.5 * this.offset.x,
                    y: this.position.y - this.height + 1.8 * this.offset.y,
                },
                damage: this.damage,
                enemy: targetEnemy,
                moveSpeed: 5,
                width: projectileInfo.width,
                height: projectileInfo.height,
                offset: projectileInfo.offset,
                initFrames: projectileInfo.initFrames,
            };
            const newProjectile = new Projectile(projectileOptions);
            this.projectiles.push(newProjectile);
        }
    }
    getHit(damage) {
        this.remainHealth -= damage;
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
    getEnemiesInAttackRange(currentEnemies) {
        const enemiesInRange = [];
        currentEnemies.forEach((enemy) => {
            const realPostion = { x: this.position.x + this.offset.x, y: this.position.y };
            const distance = calculateDistanceTwoPoint(enemy.position, realPostion);
            if (distance <= this.attackRange) {
                enemiesInRange.push(enemy);
            }
        });
        return enemiesInRange;
    }
    updateProjectile() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            const realEnemyPostion = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            };
            const distance = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion);
            if (distance < 5) {
                currentProjectile.targetEnemy.getHit(currentProjectile.damage);
                if (this.baseGateProperties) {
                    const explosionInfo = this.baseGateProperties.projectileInfo[this.behaviorKey].explosionInfo;
                    //create explosion
                    const position = {
                        x: currentProjectile.position.x - currentProjectile.offset.x,
                        y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                    };
                    const explosionOptions = {
                        name: explosionInfo.name,
                        explosionType: explosionInfo.explosionType,
                        position,
                        offset: explosionInfo.offset,
                        width: explosionInfo.width,
                        height: explosionInfo.height,
                        initFrames: explosionInfo.initFrames,
                    };
                    const explosion = new ExplosionProjectile(explosionOptions);
                    this.explosions.push(explosion);
                }
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
        //update or delete explosions - when explosion finieshed one time animation then delete it,otherwise update it
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosion = this.explosions[i];
            this.explosions[i].update();
            const currentExplosionFrame = this.explosions[i].currentFrame;
            if (!currentExplosionFrame) {
                this.explosions.splice(i, 1);
                continue;
            }
            const isFinishedOneTimeAnimation = currentExplosion.cropPosition.x === currentExplosionFrame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosionFrame.maxY - 1;
            if (isFinishedOneTimeAnimation) {
                this.explosions.splice(i, 1);
            }
        }
    }
}
