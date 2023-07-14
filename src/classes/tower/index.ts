import FireProjectile from '../../classes/projectile/Fire.js'
import context2D from '../../context2D/index.js'
import { E_angels, E_behaviors, E_projectile, E_tower } from '../../enum/index.js'
import { calAngleFromPointAToPointB, calculateDistanceTwoPoint, createFrames } from '../../helper/index.js'
import { T_frame, T_position, T_tower } from '../../types/index.js'
import { I_projectile } from '../../types/interface.js'
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
        opacity = 1,
    }: T_tower) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames, opacity })
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
    private updateProjectile(shootingAudio: HTMLAudioElement | HTMLElement | null) {
        for (var i = this.projectiles.length - 1; i >= 0; i--) {
            const currentProjectile: Projectile = this.projectiles[i]
            currentProjectile.update()
            if (currentProjectile.canHitEnemy) {
                currentProjectile.targetEnemy.getHit(currentProjectile.damage)
                //create explosion
                const explosion: ExplosionProjectile = currentProjectile.createExplosion()
                this.explosions.push(explosion)
                this.projectiles.splice(i, 1)
            }
        }
        //update or delete explosions - when explosion finieshed one time animation then delete it,otherwise update it
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosion: ExplosionProjectile = this.explosions[i]
            this.explosions[i].update()
            if (currentExplosion.hasFinishedAnimation) {
                if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                    shootingAudio.play()
                }
                this.explosions.splice(i, 1)
            }
        }
    }
    private attackEnemies(enemies: Enemy[]): void {
        if (this.countAttackTime < this.holdAttack) {
            this.countAttackTime++
            return
        }
        this.countAttackTime = 0
        if (enemies.length <= 0) return
        const enemiesInRange: Enemy[] = this.getEnemiesInAttackRange(enemies)
        if (enemiesInRange.length <= 0) {
            this.angelKey = E_angels.ANGEL_225
        }
        if (enemiesInRange.length > 0) {
            const targetEnemy: Enemy = this.findTargetEnemy(enemiesInRange)
            const centerRightTargetEnemyPosition = {
                x: targetEnemy.position.x + targetEnemy.width - targetEnemy.offset.x,
                y: targetEnemy.position.y - targetEnemy.height / 2,
            }
            const centerLeftTowerPosition = {
                x: this.position.x + this.width - this.offset.x,
                y: this.position.y - this.height / 2,
            }
            this.angelKey = this.getAngleKeyByTwoPoint(centerLeftTowerPosition, centerRightTargetEnemyPosition)
            const newProjectile: Projectile = this.createProjectile(targetEnemy)
            this.projectiles.push(newProjectile)
        }
    }
    public createProjectile(targetEnemy: Enemy): Projectile {
        const projectileOptions: I_projectile = {
            position: {
                x: this.position.x - this.width + 1.5 * this.offset.x,
                y: this.position.y - this.height + 1.8 * this.offset.y,
            },
            damage: this.damage,
            enemy: targetEnemy,
            moveSpeed: 5,
            offset: { x: 0, y: 0 },
        }
        return new FireProjectile(projectileOptions)
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

    private getAngleKeyByTwoPoint(pointA: T_position, pointB: T_position): E_angels {
        const angel = calAngleFromPointAToPointB(pointA, pointB)
        if ((angel >= 0 && angel < 11.25) || angel >= 348.25) {
            return E_angels.ANGEL_0
        }
        if (angel >= 11.25 && angel < 33.25) {
            return E_angels.ANGEL_22
        }

        if (angel >= 33.25 && angel < 56.25) {
            return E_angels.ANGEL_45
        }
        if (angel >= 56.25 && angel < 78.25) {
            return E_angels.ANGEL_67
        }
        if (angel >= 78.25 && angel < 101.25) {
            return E_angels.ANGEL_90
        }
        if (angel >= 101.25 && angel < 123.25) {
            return E_angels.ANGEL_112
        }
        if (angel >= 123.25 && angel < 146.25) {
            return E_angels.ANGEL_135
        }
        if (angel >= 146.25 && angel < 168.25) {
            return E_angels.ANGEL_157
        }
        if (angel >= 168.25 && angel < 191.25) {
            return E_angels.ANGEL_180
        }
        if (angel >= 191.25 && angel < 213.25) {
            return E_angels.ANGEL_202
        }
        if (angel >= 213.25 && angel < 236.25) {
            return E_angels.ANGEL_225
        }
        if (angel >= 236.25 && angel < 258.25) {
            return E_angels.ANGEL_247
        }
        if (angel >= 258.25 && angel < 281.25) {
            return E_angels.ANGEL_270
        }
        if (angel >= 281.25 && angel < 302.25) {
            return E_angels.ANGEL_292
        }
        if (angel >= 302.25 && angel < 326.25) {
            return E_angels.ANGEL_315
        }
        if (angel >= 326.25 && angel < 348.25) {
            return E_angels.ANGEL_337
        }
        return E_angels.ANGEL_0
    }
}
