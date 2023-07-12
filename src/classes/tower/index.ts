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
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    public holdAttack: number
    public projectileType?: E_projectile
    public projectiles: Projectile[]
    public explosions: ExplosionProjectile[]
    private baseTowerProperties: T_baseTowerProperties
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
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
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
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.baseTowerProperties = getBaseTowerProperties(this.towerType)
    }
    public draw(): void {
        super.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
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
                const projectTileInfo = this.baseTowerProperties.projectileInfo[this.behaviorKey]
                const projectileOptions: T_projectile = {
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
    public hasCollisionWithMouse(mouse: T_position): boolean {
        return (
            this.position.x + this.offset.x <= mouse.x &&
            mouse.x <= this.position.x + this.width - this.offset.x &&
            this.position.y - this.height + this.offset.y <= mouse.y &&
            mouse.y <= this.position.y + this.height - 3 * this.offset.y
        )
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
                currentProjectile.targetEnemy.getHit(currentProjectile.damage)
                if (this.baseTowerProperties) {
                    const explosionInfo = this.baseTowerProperties.projectileInfo[this.behaviorKey]?.explosionInfo
                    //create explosion
                    if (explosionInfo) {
                        const position: T_position = {
                            x: currentProjectile.position.x - currentProjectile.offset.x,
                            y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                        }
                        const explosionOptions: T_explosion = {
                            name: explosionInfo.name,
                            explosionType: explosionInfo.explosionType,
                            position,
                            offset: explosionInfo.offset,
                            width: explosionInfo.width,
                            height: explosionInfo.height,
                            initFrames: explosionInfo.initFrames,
                        }
                        const explosion: ExplosionProjectile = new ExplosionProjectile(explosionOptions)
                        this.explosions.push(explosion)
                    }
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
