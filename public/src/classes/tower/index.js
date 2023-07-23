import DestroyExplosion from '../../classes/explosionProjectile/Destroy.js';
import FireProjectile from '../../classes/projectile/Fire.js';
import context2D from '../../context2D/index.js';
import { E_angels, E_behaviors, E_characterRoles, E_projectile, E_towerAttackProperties, } from '../../enum/index.js';
import { calAngleFromPointAToPointB, calculateDistanceTwoPoint, createFrames } from '../../helper/index.js';
import EffectTitleLevel from '../levelUp/EffectTitleLevel.js';
import LevelUpIcon from '../levelUpIcon/index.js';
import Sprite from '../sprite/index.js';
export default class Tower extends Sprite {
    constructor({ name, type, position, offset = { x: 0, y: 0 }, width = 124, height = 124, initFrames, damage = 100, attackSpeed = 1, attackRange = 300, multipleTarget = 1, projectileType = E_projectile.FIRE, behaviorKey = E_behaviors.ATTACK, angelKey = E_angels.ANGEL_0, opacity = 1, placementTile, isDisplayLevelUpTower, }) {
        const frames = createFrames({ initFrames });
        super({ position, offset, width, height, frames, opacity });
        this.name = name;
        this.type = type;
        this.role = E_characterRoles.TOWER;
        this.data = {
            [E_towerAttackProperties.ATTACK_DAMAGE]: {
                currentLv: 0,
                value: damage,
            },
            [E_towerAttackProperties.ATTACK_SPEED]: {
                currentLv: 0,
                value: attackSpeed,
            },
            [E_towerAttackProperties.ATTACK_RANGE]: {
                currentLv: 0,
                value: attackRange,
            },
            [E_towerAttackProperties.ATTACK_MULTI]: {
                currentLv: 0,
                value: multipleTarget,
            },
            [E_towerAttackProperties.PROJECTILE]: {
                currentLv: 0,
                value: projectileType,
            },
        };
        this.levelTitleEffect = new EffectTitleLevel({
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 32, y: 75 },
            height: 128,
            width: 128,
            opacity: 0.6,
            behaviorKey: E_behaviors.LEVEL_TITLE_1,
        });
        this.projectiles = [];
        this.holdAttack = parseInt((1000 / attackSpeed).toString());
        this.countAttackTime = this.holdAttack;
        this.explosions = [];
        this.behaviorKey = behaviorKey;
        this.initFrames = initFrames;
        this.angelKey = angelKey;
        this.placementTile = placementTile;
        this.levelUpIcon = new LevelUpIcon({
            name: 'level up',
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 4, y: 12 },
            height: 80,
            width: 80,
            behaviorKey: E_behaviors.RUN,
        });
        this.destroyExplosion = this.createDestroyExplosion();
        this.beingDestroyed = false;
        if (!isDisplayLevelUpTower) {
            this.displayLevelUpTower = this.createTowerDisplayLevelUp({ width: this.width, height: this.height });
        }
    }
    get isAlreadyDestroyed() {
        return this.destroyExplosion.hasFinishedAnimation && this.beingDestroyed;
    }
    drawAttackRangeCicle() {
        if (context2D && this.placementTile !== undefined) {
            context2D.beginPath();
            context2D.arc(this.placementTile.position.x + 32, this.placementTile.position.y + 32, this.data[E_towerAttackProperties.ATTACK_RANGE].value, 0, 2 * Math.PI);
            context2D.fillStyle = 'rgba(225,225,225,0.15)';
            context2D.fill();
        }
    }
    createLevelEffect() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelUp/levelTitleEffect/purple_back.png',
                    maxX: 5,
                    maxY: 2,
                    holdTime: 0,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 32, y: 75 },
            height: 128,
            width: 128,
            opacity: 0.6,
        };
        return new Sprite(options);
    }
    createTowerDisplayLevelUp({ height = this.height, width = this.width, offset = { x: 0, y: 0 }, }) {
        const towerOption = {
            position: { x: 0, y: 0 },
            name: this.name,
            type: this.type,
            initFrames: this.initFrames,
            height,
            width,
            isDisplayLevelUpTower: true,
            offset,
        };
        return new Tower(towerOption);
    }
    update({ enemies, shootingAudio, isDisplayAttackRangeCircleAndLevelUp, }) {
        if (this.beingDestroyed) {
            this.destroyExplosion.update();
        }
        else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
            this.attackEnemies(enemies);
            this.updateProjectile(shootingAudio);
            if (isDisplayAttackRangeCircleAndLevelUp) {
                this.drawAttackRangeCicle();
                this.levelUpIcon.update();
            }
        }
        this.levelTitleEffect.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
    }
    updateProjectile(shootingAudio) {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile = this.projectiles[i];
            currentProjectile.update();
            if (currentProjectile.canHitEnemy) {
                currentProjectile.targetEnemy.getHit(currentProjectile.damage);
                //create explosion
                const explosion = currentProjectile.createExplosion();
                this.explosions.push(explosion);
                this.projectiles.splice(i, 1);
            }
        }
        // update or delete explosions - when explosion finieshed one time animation then delete it,otherwise update it
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosion = this.explosions[i];
            this.explosions[i].update();
            if (currentExplosion.hasFinishedAnimation) {
                if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                    // shootingAudio.play()
                }
                this.explosions.splice(i, 1);
            }
        }
    }
    createDestroyExplosion() {
        return new DestroyExplosion({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
        });
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
        if (enemiesInRange.length <= 0) {
            this.angelKey = E_angels.ANGEL_225;
        }
        if (enemiesInRange.length <= 0) {
            this.behaviorKey = E_behaviors.IDLE;
            return;
        }
        this.behaviorKey = E_behaviors.ATTACK;
        const targetEnemies = enemiesInRange.slice(0, this.data[E_towerAttackProperties.ATTACK_MULTI].value);
        const centerRightTargetEnemyPosition = {
            x: targetEnemies[0].position.x + targetEnemies[0].width - targetEnemies[0].offset.x,
            y: targetEnemies[0].position.y - targetEnemies[0].height / 2,
        };
        const centerLeftTowerPosition = {
            x: this.position.x + this.width - this.offset.x,
            y: this.position.y - this.height / 2,
        };
        this.angelKey = this.getAngleKeyByTwoPoint(centerLeftTowerPosition, centerRightTargetEnemyPosition);
        const newProjectiles = this.createProjectiles(targetEnemies);
        this.projectiles = [...this.projectiles, ...newProjectiles];
    }
    createProjectiles(targetEnemies) {
        return targetEnemies.map((enemy) => {
            const projectileOptions = {
                position: {
                    x: this.position.x - this.width + 1.5 * this.offset.x,
                    y: this.position.y - this.height + 1.8 * this.offset.y,
                },
                damage: this.data[E_towerAttackProperties.ATTACK_DAMAGE].value,
                enemy,
                moveSpeed: 30,
                offset: { x: 0, y: 0 },
            };
            return new FireProjectile(projectileOptions);
        });
    }
    getEnemiesInAttackRange(currentEnemies) {
        const enemiesInRange = [];
        currentEnemies.forEach((enemy) => {
            const realPostion = { x: this.position.x + this.offset.x, y: this.position.y };
            const distance = calculateDistanceTwoPoint(enemy.position, realPostion);
            if (distance <= this.data[E_towerAttackProperties.ATTACK_RANGE].value && enemy.remainHealth > 0) {
                enemiesInRange.push(enemy);
            }
        });
        return enemiesInRange.sort((a, b) => b.position.x - a.position.x);
    }
    hasCollision(position) {
        return (this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width &&
            this.position.y <= position.y &&
            position.y <= this.position.y + this.height - this.offset.y);
    }
    getAngleKeyByTwoPoint(pointA, pointB) {
        const angel = calAngleFromPointAToPointB(pointA, pointB);
        if ((angel >= 0 && angel < 11.25) || angel >= 348.25) {
            return E_angels.ANGEL_0;
        }
        if (angel >= 11.25 && angel < 33.25) {
            return E_angels.ANGEL_22;
        }
        if (angel >= 33.25 && angel < 56.25) {
            return E_angels.ANGEL_45;
        }
        if (angel >= 56.25 && angel < 78.25) {
            return E_angels.ANGEL_67;
        }
        if (angel >= 78.25 && angel < 101.25) {
            return E_angels.ANGEL_90;
        }
        if (angel >= 101.25 && angel < 123.25) {
            return E_angels.ANGEL_112;
        }
        if (angel >= 123.25 && angel < 146.25) {
            return E_angels.ANGEL_135;
        }
        if (angel >= 146.25 && angel < 168.25) {
            return E_angels.ANGEL_157;
        }
        if (angel >= 168.25 && angel < 191.25) {
            return E_angels.ANGEL_180;
        }
        if (angel >= 191.25 && angel < 213.25) {
            return E_angels.ANGEL_202;
        }
        if (angel >= 213.25 && angel < 236.25) {
            return E_angels.ANGEL_225;
        }
        if (angel >= 236.25 && angel < 258.25) {
            return E_angels.ANGEL_247;
        }
        if (angel >= 258.25 && angel < 281.25) {
            return E_angels.ANGEL_270;
        }
        if (angel >= 281.25 && angel < 302.25) {
            return E_angels.ANGEL_292;
        }
        if (angel >= 302.25 && angel < 326.25) {
            return E_angels.ANGEL_315;
        }
        if (angel >= 326.25 && angel < 348.25) {
            return E_angels.ANGEL_337;
        }
        return E_angels.ANGEL_0;
    }
}
