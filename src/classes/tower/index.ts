import context2D from '../../context2D/index.js'
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { E_angels, E_behaviors, E_projectile, E_tower } from '../../enum/index.js'
import { calculateDistanceTwoPoint, createFrames } from '../../helper/index.js'
import { T_baseTowerProperties, T_explosion, T_frame, T_position, T_projectile, T_tower } from '../../types/index.js'
import Enemy from '../enemy/index.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import Projectile from '../projectile/index.js'
import Sprite from '../sprite/index.js'

export default class Tower extends Sprite {
    public name: string
    public towerType: E_tower
    public attackSpeed: number
    public attackRange: number
    public damage: number
    public countAttackTime: number
    public holdAttack: number
    public projectileType: E_projectile
    public projectiles: Projectile[]
    public explosions: ExplosionProjectile[]
    private baseTowerProperties: T_baseTowerProperties | undefined
    constructor({
        name,
        towerType,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        initFrames,
        projectileType = E_projectile.FIRE,
        damage = 100,
        attackSpeed = 1,
        attackRange = 300,
    }: T_tower) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames })
        this.name = name
        this.towerType = towerType
        this.damage = damage
        this.attackSpeed = attackSpeed
        this.attackRange = attackRange
        this.projectileType = projectileType
        this.projectiles = []
        this.countAttackTime = 0
        this.holdAttack = parseInt((200 / attackSpeed).toString())
        this.explosions = []
        this.baseTowerProperties = getBaseTowerProperties(this.towerType)
    }
    public draw(): void {
        super.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        // this.drawAttackRangeCicle()
    }
    public drawAttackRangeCicle(): void {
        if (context2D) {
            context2D.beginPath()
            context2D.arc(this.position.x + this.offset.x, this.position.y, this.attackRange, 0, 2 * Math.PI)
            context2D.fillStyle = 'rgba(225,225,225,0.1)'
            context2D.fill()
        }
    }
    public update({
        enemies,
        shootingAudio,
    }: {
        enemies: Enemy[]
        shootingAudio: HTMLAudioElement | HTMLElement | null
    }): void {
        this.draw()
        this.attackEnemies(enemies)
        this.updateProjectile(shootingAudio)
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
            if (this.baseTowerProperties) {
                const projectileOptions: T_projectile = {
                    name: this.baseTowerProperties.projectileInfo.name,
                    ProjectileType: this.baseTowerProperties.projectileInfo.projectileType,
                    position: {
                        x: this.position.x - this.width + 1.5 * this.offset.x,
                        y: this.position.y - this.height + 1.8 * this.offset.y,
                    },
                    damage: this.damage,
                    enemy: targetEnemy,
                    moveSpeed: 5,
                    width: this.baseTowerProperties.projectileInfo.width,
                    height: this.baseTowerProperties.projectileInfo.height,
                    offset: this.baseTowerProperties.projectileInfo.offset,
                    initFrames: this.baseTowerProperties.projectileInfo.initFrames,
                }
                const newProjectile: Projectile = new Projectile(projectileOptions)
                this.projectiles.push(newProjectile)
            }
        }
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
    private updateProjectile(shootingAudio: HTMLAudioElement | HTMLElement | null) {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile: Projectile = this.projectiles[i]
            const realEnemyPostion: T_position = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            }
            const distance: number = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion)
            if (distance < 5) {
                currentProjectile.targetEnemy.getHit(currentProjectile)
                if (this.baseTowerProperties) {
                    //create explosion
                    const position: T_position = {
                        x: currentProjectile.position.x - currentProjectile.offset.x,
                        y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                    }
                    const explosionOptions: T_explosion = {
                        name: this.baseTowerProperties.projectileInfo.explosionInfo.name,
                        explosionType: this.baseTowerProperties.projectileInfo.explosionInfo.explosionType,
                        position,
                        offset: this.baseTowerProperties.projectileInfo.explosionInfo.offset,
                        width: this.baseTowerProperties.projectileInfo.explosionInfo.width,
                        height: this.baseTowerProperties.projectileInfo.explosionInfo.height,
                        initFrames: this.baseTowerProperties.projectileInfo.explosionInfo.initFrames,
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
            const currentExplosion: ExplosionProjectile = this.explosions[i]
            this.explosions[i].update()
            const currentExplosionFrame = this.explosions[i].currentFrame
            if (!currentExplosionFrame) {
                this.explosions.splice(i, 1)
                continue
            }
            const isFinishedOneTimeAnimation: boolean =
                currentExplosion.cropPosition.x === currentExplosionFrame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosionFrame.maxY - 1
            if (isFinishedOneTimeAnimation) {
                if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                    shootingAudio.play()
                }
                this.explosions.splice(i, 1)
            }
        }
    }
}
