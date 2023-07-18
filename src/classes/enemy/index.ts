import { GATE_POSITION_X } from '../../constants/index.js'
import { E_angels, E_behaviors, E_enemy } from '../../enum/index.js'
import {
    calculateHoldTime,
    createFrames,
    getAngleKeyByTwoPoint,
    getVectorNomalized,
    shouldEventOccur,
    updateHealthBars,
} from '../../helper/index.js'
import { T_enemy, T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Chest from '../chest/index.js'
import Gate from '../gate/index.js'
import Sprite from '../sprite/index.js'
export default class Enemy extends Sprite {
    public name: string
    public enemyType: E_enemy
    private velocityX: number
    private velocityY: number
    private currentWayPointIndex: number
    public initFrames: T_initFramesDictionary
    private _remainHealth: number
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    public coins: number
    private health: number
    public damage: number
    public moveSpeed: number
    public attackRange: number
    public attackSpeed: number
    public countAttackTime: number
    public holdAttack: number
    public deadEffectEnemy: Enemy | undefined
    private chest: Chest | null
    private hasCheckChest: boolean
    private hasDropChest: boolean
    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        initFrames,
        coins = 1,
        moveSpeed = 40,
        health = 1000,
        damage = 100,
        attackRange = 200,
        attackSpeed = 5,
        enemyType,
        angelKey = E_angels.ANGEL_90,
        behaviorKey = E_behaviors.RUN,
        haveCreateDeadEffect = true,
    }: T_enemy) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames, speed: moveSpeed })
        super({
            position,
            offset,
            width,
            height,
            frames,
        })
        this.name = name
        this.initFrames = initFrames
        this.moveSpeed = moveSpeed
        this.velocityX = 0
        this.velocityY = 0
        this.currentWayPointIndex = 0
        this.coins = coins
        this._remainHealth = health
        this.health = health
        this.damage = damage
        this.attackRange = attackRange
        this.attackSpeed = attackSpeed
        this.enemyType = enemyType
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.countAttackTime = 0
        if (haveCreateDeadEffect) {
            this.deadEffectEnemy = this.createDeathEffecEnemy()
        }
        this.hasCheckChest = false
        this.chest = new Chest({ position })
        this.holdAttack = parseInt((200 / attackSpeed).toString())
        this.hasDropChest = false
    }
    set remainHealth(remainHealth: number) {
        if (remainHealth <= 0) {
            this._remainHealth = 0
        } else {
            this._remainHealth = remainHealth
        }
    }
    get remainHealth() {
        return this._remainHealth
    }
    public update(waypoints: T_position[], gate: Gate): void {
        if (this.remainHealth <= 0) {
            this.updateDeathEffect()
            this.renderChest()
        } else if (this.position.x >= GATE_POSITION_X) {
            this.updateEnemyAttackGate({ gate })
        } else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
            this.updateFrameKeys(waypoints)
            this.updatePosition(waypoints)
            updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth })
        }
    }
    private attackGate(gate: Gate): void {
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++
            return
        }
        this.countAttackTime = 0
        gate.getHit(this.damage)
    }
    private createDeathEffecEnemy() {
        const deathEnemyOptions: T_enemy = {
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
        }
        return new Enemy(deathEnemyOptions)
    }
    public updateDeathEffect() {
        if (!this.deadEffectEnemy || this.isFinishedDeathEffect) return
        this.behaviorKey = E_behaviors.DEATH
        this.deadEffectEnemy.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public renderChest() {
        if (!this.hasCheckChest) {
            this.hasDropChest = shouldEventOccur(10)
            this.hasCheckChest = true
        }
        if (!this.hasDropChest) {
            this.chest = null
            return
        }
        this.chest?.update()
    }
    public updateEnemyAttackGate({ gate }: { gate: Gate | null }) {
        this.behaviorKey = E_behaviors.ATTACK
        this.updateHoldTime(this.attackSpeed)
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth })
        if (gate) this.attackGate(gate)
    }
    private updateHoldTime(speed: number) {
        const currentBehavior = this.frames.get(this.behaviorKey)
        if (!currentBehavior) return
        const currentFrame = currentBehavior.get(this.angelKey)
        if (!currentFrame) return
        currentFrame.holdTime = calculateHoldTime({
            maxX: currentFrame.maxX,
            maxY: currentFrame.maxY,
            speed,
        })
    }
    private get isFinishedDeathEffect() {
        if (this._remainHealth > 0) return false
        if (!this.deadEffectEnemy) return true
        const currentDeathEffectEnemyFrame = this.deadEffectEnemy.currentFrame
        if (!currentDeathEffectEnemyFrame) return false
        const isDeathEffecFinishedOneTimeAnimation: boolean =
            this.deadEffectEnemy.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
            this.deadEffectEnemy.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1
        return isDeathEffecFinishedOneTimeAnimation
    }
    public get isAlreadyDead() {
        const isChestOk = this.chest === null || this.chest.isReadyToFakeOut
        return this.isFinishedDeathEffect && isChestOk
    }
    private updateFrameKeys(waypoints: T_position[]) {
        this.angelKey = getAngleKeyByTwoPoint(this.position, waypoints[this.currentWayPointIndex])
    }
    private updatePosition(waypoints: T_position[]): void {
        this.updateVelocity(waypoints)
        this.position.x += this.velocityX
        this.position.y += this.velocityY
        if (this.position.x >= waypoints[this.currentWayPointIndex].x && this.velocityX > 0) {
            this.position.x = waypoints[this.currentWayPointIndex].x
        }
        if (this.position.y >= waypoints[this.currentWayPointIndex].y && this.velocityY > 0) {
            this.position.y = waypoints[this.currentWayPointIndex].y
        }
        if (
            this.position.x === waypoints[this.currentWayPointIndex].x &&
            this.position.y === waypoints[this.currentWayPointIndex].y &&
            this.currentWayPointIndex < waypoints.length - 1
        ) {
            this.currentWayPointIndex++
        }
    }
    private updateVelocity(waypoints: T_position[]): void {
        const v_normalized: T_position = getVectorNomalized(this.position, waypoints[this.currentWayPointIndex])
        this.velocityX = (this.moveSpeed / 10) * v_normalized.x
        this.velocityY = (this.moveSpeed / 10) * v_normalized.y
    }
    public getHit(damage: number): void {
        this.remainHealth -= damage
    }
}
