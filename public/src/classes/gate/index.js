import getGatesTowerProperties from '../../data/baseProperties/gates/index.js';
import { E_angels, E_behaviors } from '../../enum/index.js';
import { calculateDistanceTwoPoint, createFrames } from '../../helper/index.js';
import ExplosionProjectile from '../explosionProjectile/index.js';
import Projectile from '../projectile/index.js';
import Sprite from '../sprite/index.js';
export default class Gate extends Sprite {
    constructor({ name, gateType, position, initFrames, offset = { x: 0, y: 0 }, width = 128, height = 128, health = 10000, damage = 2000, attackRange = 100, attackSpeed = 5, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames });
        this.name = name;
        this.gateType = gateType;
        this._health = health;
        this.damage = damage;
        this.attackRange = attackRange;
        this.attackSpeed = attackSpeed;
        this.countAttackTime = 0;
        this.explosions = [];
        this.holdAttack = parseInt((200 / attackSpeed).toString());
        this.projectiles = [];
        this.baseGateProperties = getGatesTowerProperties(this.gateType);
    }
    get health() {
        return this._health;
    }
    set health(health) {
        if (health <= 0)
            this._health = 0;
        else
            this._health = health;
    }
    update({ enemies }) {
        this.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
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
            const targetEnemy = this.findTargetEnemy(enemiesInRange);
            if (this.baseGateProperties) {
                const projectileOptions = {
                    name: this.baseGateProperties.projectileInfo.name,
                    ProjectileType: this.baseGateProperties.projectileInfo.projectileType,
                    position: {
                        x: this.position.x - this.width + 1.5 * this.offset.x,
                        y: this.position.y - this.height + 1.8 * this.offset.y,
                    },
                    damage: this.damage,
                    enemy: targetEnemy,
                    moveSpeed: 5,
                    width: this.baseGateProperties.projectileInfo.width,
                    height: this.baseGateProperties.projectileInfo.height,
                    offset: this.baseGateProperties.projectileInfo.offset,
                    initFrames: this.baseGateProperties.projectileInfo.initFrames,
                };
                const newProjectile = new Projectile(projectileOptions);
                this.projectiles.push(newProjectile);
            }
        }
    }
    attacked(damage) {
        this.health -= damage;
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
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            const realEnemyPostion = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            };
            const distance = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion);
            if (distance < 5) {
                currentProjectile.targetEnemy.attacked(currentProjectile);
                if (this.baseGateProperties) {
                    //create explosion
                    const position = {
                        x: currentProjectile.position.x - currentProjectile.offset.x,
                        y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                    };
                    const explosionOptions = {
                        name: this.baseGateProperties.projectileInfo.explosionInfo.name,
                        explosionType: this.baseGateProperties.projectileInfo.explosionInfo.explosionType,
                        position,
                        offset: this.baseGateProperties.projectileInfo.explosionInfo.offset,
                        width: this.baseGateProperties.projectileInfo.explosionInfo.width,
                        height: this.baseGateProperties.projectileInfo.explosionInfo.height,
                        initFrames: this.baseGateProperties.projectileInfo.explosionInfo.initFrames,
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
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosionFrame = this.explosions[i].currentFrame;
            if (!currentExplosionFrame) {
                this.explosions.splice(i, 1);
                continue;
            }
            const currentExplosion = this.explosions[i];
            const isFinishedOneTimeAnimation = currentExplosion.cropPosition.x === currentExplosionFrame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosionFrame.maxY - 1;
            if (isFinishedOneTimeAnimation) {
                this.explosions.splice(i, 1);
            }
            else {
                this.explosions[i].update();
            }
        }
    }
}
