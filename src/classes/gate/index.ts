import getGatesTowerProperties from '../../data/baseProperties/gates/index.js'
import { E_angels, E_behaviors, E_gate } from '../../enum/index.js'
import { calculateDistanceTwoPoint, createFrames } from '../../helper/index.js'
import { T_baseGateProperties, T_explosion, T_frame, T_gate, T_position, T_projectile } from '../../types/index.js'
import Enemy from '../enemy/index.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import Projectile from '../projectile/index.js'
import Sprite from '../sprite/index.js'
export default class Gate extends Sprite {
    public name: string
    public gateType: E_gate
    private _health: number
    public damage: number
    public attackRange: number
    public attackSpeed: number
    public countAttackTime: number
    public explosions: ExplosionProjectile[]
    public projectiles: Projectile[]
    public holdAttack: number
    private baseGateProperties: T_baseGateProperties | undefined

    constructor({
        name,
        gateType,
        position,
        initFrames,
        offset = { x: 0, y: 0 },
        width = 128,
        height = 128,
        health = 10000,
        damage = 2000,
        attackRange = 100,
        attackSpeed = 5,
    }: T_gate) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames })
        this.name = name
        this.gateType = gateType
        this._health = health
        this.damage = damage
        this.attackRange = attackRange
        this.attackSpeed = attackSpeed
        this.countAttackTime = 0
        this.explosions = []
        this.holdAttack = parseInt((200 / attackSpeed).toString())
        this.projectiles = []
        this.baseGateProperties = getGatesTowerProperties(this.gateType)
    }
    public get health() {
        return this._health
    }
    private set health(health: number) {
        if (health <= 0) this._health = 0
        else this._health = health
    }
    public update({ enemies }: { enemies: Enemy[] }) {
        this.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        this.attackEnemies(enemies)
        this.updateProjectile()
    }
    private attackEnemies(enemies: Enemy[]): void {
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++
            return
        }
        this.countAttackTime = 0
        if (enemies.length <= 0) return
        const enemiesInRange: Enemy[] = this.getEnemiesInAttackRange(enemies)
        if (enemiesInRange.length > 0) {
            const targetEnemy: Enemy = this.findTargetEnemy(enemiesInRange)
            if (this.baseGateProperties) {
                const projectileOptions: T_projectile = {
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
                }
                const newProjectile: Projectile = new Projectile(projectileOptions)
                this.projectiles.push(newProjectile)
            }
        }
    }
    public attacked(damage: number): void {
        this.health -= damage
    }
    //Find the closest enemy to the objective
    private findTargetEnemy(enemies: Enemy[]): Enemy {
        const enemyTarget: Enemy = enemies.reduce((target, currentEnemy) => {
            if (target.position.x < currentEnemy.position.x) {
                return currentEnemy
            } else return target
        })
        return enemyTarget
    }
    private getEnemiesInAttackRange(currentEnemies: Enemy[]): Enemy[] {
        const enemiesInRange: Enemy[] = []
        currentEnemies.forEach((enemy: Enemy) => {
            const realPostion: T_position = { x: this.position.x + this.offset.x, y: this.position.y }
            const distance: number = calculateDistanceTwoPoint(enemy.position, realPostion)
            if (distance <= this.attackRange) {
                enemiesInRange.push(enemy)
            }
        })
        return enemiesInRange
    }
    private updateProjectile() {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile: Projectile = this.projectiles[i]
            const realEnemyPostion: T_position = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            }
            const distance: number = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion)
            if (distance < 5) {
                currentProjectile.targetEnemy.attacked(currentProjectile)
                if (this.baseGateProperties) {
                    //create explosion
                    const position: T_position = {
                        x: currentProjectile.position.x - currentProjectile.offset.x,
                        y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                    }
                    const explosionOptions: T_explosion = {
                        name: this.baseGateProperties.projectileInfo.explosionInfo.name,
                        explosionType: this.baseGateProperties.projectileInfo.explosionInfo.explosionType,
                        position,
                        offset: this.baseGateProperties.projectileInfo.explosionInfo.offset,
                        width: this.baseGateProperties.projectileInfo.explosionInfo.width,
                        height: this.baseGateProperties.projectileInfo.explosionInfo.height,
                        initFrames: this.baseGateProperties.projectileInfo.explosionInfo.initFrames,
                    }
                    const explosion: ExplosionProjectile = new ExplosionProjectile(explosionOptions)
                    this.explosions.push(explosion)
                }
                this.projectiles.splice(i, 1)
            } else {
                currentProjectile.update()
            }
        }
        //update or delete explosions - when explosion finieshed one time animation then delete it,otherwise update it
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosionFrame = this.explosions[i].currentFrame
            if (!currentExplosionFrame) {
                this.explosions.splice(i, 1)
                continue
            }
            const currentExplosion: ExplosionProjectile = this.explosions[i]
            const isFinishedOneTimeAnimation: boolean =
                currentExplosion.cropPosition.x === currentExplosionFrame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosionFrame.maxY - 1
            if (isFinishedOneTimeAnimation) {
                this.explosions.splice(i, 1)
            } else {
                this.explosions[i].update()
            }
        }
    }
}
