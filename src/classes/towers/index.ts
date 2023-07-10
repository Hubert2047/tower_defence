import context2D from '../../context2D/index.js'
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { E_projectile, E_tower } from '../../enum/index.js'
import { calculateDistanceTwoPoint, createImageSources } from '../../helper/index.js'
import { T_baseTowerProperties, T_explosion, T_position, T_projectile, T_tower } from '../../types/index.js'
import Enemy from '../enemies/index.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import Projectile from '../projectiles/index.js'
import Sprite from '../sprite/index.js'

export default class Tower extends Sprite {
    public name: string
    public towerType: E_tower
    public attackSpeed: number
    public attackArea: number
    public damage: number
    public countAttackTime: number
    public holdAttack: number
    public projectileType: E_projectile
    public projectiles: Projectile[]
    public explosions: ExplosionProjectile[]
    constructor({
        name,
        towerType,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        frame,
        imageSourceString,
        projectileType = E_projectile.BLOOD_MOON,
        damage = 100,
        attackSpeed = 1,
        attackArea = 300,
    }: T_tower) {
        const imageSources: HTMLImageElement[] = createImageSources(imageSourceString)

        super({ position, offset, width, height, imageSources, frame })
        this.name = name
        this.towerType = towerType
        this.damage = damage
        this.attackSpeed = attackSpeed
        this.attackArea = attackArea
        this.projectileType = projectileType
        this.projectiles = []
        this.countAttackTime = 0
        this.holdAttack = parseInt((200 / attackSpeed).toString())
        this.explosions = []
    }
    public draw({ sourceIndex }: { sourceIndex: number }): void {
        super.draw({ sourceIndex })
        // this.drawAttackRangeCicle()
    }
    public drawAttackRangeCicle(): void {
        if (context2D) {
            context2D.beginPath()
            context2D.arc(this.position.x + this.offset.x, this.position.y, this.attackArea, 0, 2 * Math.PI)
            context2D.fillStyle = 'rgba(225,225,225,0,1)'
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
        this.draw({ sourceIndex: 0 })
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
            const towerBaseProperties: T_baseTowerProperties | undefined = getBaseTowerProperties(this.towerType)
            if (towerBaseProperties) {
                const projectileOptions: T_projectile = {
                    name: towerBaseProperties.projectileInfo.name,
                    ProjectileType: towerBaseProperties.projectileInfo.projectileType,
                    position: {
                        x: this.position.x - this.width + 1.5 * this.offset.x,
                        y: this.position.y - this.height + 1.8 * this.offset.y,
                    },
                    damage: this.damage,
                    enemy: targetEnemy,
                    moveSpeed: 2,
                    imageSourceString: towerBaseProperties.projectileInfo.imageSourceString,
                    frame: towerBaseProperties.projectileInfo.frame,
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
            if (distance <= this.attackArea) {
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
                currentProjectile.targetEnemy.attacked(currentProjectile)
                const towerBaseProperties: T_baseTowerProperties | undefined = getBaseTowerProperties(this.towerType)
                if (towerBaseProperties) {
                    //create explosion
                    const position: T_position = {
                        x: currentProjectile.position.x - currentProjectile.offset.x,
                        y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                    }
                    const explosionOptions: T_explosion = {
                        name: towerBaseProperties.projectileInfo.explosionInfo.name,
                        explosionType: towerBaseProperties.projectileInfo.explosionInfo.explosionType,
                        position,
                        offset: towerBaseProperties.projectileInfo.explosionInfo.offset,
                        width: towerBaseProperties.projectileInfo.explosionInfo.width,
                        height: towerBaseProperties.projectileInfo.explosionInfo.height,
                        frame: towerBaseProperties.projectileInfo.explosionInfo.frame,
                        imageSourceString: towerBaseProperties.projectileInfo.explosionInfo.imageSourceString,
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
            const isFinishedOneTimeAnimation: boolean =
                currentExplosion.cropPosition.x === currentExplosion.frame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosion.frame.maxY - 1
            if (isFinishedOneTimeAnimation) {
                if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                    shootingAudio.play()
                }
                this.explosions.splice(i, 1)
            } else {
                this.explosions[i].update()
            }
        }
    }
}
