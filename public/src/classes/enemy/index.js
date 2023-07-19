import { GATE_POSITION_X } from '../../constants/index.js';
import getBaseGemProperties from '../../data/baseProperties/gems/index.js';
import { E_angels, E_behaviors, E_gems } from '../../enum/index.js';
import { calculateHoldTime, createFrames, getAngleKeyByTwoPoint, getVectorNomalized, shouldEventOccur, updateHealthBars, } from '../../helper/index.js';
import Chest from '../chest/index.js';
import Gem from '../gems/index.js';
import Sprite from '../sprite/index.js';
export default class Enemy extends Sprite {
    constructor({ name, position, offset = { x: 0, y: 0 }, width = 124, height = 124, initFrames, moveSpeed = 40, health = 1000, damage = 100, attackRange = 200, attackSpeed = 5, enemyType, angelKey = E_angels.ANGEL_90, behaviorKey = E_behaviors.RUN, }) {
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
        this.chest = null;
        this.gem = { type: E_gems.BLUE, value: 1 };
        const hasDropChest = shouldEventOccur(10);
        if (hasDropChest) {
            this.gem = this.randomDropGem();
            const gemBaseProperties = getBaseGemProperties(this.gem.type);
            const chestframes = createFrames({
                initFrames: gemBaseProperties.chestFrames,
            });
            const gem = new Gem({
                position: { x: 0, y: 0 },
                gemType: this.gem.type,
                gemNum: this.gem.value,
            });
            this.chest = new Chest({ position, frames: chestframes, gem });
        }
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
            this.updateDeathAction();
            return;
        }
        this.updateAliveAction(waypoints, gate);
    }
    updateAliveAction(waypoints, gate) {
        if (this.position.x >= GATE_POSITION_X) {
            this.updateEnemyAttackGate({ gate });
        }
        else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
            this.updateFrameKeys(waypoints);
            this.updatePosition(waypoints);
        }
        updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth });
    }
    updateDeathAction() {
        if (!this.isFinishedDeathEffect) {
            this.behaviorKey = E_behaviors.DEATH;
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
        }
        if (!this.isChestOk) {
            this.renderChest();
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
    randomByPercent(array) {
        const itemsArray = [];
        for (const { item, percentage } of array) {
            const numberOfOccurrences = Math.floor((percentage / 100) * 1000);
            for (let i = 0; i < numberOfOccurrences; i++) {
                itemsArray.push(item);
            }
        }
        const randomIndex = Math.floor(Math.random() * itemsArray.length);
        return itemsArray[randomIndex];
    }
    randomDropGem() {
        const gemDropWithPercentage = [
            { item: E_gems.BLUE, percentage: 70 },
            { item: E_gems.RED, percentage: 15 },
            { item: E_gems.PURPLE, percentage: 10 },
            { item: E_gems.COIN, percentage: 5 },
        ];
        const valuePercentage = [
            { item: 2, percentage: 75 },
            { item: 3, percentage: 20 },
            { item: 5, percentage: 5 },
        ];
        const type = this.randomByPercent(gemDropWithPercentage);
        const value = this.randomByPercent(valuePercentage);
        return { type, value };
    }
    renderChest() {
        var _a;
        (_a = this.chest) === null || _a === void 0 ? void 0 : _a.update();
    }
    updateEnemyAttackGate({ gate }) {
        this.behaviorKey = E_behaviors.ATTACK;
        this.updateHoldTime(this.attackSpeed);
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey });
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
        if (this._remainHealth > 0 || this.behaviorKey !== E_behaviors.DEATH)
            return false;
        const currentDeathEffectEnemyFrame = this.currentFrame;
        if (!currentDeathEffectEnemyFrame)
            return false;
        const isDeathEffecFinishedOneTimeAnimation = this.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
            this.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1;
        return isDeathEffecFinishedOneTimeAnimation;
    }
    get isChestOk() {
        return this.chest === null || this.chest.isReadyToFakeOut;
    }
    get isAlreadyDead() {
        return this.isFinishedDeathEffect && this.isChestOk;
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
