import context2D from '../../context2D/index.js'
import { E_projectile } from '../../enum/index.js'
import { calculateDistanceTwoPoint } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import Enemy from '../enemies/index.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import BloodMoonProjectile from '../projectiles/bloodMoon/index.js'
import Projectile from '../projectiles/index.js'
import Sprite from '../sprite/index.js'
interface props {
    position: T_position
    offset: T_position
    width: number
    height: number
    frame: T_frame
    imageSources: HTMLImageElement[]
    attackSpeed: number
    attackArea: number
    damage: number
    projectileType: E_projectile
}
export default class Tower extends Sprite {
    public attackSpeed: number
    public attackArea: number
    public damage: number
    public countAttackTime: number
    public holdAttack: number
    public projectileType: E_projectile
    public projectiles: Projectile[]
    public explosions: ExplosionProjectile[]
    constructor({
        position,
        offset,
        width,
        height,
        frame,
        imageSources,
        projectileType,
        damage,
        attackSpeed,
        attackArea,
    }: props) {
        super({ position, offset, width, height, imageSources, frame })
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
    public drawAttackRangeCicle() {
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
        shootingAudio: HTMLElement | HTMLAudioElement | null
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
            const newProjectile: Projectile = this.createProjectile(targetEnemy)
            this.projectiles.push(newProjectile)
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
    private createProjectile(enemy: Enemy) {
        const projectileSetting = {
            position: {
                x: this.position.x - this.width + 1.5 * this.offset.x,
                y: this.position.y - this.height + 1.8 * this.offset.y,
            },
            damage: this.damage,
            enemy,
            moveSpeed: 5,
        }
        switch (this.projectileType) {
            case E_projectile.BLOOD_MOON:
                return new BloodMoonProjectile(projectileSetting)
            default:
                throw new Error('we dont have this projectile')
        }
    }
    private getEnemiesInAttackRange(currentEnemies: Enemy[]): Enemy[] {
        const enemiesInRange: Enemy[] = []
        currentEnemies.forEach((enemy: Enemy) => {
            const realPostion = { x: this.position.x + this.offset.x, y: this.position.y }
            const distance: number = calculateDistanceTwoPoint(enemy.position, realPostion)
            if (distance <= this.attackArea) {
                enemiesInRange.push(enemy)
            }
        })
        return enemiesInRange
    }
    private updateProjectile(shootingAudio: HTMLElement | HTMLAudioElement | null) {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile: Projectile = this.projectiles[i]
            const realEnemyPostion = {
                x: currentProjectile.targetEnemy.position.x - currentProjectile.targetEnemy.width / 4,
                y: currentProjectile.targetEnemy.position.y - currentProjectile.targetEnemy.height / 5,
            }
            const distance: number = calculateDistanceTwoPoint(currentProjectile.position, realEnemyPostion)
            if (distance < 5) {
                currentProjectile.targetEnemy.attacked(currentProjectile)
                const position = {
                    x: currentProjectile.position.x - currentProjectile.offset.x,
                    y: currentProjectile.position.y - currentProjectile.offset.y + currentProjectile.width / 2,
                }
                const explosion = new ExplosionProjectile({
                    position,
                    offset: currentProjectile.explosionProjectileInfo.offset,
                    imageSources: currentProjectile.explosionProjectileInfo.imageSources,
                    frame: currentProjectile.explosionProjectileInfo.frame,
                })
                this.explosions.push(explosion)
                this.projectiles.splice(i, 1)
            } else {
                currentProjectile.update()
            }
        }
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosion = this.explosions[i]
            const isFinishFrame =
                currentExplosion.cropPosition.x === currentExplosion.frame.maxX - 1 &&
                currentExplosion.cropPosition.y === currentExplosion.frame.maxY - 1
            if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                shootingAudio.play()
            }
            if (isFinishFrame) {
                this.explosions.splice(i, 1)
            } else {
                this.explosions[i].update()
            }
        }
    }
}
