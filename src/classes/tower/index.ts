import DestroyExplosion from '../../classes/explosionProjectile/Destroy.js'
import FireProjectile from '../../classes/projectile/Fire.js'
import context2D from '../../context2D/index.js'
import { E_angels, E_behaviors, E_characterRoles, E_characters, E_projectile } from '../../enum/index.js'
import { calAngleFromPointAToPointB, calculateDistanceTwoPoint, createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position, T_sprite, T_tower } from '../../types/index.js'
import { I_character, I_projectile } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import PlacementTile from '../placementTile/index.js'
import Projectile from '../projectile/index.js'
import Sprite from '../sprite/index.js'
type T_towerData = {
    attackSpeed: number
    attackRange: number
    multipleTarget: number
    damage: number
    projectileType: E_projectile
}
export default class Tower extends Sprite implements I_character {
    public name: string
    public type: E_characters
    public countAttackTime: number
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    public holdAttack: number
    public projectileType?: E_projectile
    public projectiles: Projectile[]
    public placementTile: PlacementTile
    public role: E_characterRoles
    public explosions: ExplosionProjectile[]
    private destroyExplosion: ExplosionProjectile
    public beingDestroyed: boolean
    public data: T_towerData
    constructor({
        name,
        type,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        initFrames,
        damage = 100,
        attackSpeed = 1,
        attackRange = 300,
        multipleTarget = 1,
        projectileType = E_projectile.FIRE,
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile,
    }: T_tower) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames, opacity })
        this.name = name
        this.type = type
        this.data = { damage, attackSpeed, attackRange, multipleTarget, projectileType }
        this.projectiles = []
        this.holdAttack = parseInt((1000 / attackSpeed).toString())
        this.countAttackTime = this.holdAttack
        this.explosions = []
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.role = E_characterRoles.ATTACK
        this.placementTile = placementTile
    }
    public draw(): void {
        if (context2D) {
            context2D.beginPath()
            context2D.arc(
                this.placementTile.position.x + 32,
                this.placementTile.position.y + 32,
                this.data.attackRange,
                0,
                2 * Math.PI
            )
            context2D.fillStyle = 'rgba(225,225,225,0.15)'
            context2D.arc(this.position.x + this.offset.x, this.position.y, this.data.attackRange, 0, 2 * Math.PI)
            context2D.fillStyle = 'rgba(225,225,225,0.1)'
            context2D.fill()
        }
    }
    private createLeveUpIcon() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/level-up.png',
                    maxX: 5,
                    maxY: 3,
                    holdTime: 4,
                },
            },
        }

        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 4, y: 12 },
            height: 80,
            width: 80,
        }
        return new Sprite(options)
    }
    public update({
        enemies,
        shootingAudio,
        isDisplayAttackRangeCircle,
    }: {
        enemies: Enemy[]
        shootingAudio: HTMLAudioElement | HTMLElement | null
        isDisplayAttackRangeCircle: boolean
    }): void {
        if (this.beingDestroyed) {
            this.destroyExplosion.update()
        } else {
            this.draw()
            this.attackEnemies(enemies)
            this.updateProjectile(shootingAudio)
        }
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
        // update or delete explosions - when explosion finieshed one time animation then delete it,otherwise update it
        for (var i = this.explosions.length - 1; i >= 0; i--) {
            const currentExplosion: ExplosionProjectile = this.explosions[i]
            this.explosions[i].update()
            if (currentExplosion.hasFinishedAnimation) {
                if (shootingAudio && shootingAudio instanceof HTMLAudioElement && shootingAudio.paused) {
                    // shootingAudio.play()
                }
                this.explosions.splice(i, 1)
            }
        }
    }
    private createDestroyExplosion(): ExplosionProjectile {
        return new DestroyExplosion({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height,
            },
        })
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
        if (enemiesInRange.length <= 0) {
            this.behaviorKey = E_behaviors.IDLE
            return
        }
        this.behaviorKey = E_behaviors.ATTACK
        const targetEnemies: Enemy[] = enemiesInRange.slice(0, this.data.multipleTarget)
        const centerRightTargetEnemyPosition = {
            x: targetEnemies[0].position.x + targetEnemies[0].width - targetEnemies[0].offset.x,
            y: targetEnemies[0].position.y - targetEnemies[0].height / 2,
        }
        const centerLeftTowerPosition = {
            x: this.position.x + this.width - this.offset.x,
            y: this.position.y - this.height / 2,
        }
        this.angelKey = this.getAngleKeyByTwoPoint(centerLeftTowerPosition, centerRightTargetEnemyPosition)
        const newProjectiles: Projectile[] = this.createProjectiles(targetEnemies)
        this.projectiles = [...this.projectiles, ...newProjectiles]
    }
    public createProjectiles(targetEnemies: Enemy[]): Projectile[] {
        return targetEnemies.map((enemy) => {
            const projectileOptions: I_projectile = {
                position: {
                    x: this.position.x - this.width + 1.5 * this.offset.x,
                    y: this.position.y - this.height + 1.8 * this.offset.y,
                },
                damage: this.data.damage,
                enemy,
                moveSpeed: 30,
                offset: { x: 0, y: 0 },
            }
            return new FireProjectile(projectileOptions)
        })
    }
    private getEnemiesInAttackRange(currentEnemies: Enemy[]): Enemy[] {
        const enemiesInRange: Enemy[] = []
        currentEnemies.forEach((enemy: Enemy) => {
            const realPostion: T_position = { x: this.position.x + this.offset.x, y: this.position.y }
            const distance: number = calculateDistanceTwoPoint(enemy.position, realPostion)
            if (distance <= this.data.attackRange && enemy.remainHealth > 0) {
                enemiesInRange.push(enemy)
            }
        })
        return enemiesInRange.sort((a, b) => b.position.x - a.position.x)
    }
    public hasCollision(position: T_position): boolean {
        return (
            this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width &&
            this.position.y <= position.y &&
            position.y <= this.position.y + this.height - this.offset.y
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
