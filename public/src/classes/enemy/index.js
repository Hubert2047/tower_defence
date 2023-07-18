import { GATE_POSITION_X } from '../../constants/index.js';
import { E_angels, E_behaviors } from '../../enum/index.js';
import { calculateHoldTime, createFrames, getAngleKeyByTwoPoint, getVectorNomalized, updateHealthBars, } from '../../helper/index.js';
import Sprite from '../sprite/index.js';
export default class Enemy extends Sprite {
    constructor({ name, position, offset = { x: 0, y: 0 }, width = 124, height = 124, initFrames, coins = 1, moveSpeed = 40, health = 1000, damage = 100, attackRange = 200, attackSpeed = 5, enemyType, angelKey = E_angels.ANGEL_90, behaviorKey = E_behaviors.RUN, }) {
        const frames = createFrames({ initFrames, speed: moveSpeed });
        super({
            position,
            offset,
            width,
            height,
            frames,
        });
        this.name = name;
        this.initFrames = initFrames;
        this.moveSpeed = moveSpeed;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentWayPointIndex = 0;
        this.coins = coins;
        this._remainHealth = health;
        this.health = health;
        this.damage = damage;
        this.attackRange = attackRange;
        this.attackSpeed = attackSpeed;
        this.enemyType = enemyType;
        this.behaviorKey = behaviorKey;
        this.angelKey = angelKey;
        this.countAttackTime = 0;
        this.holdAttack = parseInt((200 / attackSpeed).toString());
        this.deadEffectEnemy = this.createDeathEffecEnemy();
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
    update(waypoints, gate) {
        if (this.remainHealth <= 0) {
            this.updateDeathEffect();
        }
        else if (this.position.x >= GATE_POSITION_X) {
            this.updateEnemyAttackGate({ gate });
        }
        else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
            this.updateFrameKeys(waypoints);
            this.updatePosition(waypoints);
            updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth });
        }
    }
    attackGate(gate) {
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++;
            return;
        }
        this.countAttackTime = 0;
        gate.getHit(this.damage);
    }
    createDeathEffecEnemy() {
        const deathEnemyOptions = {
            name: this.name,
            position: this.position,
            enemyType: this.enemyType,
            initFrames: this.initFrames,
            offset: this.offset,
            width: this.width,
            height: this.height,
            moveSpeed: this.moveSpeed,
            angelKey: this.angelKey,
            behaviorKey: E_behaviors.DEATH,
        };
        return new Enemy(deathEnemyOptions);
    }
    updateDeathEffect() {
        this.deadEffectEnemy.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    updateEnemyAttackGate({ gate }) {
        this.behaviorKey = E_behaviors.ATTACK;
        this.updateHoldTime(this.attackSpeed);
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth });
        if (gate)
            this.attackGate(gate);
    }
    updateHoldTime(speed) {
        const currentBehavior = this.frames.get(this.behaviorKey);
        if (!currentBehavior)
            return;
        const currentFrame = currentBehavior.get(this.angelKey);
        if (!currentFrame)
            return;
        currentFrame.holdTime = calculateHoldTime({
            maxX: currentFrame.maxX,
            maxY: currentFrame.maxY,
            speed,
        });
    }
    get isAlreadyDead() {
        const currentDeathEffectEnemyFrame = this.deadEffectEnemy.currentFrame;
        if (!currentDeathEffectEnemyFrame) {
            return true;
        }
        const isFinishedOneTimeAnimation = this.deadEffectEnemy.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
            this.deadEffectEnemy.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1;
        return isFinishedOneTimeAnimation && this.remainHealth <= 0;
    }
    updateFrameKeys(waypoints) {
        this.angelKey = getAngleKeyByTwoPoint(this.position, waypoints[this.currentWayPointIndex]);
    }
    updatePosition(waypoints) {
        this.updateVelocity(waypoints);
        this.position.x += this.velocityX;
        this.position.y += this.velocityY;
        if (this.position.x >= waypoints[this.currentWayPointIndex].x && this.velocityX > 0) {
            this.position.x = waypoints[this.currentWayPointIndex].x;
        }
        if (this.position.y >= waypoints[this.currentWayPointIndex].y && this.velocityY > 0) {
            this.position.y = waypoints[this.currentWayPointIndex].y;
        }
        if (this.position.x === waypoints[this.currentWayPointIndex].x &&
            this.position.y === waypoints[this.currentWayPointIndex].y &&
            this.currentWayPointIndex < waypoints.length - 1) {
            this.currentWayPointIndex++;
        }
    }
    updateVelocity(waypoints) {
        const v_normalized = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex]);
        this.velocityX = (this.moveSpeed / 10) * v_normalized.x;
        this.velocityY = (this.moveSpeed / 10) * v_normalized.y;
    }
    getHit(damage) {
        this.remainHealth -= damage;
    }
}
