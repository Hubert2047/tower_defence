import DestroyExplosion from '../../classes/explosionProjectile/Destroy.js'
import FireProjectile from '../../classes/projectile/Fire.js'
import context2D from '../../context2D/index.js'
import {
    E_angels,
    E_behaviors,
    E_characterRoles,
    E_characters,
    E_levelTitle,
    E_projectile,
    E_towerAttackProperties,
} from '../../enum/index.js'
import { calAngleFromPointAToPointB, calculateDistanceTwoPoint, createFrames } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position, T_tower } from '../../types/index.js'
import { I_character, I_projectile } from '../../types/interface.js'
import Enemy from '../enemy/index.js'
import ExplosionProjectile from '../explosionProjectile/index.js'
import EffectTitleLevel from '../levelUp/EffectTitleLevel.js'
import LevelUpIcon from '../levelUpIcon/index.js'
import PlacementTile from '../placementTile/index.js'
import Projectile from '../projectile/index.js'
import Sprite from '../sprite/index.js'
type attackProperty = {
    currentLv: number
    value: number
}
type T_towerData = Record<string, attackProperty>

export default class Tower extends Sprite implements I_character {
    public name: string
    public type: E_characters
    public countAttackTime: number
    public behaviorKey: E_behaviors
    public angelKey: E_angels
    public holdAttack: number
    public projectileType?: E_projectile
    public projectiles: Projectile[]
    public placementTile: PlacementTile | undefined
    public role: E_characterRoles
    public explosions: ExplosionProjectile[]
    private destroyExplosion: ExplosionProjectile
    public beingDestroyed: boolean
    public data: T_towerData
    private levelUpIcon: LevelUpIcon
    public initFrames: T_initFramesDictionary
    public displayLevelUpTower: Tower | undefined
    public levelTitleEffect: EffectTitleLevel
    public levelUpTitleCondition: Record<string, Record<string, number>>
    constructor({
        name,
        type,
        position,
        offset = { x: 0, y: 0 },
        width = 124,
        height = 124,
        initFrames,
        data = {
            [E_towerAttackProperties.ATTACK_DAMAGE]: {
                currentLv: 0,
                value: 1000,
            },
            [E_towerAttackProperties.ATTACK_SPEED]: {
                currentLv: 0,
                value: 40,
            },
            [E_towerAttackProperties.ATTACK_RANGE]: {
                currentLv: 0,
                value: 300,
            },
            [E_towerAttackProperties.ATTACK_MULTI]: {
                currentLv: 0,
                value: 1,
            },
            [E_towerAttackProperties.PROJECTILE]: {
                currentLv: 0,
                value: E_projectile.FIRE,
            },
        },
        behaviorKey = E_behaviors.ATTACK,
        angelKey = E_angels.ANGEL_0,
        opacity = 1,
        placementTile,
        levelUpTitleCondition = {
            [E_levelTitle.TITLE_1]: {
                [E_towerAttackProperties.ATTACK_DAMAGE]: 10,
                [E_towerAttackProperties.ATTACK_SPEED]: 10,
                [E_towerAttackProperties.ATTACK_RANGE]: 10,
                [E_towerAttackProperties.ATTACK_MULTI]: 1,
                [E_towerAttackProperties.PROJECTILE]: 0,
            },
            [E_levelTitle.TITLE_2]: {
                [E_towerAttackProperties.ATTACK_DAMAGE]: 15,
                [E_towerAttackProperties.ATTACK_SPEED]: 15,
                [E_towerAttackProperties.ATTACK_RANGE]: 15,
                [E_towerAttackProperties.ATTACK_MULTI]: 3,
                [E_towerAttackProperties.PROJECTILE]: 0,
            },
            [E_levelTitle.TITLE_3]: {
                [E_towerAttackProperties.ATTACK_DAMAGE]: 20,
                [E_towerAttackProperties.ATTACK_SPEED]: 20,
                [E_towerAttackProperties.ATTACK_RANGE]: 20,
                [E_towerAttackProperties.ATTACK_MULTI]: 5,
                [E_towerAttackProperties.PROJECTILE]: 0,
            },
        },
        isDisplayLevelUpTower,
    }: T_tower) {
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, offset, width, height, frames, opacity })
        this.name = name
        this.type = type
        this.role = E_characterRoles.TOWER
        this.data = data
        this.levelUpTitleCondition = levelUpTitleCondition
        const currentLevelTitle = this.getCurrentLevelTitle()
        this.levelTitleEffect = new EffectTitleLevel({
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 32, y: 75 },
            height: 128,
            width: 128,
            currentLevelTitle,
        })
        this.projectiles = []
        this.holdAttack = parseInt((1000 / this.data[E_towerAttackProperties.ATTACK_SPEED].value).toString())
        this.countAttackTime = this.holdAttack
        this.explosions = []
        this.behaviorKey = behaviorKey
        this.initFrames = initFrames
        this.angelKey = angelKey
        this.placementTile = placementTile
        this.levelUpIcon = new LevelUpIcon({
            name: 'level up',
            position: { x: this.position.x, y: this.position.y },
            offset: { x: 4, y: 12 },
            height: 80,
            width: 80,
            behaviorKey: E_behaviors.RUN,
        })
        this.destroyExplosion = this.createDestroyExplosion()
        this.beingDestroyed = false
        if (!isDisplayLevelUpTower) {
            this.displayLevelUpTower = this.createTowerDisplayLevelUp({ width: this.width, height: this.height })
        }
    }

    public get isAlreadyDestroyed(): boolean {
        return this.destroyExplosion.hasFinishedAnimation && this.beingDestroyed
    }
    public drawAttackRangeCicle(): void {
        if (context2D && this.placementTile !== undefined) {
            context2D.beginPath()
            context2D.arc(
                this.placementTile.position.x + 32,
                this.placementTile.position.y + 32,
                this.data[E_towerAttackProperties.ATTACK_RANGE].value,
                0,
                2 * Math.PI
            )
            context2D.fillStyle = 'rgba(225,225,225,0.15)'
            context2D.fill()
        }
    }
    public createTowerDisplayLevelUp({
        height = this.height,
        width = this.width,
        offset = { x: 0, y: 0 },
    }: {
        height?: number
        width?: number
        offset?: T_position
    }): Tower {
        const towerOption: T_tower = {
            position: { x: 0, y: 0 },
            name: this.name,
            type: this.type,
            initFrames: this.initFrames,
            height,
            width,
            isDisplayLevelUpTower: true,
            offset,
        }
        return new Tower(towerOption)
    }
    public update({
        enemies,
        shootingAudio,
        isDisplayAttackRangeCircleAndLevelUp,
    }: {
        enemies: Enemy[]
        shootingAudio: HTMLAudioElement | HTMLElement | null
        isDisplayAttackRangeCircleAndLevelUp: boolean
    }): void {
        if (this.beingDestroyed) {
            this.destroyExplosion.update()
        } else {
            this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
            this.attackEnemies(enemies)
            this.updateProjectile(shootingAudio)
            if (isDisplayAttackRangeCircleAndLevelUp) {
                this.drawAttackRangeCicle()
                this.levelUpIcon.update()
            }
        }
        this.levelTitleEffect.update()
    }
    public upPropertyLelvel({ property, value }: { property: string; value: number }) {
        if (property === E_towerAttackProperties.PROJECTILE) {
            this.data[property].value = value
        } else {
            this.data[property].value += value
            this.data[property].currentLv++
        }
        this.levelTitleEffect.currentLevelTitle = this.getCurrentLevelTitle()
        if (this.displayLevelUpTower)
            this.displayLevelUpTower.levelTitleEffect.currentLevelTitle = this.getCurrentLevelTitle()
    }
    private getCurrentLevelTitle(levelTitleKeyIndex: number = 0): string {
        const dataPropertyKeys = Object.keys(this.data)
        const levelTitleKeys = Object.keys(this.levelUpTitleCondition)
        const hasFulfillCondition = dataPropertyKeys.every((dataPropertyKey) => {
            return (
                this.data[dataPropertyKey].currentLv >=
                    this.levelUpTitleCondition[levelTitleKeys[levelTitleKeyIndex]][dataPropertyKey] ||
                this.levelUpTitleCondition[levelTitleKeys[levelTitleKeyIndex]][dataPropertyKey] === 0
            )
        })
        if (!hasFulfillCondition && levelTitleKeyIndex === 0) {
            return E_levelTitle.TITLE_0
        }
        if (hasFulfillCondition && levelTitleKeyIndex < levelTitleKeys.length - 1) {
            const nextIndex = levelTitleKeyIndex + 1
            return this.getCurrentLevelTitle(nextIndex)
        }
        if (hasFulfillCondition && levelTitleKeyIndex >= levelTitleKeys.length - 1)
            return levelTitleKeys[levelTitleKeyIndex]
        return levelTitleKeys[levelTitleKeyIndex - 1]
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
        const targetEnemies: Enemy[] = enemiesInRange.slice(0, this.data[E_towerAttackProperties.ATTACK_MULTI].value)
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
                damage: this.data[E_towerAttackProperties.ATTACK_DAMAGE].value,
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
            if (distance <= this.data[E_towerAttackProperties.ATTACK_RANGE].value && enemy.remainHealth > 0) {
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
