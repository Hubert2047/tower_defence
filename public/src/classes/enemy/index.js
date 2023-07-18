import { GATE_POSITION_X } from '../../constants/index.js';
import { E_angels, E_behaviors } from '../../enum/index.js';
import { calculateHoldTime, createFrames, getAngleKeyByTwoPoint, getVectorNomalized, shouldEventOccur, updateHealthBars, } from '../../helper/index.js';
import Chest from '../chest/index.js';
import Sprite from '../sprite/index.js';
export default class Enemy extends Sprite {
    constructor({ name, position, offset = { x: 0, y: 0 }, width = 124, height = 124, initFrames, coins = 1, moveSpeed = 40, health = 1000, damage = 100, attackRange = 200, attackSpeed = 5, enemyType, angelKey = E_angels.ANGEL_90, behaviorKey = E_behaviors.RUN, haveCreateDeadEffect = true, }) {
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
        if (haveCreateDeadEffect) {
            this.deadEffectEnemy = this.createDeathEffecEnemy();
        }
        this.hasCheckChest = false;
        this.chest = new Chest({ position });
        this.holdAttack = parseInt((200 / attackSpeed).toString());
        this.hasDropChest = false;
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
            this.renderChest();
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
            haveCreateDeadEffect: false,
        };
        return new Enemy(deathEnemyOptions);
    }
    updateDeathEffect() {
        if (!this.deadEffectEnemy || this.isFinishedDeathEffect)
            return;
        this.behaviorKey = E_behaviors.DEATH;
        this.deadEffectEnemy.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
    }
    renderChest() {
        var _a;
        if (!this.hasCheckChest) {
            this.hasDropChest = shouldEventOccur(10);
            this.hasCheckChest = true;
        }
        if (!this.hasDropChest) {
            this.chest = null;
            return;
        }
        (_a = this.chest) === null || _a === void 0 ? void 0 : _a.update();
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
    get isFinishedDeathEffect() {
        if (this._remainHealth > 0)
            return false;
        if (!this.deadEffectEnemy)
            return true;
        const currentDeathEffectEnemyFrame = this.deadEffectEnemy.currentFrame;
        if (!currentDeathEffectEnemyFrame)
            return false;
        const isDeathEffecFinishedOneTimeAnimation = this.deadEffectEnemy.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
            this.deadEffectEnemy.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1;
        return isDeathEffecFinishedOneTimeAnimation;
    }
    get isAlreadyDead() {
        const isChestOk = this.chest === null || this.chest.isReadyToFakeOut;
        return this.isFinishedDeathEffect && isChestOk;
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
