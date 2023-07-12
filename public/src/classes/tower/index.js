import context2D from '../../context2D/index.js';
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js';
import { E_angels, E_behaviors, E_projectile } from '../../enum/index.js';
import { calculateDistanceTwoPoint, createFrames } from '../../helper/index.js';
import ExplosionProjectile from '../explosionProjectile/index.js';
import Projectile from '../projectile/index.js';
import Sprite from '../sprite/index.js';
export default class Tower extends Sprite {
    constructor({ name, towerType, position, offset = { x: 0, y: 0 }, width = 124, height = 124, initFrames, projectileType = E_projectile.FIRE, damage = 100, attackSpeed = 1, attackRange = 300, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames });
        this.name = name;
        this.towerType = towerType;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.attackRange = attackRange;
        this.projectileType = projectileType;
        this.projectiles = [];
        this.countAttackTime = 0;
        this.holdAttack = parseInt((200 / attackSpeed).toString());
        this.explosions = [];
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
        this.baseTowerProperties = getBaseTowerProperties(this.towerType);
    }
    draw() {
        super.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        // this.drawAttackRangeCicle()
    }
    drawAttackRangeCicle() {
        if (context2D) {
            context2D.beginPath();
            context2D.arc(this.position.x + this.offset.x, this.position.y, this.attackRange, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(225,225,225,0.1)';
            context2D.fill();
        }
    }
    update({ enemies, shootingAudio, }) {
        this.draw();
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
            if (this.baseTowerProperties) {
                const projectTileInfo = this.baseTowerProperties.projectileInfo[this.behaviorKey];
                const projectileOptions = {
                    name: projectTileInfo.name,
                    ProjectileType: projectTileInfo.projectileType,
                    position: {
                        x: this.position.x - this.width + 1.5 * this.offset.x,
                        y: this.position.y - this.height + 1.8 * this.offset.y,
                    },
                    damage: this.damage,
                    enemy: targetEnemy,
                    moveSpeed: 5,
                    width: projectTileInfo.width,
                    height: projectTileInfo.height,
                    offset: projectTileInfo.offset,
                    initFrames: projectTileInfo.initFrames,
                };
                const newProjectile = new Projectile(projectileOptions);
                this.projectiles.push(newProjectile);
            }
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
    hasCollisionWithMouse(mouse) {
        return (this.position.x + this.offset.x <= mouse.x &&
            mouse.x <= this.position.x + this.width - this.offset.x &&
            this.position.y - this.height + this.offset.y <= mouse.y &&
            mouse.y <= this.position.y + this.height - 3 * this.offset.y);
    }
    updateProjectile(shootingAudio) {
        var _a;
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            const realEnemyPostion = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            };
            const distance = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion);
            if (distance < 5) {
                currentProjectile.targetEnemy.getHit(currentProjectile.damage);
                if (this.baseTowerProperties) {
                    const explosionInfo = (_a = this.baseTowerProperties.projectileInfo[this.behaviorKey]) === null || _a === void 0 ? void 0 : _a.explosionInfo;
                    //create explosion
                    if (explosionInfo) {
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
                }
                this.projectiles.splice(i, 1);
            }
            else {
                currentProjectile.update();
            }
        }
        //update or delete explosions - when explosion finieshed one time animation then delete it,otherwise update it
        for (var i = this.explosions.length - 1; i >= 0; i--) {
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
                if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                    shootingAudio.play();
                }
                this.explosions.splice(i, 1);
            }
        }
    }
}
