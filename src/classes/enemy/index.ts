import { E_angels, E_behaviors, E_enemy } from '../../enum/index.js'
import { calAngleFromPointAToPointB, createFrames, getVectorNomalized, updateHealthBars } from '../../helper/index.js'
import { T_enemy, T_frame, T_initFramesDictionary, T_position } from '../../types/index.js'
import Gate from '../gate/index.js'
import Projectile from '../projectile/index.js'
import Sprite from '../sprite/index.js'
interface healthBar {
    lineWidth: number
    height: number
    borderRadius: number
    strokeStyle: string
}
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

    constructor({
        name,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        initFrames,
        coins = 1,
        moveSpeed = 1,
        health = 1000,
        damage = 100,
        attackRange = 200,
        attackSpeed = 5,
        enemyType,
        angelKey = E_angels.ANGEL_90,
        behaviorKey = E_behaviors.RUN,
    }: T_enemy) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames, moveSpeed })
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
        this.holdAttack = parseInt((200 / attackSpeed).toString())
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
    public update(waypoints: T_position[]): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.updateFrameKeys(waypoints)
        this.updatePosition(waypoints)
        updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth })
    }
    private attackGate(gate: Gate): void {
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++
            return
        }
        this.countAttackTime = 0
        gate.getHit(this.damage)
    }
    public updateDeathEffect() {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public updateEnemyAttackGate({ gate }: { gate: Gate | null }) {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        updateHealthBars({ sprite: this, health: this.health, remainHealth: this.remainHealth })
        if (gate) this.attackGate(gate)
    }
    private updateFrameKeys(waypoints: T_position[]) {
        this.updateAngelKey(waypoints)
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
        this.velocityX = this.moveSpeed * v_normalized.x
        this.velocityY = this.moveSpeed * v_normalized.y
    }
    private updateAngelKey(waypoints: T_position[]): void {
        const angel = calAngleFromPointAToPointB(this.position, waypoints[this.currentWayPointIndex])
        let angelKey: E_angels = E_angels.ANGEL_0
        if (angel <= 45 && angel > -45) {
            angelKey = E_angels.ANGEL_90
        }
        if (angel <= -45 && angel > -135) {
            angelKey = E_angels.ANGEL_0
        }
        if (angel <= 135 && angel > 45) {
            angelKey = E_angels.ANGEL_180
        }
        if (angel <= 180 && angel > 135) {
            angelKey = E_angels.ANGEL_290
        }
        this.angelKey = angelKey
    }
    public getHit(projectile: Projectile): void {
        this.remainHealth -= projectile.damage
    }
}
