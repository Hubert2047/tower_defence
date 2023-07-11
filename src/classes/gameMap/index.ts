import { POSITION_GOAL, TILE_SIZE } from '../../constants/index.js'
import context2D from '../../context2D/index.js'
import getBaseEnemyProperties from '../../data/baseProperties/enemies/index.js'
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { E_angels, E_behaviors, E_enemy, E_tower } from '../../enum/index.js'
import { createFrames, randomNumberInRange } from '../../helper/index.js'
import {
    T_baseEnemyProperties,
    T_baseTowerProperties,
    T_dashboardEnemyBorder,
    T_enemy,
    T_enemyInfo,
    T_gameMapData,
    T_initFramesDictionary,
    T_position,
    T_round,
    T_sprite,
    T_tower,
} from '../../types/index.js'
import Border from '../dashboardEnemyBorder/index.js'
import Enemy from '../enemy/index.js'
import PlacementTile from '../placementTile/index.js'
import Sprite from '../sprite/index.js'
import Tower from '../tower/index.js'
interface T_dashboardEnemiesInfo {
    enemyType: E_enemy
    dashboardEnemy: Enemy
    dashboardEnemyBorder: Border
    remainEnemiesTotal: number
}
type T_text = {
    text: string
    position: T_position
    fontSize?: number
    color?: string
}
export default class GameMap {
    private _currentEnemiesData: Enemy[]
    private rounds: T_round[]
    private currentRoundIndex: number
    private placementTiles: PlacementTile[]
    public backgroundImage: HTMLImageElement
    private towers: Tower[]
    private waypoints: T_position[]
    private limitAttacks: number
    public coins: number
    private isGameOver: boolean
    private isVictory: boolean
    public shootingAudio: HTMLElement | HTMLAudioElement | null
    private _activeTile: PlacementTile | null
    private menu: Sprite
    private coinsIcon: Sprite
    private heartIcon: Sprite
    private eggs: Sprite
    private effect: Sprite
    private deathEffectEnemies: Enemy[]
    private currentDashboardEnemiesInfo: T_dashboardEnemiesInfo[]
    constructor({ rounds, placementTiles2D, waypoints, backgroundImage, limitAttacks, startCoins }: T_gameMapData) {
        this._currentEnemiesData = []
        this.rounds = rounds
        this.waypoints = waypoints
        this.limitAttacks = limitAttacks
        this.backgroundImage = backgroundImage
        this.currentRoundIndex = 0
        this.placementTiles = this.getPlacementTiles(placementTiles2D)
        this.shootingAudio = document.getElementById('shooting')
        this.towers = []
        this.coins = startCoins
        this.currentDashboardEnemiesInfo = []
        this.menu = this.createMenu()
        this.coinsIcon = this.createCoinsIcon()
        this.heartIcon = this.createHeartIcon()
        this.eggs = this.createEgg()
        this.effect = this.createEffec()
        this._activeTile = null
        this.deathEffectEnemies = []
        this.isGameOver = false
        this.isVictory = false

        this.spawingCurrentRoundEnemies()
    }
    public updateMap(mouse: T_position): [boolean, boolean] {
        this.updateScreenGame()
        this.updateEnemies()
        this.updatePlacementTiles(mouse)
        this.updateTowers()
        this.updateDashboardEnemies()
        this.drawCoinsAndGameHearts()
        this.eggs.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        this.effect.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })

        return [this.isGameOver, this.isVictory]
    }
    private createMenu() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }

        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: 64 * 17, y: 64 * 1 },
            offset: { x: 10, y: 26 },
            height: 120,
            width: 230,
        }
        return new Sprite(options)
    }
    private createCoinsIcon() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: 64 * 17, y: 64 * 1 },
            offset: { x: 4, y: -12 },
            height: 40,
            width: 40,
        }
        return new Sprite(options)
    }
    private createHeartIcon() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: 64 * 19, y: 64 * 1 },
            offset: { x: 40, y: -14 },
            height: 34,
            width: 34,
        }
        return new Sprite(options)
    }
    private createEffec() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: 64 * 16, y: 64 * 6 },
            offset: { x: -20, y: -30 },
            height: 400,
            width: 400,
        }
        return new Sprite(options)
    }
    private createEgg() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/Eggs/eggs_9.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/Eggs/eggs_9.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/Eggs/eggs_9.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/Eggs/eggs_9.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: 64 * 18, y: 64 * 5 },
            offset: { x: 3, y: 0 },
            height: 200,
            width: 200,
        }
        return new Sprite(options)
    }
    public get activeTile(): PlacementTile | null {
        return this._activeTile
    }
    private updateScreenGame(): void {
        this.createBackground()
    }
    private createBackground(): void {
        if (context2D) context2D.drawImage(this.backgroundImage, 0, 0)
    }
    private drawCoinsAndGameHearts(): void {
        this.menu.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        this.drawCoins()
        this.drawHearts()
    }
    private drawCoins() {
        this.coinsIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        const textOptions: T_text = {
            text: this.coins.toString(),
            position: { x: this.coinsIcon.position.x + 46, y: this.coinsIcon.position.y - 26 },
            color: 'white',
            fontSize: 20,
        }
        this.drawText(textOptions)
    }
    private drawHearts() {
        this.heartIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        const textOptions: T_text = {
            text: this.limitAttacks.toString(),
            position: { x: this.heartIcon.position.x, y: this.heartIcon.position.y - 26 },
            color: 'white',
            fontSize: 20,
        }
        this.drawText(textOptions)
    }
    private drawText({ text, position, color = 'black', fontSize = 16 }: T_text) {
        if (context2D) {
            context2D.font = `${fontSize}px Changa One`
            context2D.fillStyle = color
            context2D.fillText(text, position.x, position.y)
        }
    }
    private updateDashboardEnemies(): void {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemyInfor, index) => {
            dashboardEnemyInfor.dashboardEnemyBorder.update()
            dashboardEnemyInfor.dashboardEnemy.draw({ behaviorKey: E_behaviors.RUN, angelKey: E_angels.ANGEL_90 })
            const textOptions: T_text = {
                text: dashboardEnemyInfor.remainEnemiesTotal.toString(),
                position: {
                    x: dashboardEnemyInfor.dashboardEnemyBorder.position.x + 25,
                    y: dashboardEnemyInfor.dashboardEnemyBorder.position.y - 5,
                },
                color: '#8B4513',
                fontSize: 20,
            }
            this.drawText(textOptions)
        })
    }

    public get currentEnemiesData() {
        return this._currentEnemiesData
    }
    public updatePlacementTiles(mouse: T_position): void {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(mouse)
        })
    }
    public updateTowers(): void {
        this.towers.forEach((tower: Tower) => {
            tower.update({ enemies: this._currentEnemiesData, shootingAudio: this.shootingAudio })
        })
    }
    public updateEnemies(): void {
        if (this._currentEnemiesData.length <= 0) {
            if (this.currentRoundIndex < this.rounds.length - 1) {
                this.currentRoundIndex++
                this.spawingCurrentRoundEnemies()
            } else {
                this.isVictory = true
            }
        }
        for (let i = this._currentEnemiesData.length - 1; i >= 0; i--) {
            const currentEnemy: Enemy = this._currentEnemiesData[i]
            //enemy reached target gold
            if (currentEnemy.position.x > POSITION_GOAL) {
                this.limitAttacks -= 1
                this._currentEnemiesData.splice(i, 1)
                this.subtractDashboardEnemies(currentEnemy)
                if (this.limitAttacks === 0) {
                    this.isGameOver = true
                    break
                }
                continue
            }
            if (currentEnemy.remainHealth <= 0) {
                //enemy dead
                const deathEnemyOptions: T_enemy = {
                    name: currentEnemy.name,
                    position: currentEnemy.position,
                    enemyType: currentEnemy.enemyType,
                    initFrames: currentEnemy.initFrames,
                    offset: currentEnemy.offset,
                    width: currentEnemy.width,
                    height: currentEnemy.height,
                    moveSpeed: currentEnemy.moveSpeed,
                    angelKey: currentEnemy.angelKey,
                    behaviorKey: E_behaviors.DEATH,
                }
                this.deathEffectEnemies.push(new Enemy(deathEnemyOptions))
                this._currentEnemiesData.splice(i, 1)
                this.subtractDashboardEnemies(currentEnemy)
                this.coins += currentEnemy.coins
                continue
            }
            currentEnemy.update(this.waypoints)
        }
        this.updateDeathEffectEnemies()
    }
    private updateDeathEffectEnemies() {
        for (let i = this.deathEffectEnemies.length - 1; i >= 0; i--) {
            const currentDeathEffectEnemyFrame = this.deathEffectEnemies[i].currentFrame
            if (!currentDeathEffectEnemyFrame) {
                this.deathEffectEnemies.splice(i, 1)
                continue
            }
            const currentDeathEffectEnemy: Enemy = this.deathEffectEnemies[i]
            const isFinishedOneTimeAnimation: boolean =
                currentDeathEffectEnemy.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
                currentDeathEffectEnemy.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1
            if (isFinishedOneTimeAnimation) {
                this.deathEffectEnemies.splice(i, 1)
            } else {
                currentDeathEffectEnemy.updateDeathEffect()
            }
        }
    }
    public subtractDashboardEnemies(subtractEnemy: Enemy): void {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemy) => {
            if (dashboardEnemy.enemyType === subtractEnemy.enemyType) {
                dashboardEnemy.remainEnemiesTotal--
            }
        })
    }
    public addTower({ towerType }: { towerType: E_tower }): void {
        if (!this.activeTile) return
        const towerBaseProperties: T_baseTowerProperties | undefined = getBaseTowerProperties(towerType)
        if (towerBaseProperties) {
            if (this.coins < towerBaseProperties.prices) return
            this.coins -= towerBaseProperties.prices
            const towerOptions: T_tower = {
                name: towerBaseProperties.name,
                projectileType: towerBaseProperties.projectileInfo.projectileType,
                towerType: towerBaseProperties.towerType,
                position: this.activeTile?.position,
                offset: towerBaseProperties.offset,
                width: towerBaseProperties.width,
                height: towerBaseProperties.height,
                initFrames: towerBaseProperties.initFrames,
                attackSpeed: towerBaseProperties.attackSpeed,
                attackRange: towerBaseProperties.attackRange,
                damage: towerBaseProperties.damage,
            }
            const tower: Tower = new Tower(towerOptions)
            this.towers.push(tower)
            this.activeTile.isOccupied = true
        }
    }
    private spawingCurrentRoundEnemies(): void {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = []
        }
        this.currentDashboardEnemiesInfo = []
        const currentRound: T_round = this.rounds[this.currentRoundIndex]
        currentRound.enemies.forEach((enemyInfo: T_enemyInfo, index: number) => {
            const baseEnemyProperty: T_baseEnemyProperties | undefined = getBaseEnemyProperties(enemyInfo.enemyType)
            if (baseEnemyProperty) {
                //create dashboard enemies and its border
                const dashboardEnemy: Enemy = this.createDashboardEnemy(enemyInfo, baseEnemyProperty, index)
                const dashboardEnemyBorderOptions: T_dashboardEnemyBorder = {
                    name: baseEnemyProperty.dashboardBorderInfo.name,
                    position: { x: 64 * index, y: 64 },
                    initFrames: baseEnemyProperty.initFrames,
                    offset: baseEnemyProperty.dashboardBorderInfo.offset,
                    width: baseEnemyProperty.dashboardBorderInfo.width,
                    height: baseEnemyProperty.dashboardBorderInfo.height,
                }
                const dashboardEnemyBorder = new Border(dashboardEnemyBorderOptions)
                this.currentDashboardEnemiesInfo.push({
                    enemyType: enemyInfo.enemyType,
                    dashboardEnemy,
                    dashboardEnemyBorder,
                    remainEnemiesTotal: enemyInfo.amount,
                })
                //create battle enemies
                for (let i = 0; i < enemyInfo.amount; i++) {
                    const battleEnemy = this.createBattleEnemy(enemyInfo, baseEnemyProperty, i)
                    this._currentEnemiesData.push(battleEnemy)
                }
            }
        })
    }
    private createBattleEnemy(enemyInfo: T_enemyInfo, baseEnemyProperty: T_baseEnemyProperties, index: number): Enemy {
        const space: number = randomNumberInRange(enemyInfo.spaceMin, enemyInfo.spaceMax)
        const randomNum: number = index === 0 ? 0 : randomNumberInRange(6, 10)
        const position: T_position = { x: enemyInfo.basePosition.x - space * randomNum, y: enemyInfo.basePosition.y }
        const battleEnemyOptions: T_enemy = {
            name: baseEnemyProperty.name,
            enemyType: enemyInfo.enemyType,
            position,
            offset: baseEnemyProperty.offset,
            initFrames: baseEnemyProperty.initFrames,
            width: baseEnemyProperty.width,
            height: baseEnemyProperty.height,
            moveSpeed: enemyInfo.moveSpeed,
            coins: enemyInfo.coins,
            health: enemyInfo.health,
        }
        return new Enemy(battleEnemyOptions)
    }
    private createDashboardEnemy(
        enemyInfo: T_enemyInfo,
        baseEnemyProperty: T_baseEnemyProperties,
        index: number
    ): Enemy {
        const enemyOptions: T_enemy = {
            name: baseEnemyProperty.name,
            enemyType: enemyInfo.enemyType,
            position: { x: 64 * index, y: 64 },
            offset: { x: 14, y: 16 },
            initFrames: baseEnemyProperty.initFrames,
            width: 90,
            height: 90,
            moveSpeed: enemyInfo.moveSpeed,
        }
        return new Enemy(enemyOptions)
    }
    public checkActiveTile({ mouse }: { mouse: T_position }): void {
        this._activeTile = this.placementTiles.find((tile) => tile.hasCollisionWithMouse(mouse)) ?? null
    }
    private getPlacementTiles(placementTiles2D: number[][]): PlacementTile[] {
        const placementTiles: PlacementTile[] = []
        placementTiles2D.forEach((row: number[], y: number) => {
            row.forEach((symbol: number, x: number) => {
                if (symbol === 14) {
                    placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }))
                }
            })
        })
        return placementTiles
    }
}
