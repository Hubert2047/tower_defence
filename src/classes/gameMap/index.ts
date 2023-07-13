import { GATE_POSITION_X, TILE_SIZE } from '../../constants/index.js'
import context2D from '../../context2D/index.js'
import getBaseEnemyProperties from '../../data/baseProperties/enemies/index.js'
import gatesBaseProperties from '../../data/baseProperties/gates/index.js'
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js'
import { E_angels, E_behaviors, E_enemy, E_gate } from '../../enum/index.js'
import { randomNumberInRange } from '../../helper/index.js'
import {
    T_baseEnemyProperties,
    T_baseTowerProperties,
    T_dashboardBorder,
    T_enemy,
    T_enemyInfo,
    T_gameMapData,
    T_gate,
    T_initDashboardTowerInfo,
    T_position,
    T_round,
    T_tower,
} from '../../types/index.js'
import Border from '../dashboardEnemyBorder/index.js'
import Enemy from '../enemy/index.js'
import Gate from '../gate/index.js'
import PlacementTile from '../placementTile/index.js'
import Tower from '../tower/index.js'
interface I_dashboardEnemiesInfo {
    enemyType: E_enemy
    dashboardEnemy: Enemy
    dashboardEnemyBorder: Border
    remainEnemiesTotal: number
}
interface I_dashboardTowersInfo {
    dashboardTower: Tower
    border: Border
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
    public coins: number
    // private isVictory: boolean
    public shootingAudio: HTMLElement | HTMLAudioElement | null
    private _mouseOverTile: PlacementTile | null
    public mouseOverDashboardTower: Tower | null
    public activeDashboardTower: Tower | null
    public activeDashboardTowerShadow: Tower | null
    public dashboardTowers: I_dashboardTowersInfo[]
    // private menu: Sprite
    // private coinsIcon: Sprite
    // private heartIcon: Sprite
    // private effect: Sprite
    private deathEffectEnemies: Enemy[]
    private gate: Gate
    private currentDashboardEnemiesInfo: I_dashboardEnemiesInfo[]
    constructor({
        rounds,
        placementTiles2D,
        waypoints,
        backgroundImage,
        startCoins,
        initDashboardTowerInfo,
    }: T_gameMapData) {
        this._currentEnemiesData = []
        this.rounds = rounds
        this.waypoints = waypoints
        this.backgroundImage = backgroundImage
        this.currentRoundIndex = 0
        this.placementTiles = this.getPlacementTiles(placementTiles2D)
        this.shootingAudio = document.getElementById('shooting')
        this.towers = []
        this.coins = startCoins
        this.currentDashboardEnemiesInfo = []
        // this.menu = this.createMenu()
        // this.coinsIcon = this.createCoinsIcon()
        // this.heartIcon = this.createHeartIcon()
        // this.effect = this.createEffec()
        this._mouseOverTile = null
        this.mouseOverDashboardTower = null
        this.activeDashboardTower = null
        this.deathEffectEnemies = []
        this.activeDashboardTowerShadow = null
        // this.isVictory = false
        this.dashboardTowers = this.createDashboardTowers(initDashboardTowerInfo)
        this.spawingCurrentRoundEnemies()
        this.gate = this.createGate()
    }
    private createGate(): Gate {
        const gateBaseProperties = gatesBaseProperties(E_gate.GIRL_HERO)
        const gateOptions: T_gate = {
            initFrames: gateBaseProperties.initFrames,
            name: gateBaseProperties.name,
            width: gateBaseProperties.width,
            height: gateBaseProperties.height,
            gateType: gateBaseProperties.gateType,
            position: { x: 64 * 18, y: 64 * 5 },
            offset: gateBaseProperties.offset,
            attackSpeed: gateBaseProperties.attackSpeed,
            attackRange: gateBaseProperties.attackRange,
            damage: gateBaseProperties.damage,
            health: gateBaseProperties.health,
        }
        return new Gate(gateOptions)
    }
    private createDashboardTowerShadow() {}
    private createDashboardTowers(initDashboardTowerInfo: T_initDashboardTowerInfo[]): I_dashboardTowersInfo[] {
        const dashboardTowers: I_dashboardTowersInfo[] = []
        initDashboardTowerInfo.forEach((dashboardTower) => {
            const baseTowerProperties: T_baseTowerProperties = getBaseTowerProperties(dashboardTower.towerType)
            const towerOptions: T_tower = {
                name: dashboardTower.name,
                towerType: dashboardTower.towerType,
                initFrames: baseTowerProperties.initFrames,
                position: dashboardTower.position,
                offset: dashboardTower.offset,
                width: dashboardTower.width,
                height: dashboardTower.height,
                projectileType: baseTowerProperties.projectileInfo[E_behaviors.ATTACK].projectileType,
            }
            const borderOptions: T_dashboardBorder = {
                name: dashboardTower.dashboardBorderInfo.name,
                position: dashboardTower.dashboardBorderInfo.position,
                initFrames: dashboardTower.dashboardBorderInfo.initFrames,
                offset: dashboardTower.dashboardBorderInfo.offset,
                width: dashboardTower.dashboardBorderInfo.width,
                height: dashboardTower.dashboardBorderInfo.height,
            }
            const newDashboardTower = new Tower(towerOptions)
            const newBorder = new Border(borderOptions)
            dashboardTowers.push({ dashboardTower: newDashboardTower, border: newBorder })
        })
        return dashboardTowers
    }
    public updateMap(): [boolean, boolean] {
        this.updateScreenGame()
        this.updateEnemies()
        this.updatePlacementTiles()
        this.updateTowers()
        this.updateDashboardEnemies()
        this.updateDashboardTowers()
        // this.drawCoinsAndGameHearts()
        this.updateGate()
        this.updateDashboardTowerShadow()
        return this.getGameStatus()
    }
    private updateDashboardTowerShadow() {
        if (this.activeDashboardTowerShadow) {
            this.activeDashboardTowerShadow.draw()
        }
    }
    private getGameStatus(): [boolean, boolean] {
        const isGameOver = this.gate.remainHealth === 0
        const isVictory = this._currentEnemiesData.length <= 0 && this.currentRoundIndex >= this.rounds.length - 1
        return [isGameOver, isVictory]
    }
    private updateGate() {
        if (this.gate) {
            this.gate.update({ enemies: this.currentEnemiesData })
        }
    }
    // private createMenu() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }

    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 17, y: 64 * 1 },
    //         offset: { x: 10, y: 26 },
    //         height: 120,
    //         width: 230,
    //     }
    //     return new Sprite(options)
    // }
    // private createCoinsIcon() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 17, y: 64 * 1 },
    //         offset: { x: 4, y: -12 },
    //         height: 40,
    //         width: 40,
    //     }
    //     return new Sprite(options)
    // }
    // private createHeartIcon() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 19, y: 64 * 1 },
    //         offset: { x: 40, y: -14 },
    //         height: 34,
    //         width: 34,
    //     }
    //     return new Sprite(options)
    // }
    // private createEffec() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 16, y: 64 * 6 },
    //         offset: { x: -20, y: -30 },
    //         height: 400,
    //         width: 400,
    //     }
    //     return new Sprite(options)
    // }
    private updateDashboardTowers(): void {
        this.dashboardTowers.map((dashboardTowerInfo) => {
            if (dashboardTowerInfo.dashboardTower === this.activeDashboardTower) {
                dashboardTowerInfo.border.updateSelected()
            } else {
                dashboardTowerInfo.border.update()
            }
            dashboardTowerInfo.dashboardTower.draw()
        })
        //   this.currentDashboardEnemiesInfo.forEach((dashboardEnemyInfor, index) => {
        //       dashboardEnemyInfor.dashboardEnemyBorder.update()
        //       dashboardEnemyInfor.dashboardEnemy.draw({ behaviorKey: E_behaviors.RUN, angelKey: E_angels.ANGEL_90 })
        //       const textOptions: T_text = {
        //           text: dashboardEnemyInfor.remainEnemiesTotal.toString(),
        //           position: {
        //               x: dashboardEnemyInfor.dashboardEnemyBorder.position.x + 25,
        //               y: dashboardEnemyInfor.dashboardEnemyBorder.position.y - 5,
        //           },
        //           color: '#8B4513',
        //           fontSize: 20,
        //       }
        //       this.drawText(textOptions)
        //   })
    }
    public get mouseOverTile(): PlacementTile | null {
        return this._mouseOverTile
    }
    private updateScreenGame(): void {
        this.createBackground()
    }
    private createBackground(): void {
        if (context2D) context2D.drawImage(this.backgroundImage, 0, 0)
    }
    // private drawCoinsAndGameHearts(): void {
    //     this.menu.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    //     this.drawCoins()
    //     // this.drawHearts()
    // }
    // private drawCoins() {
    //     this.coinsIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    //     const textOptions: T_text = {
    //         text: this.coins.toString(),
    //         position: { x: this.coinsIcon.position.x + 46, y: this.coinsIcon.position.y - 26 },
    //         color: 'white',
    //         fontSize: 20,
    //     }
    //     this.drawText(textOptions)
    // }
    // private drawHearts() {
    //     this.heartIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    //     const textOptions: T_text = {
    //         text: this.limitAttacks.toString(),
    //         position: { x: this.heartIcon.position.x, y: this.heartIcon.position.y - 26 },
    //         color: 'white',
    //         fontSize: 20,
    //     }
    //     this.drawText(textOptions)
    // }
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
    public updatePlacementTiles(): void {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(this.activeDashboardTower)
        })
    }
    public updateTowers(): void {
        this.towers.forEach((tower: Tower) => {
            tower.update({ enemies: this.currentEnemiesData, shootingAudio: this.shootingAudio })
        })
    }
    public updateEnemies(): void {
        if (this._currentEnemiesData.length <= 0) {
            if (this.currentRoundIndex < this.rounds.length - 1) {
                this.currentRoundIndex++
                this.spawingCurrentRoundEnemies()
            }
        }
        for (let i = this._currentEnemiesData.length - 1; i >= 0; i--) {
            const currentEnemy: Enemy = this._currentEnemiesData[i]
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
            //enemy reached gate postion then start hit it
            if (currentEnemy.position.x >= GATE_POSITION_X) {
                currentEnemy.behaviorKey = E_behaviors.ATTACK
                currentEnemy.updateEnemyAttackGate({ gate: this.gate })
                continue
            }
            currentEnemy.update(this.waypoints)
        }
        this.updateDeathEffectEnemies()
    }
    private updateDeathEffectEnemies() {
        for (let i = this.deathEffectEnemies.length - 1; i >= 0; i--) {
            const currentDeathEffectEnemy: Enemy = this.deathEffectEnemies[i]
            currentDeathEffectEnemy.updateDeathEffect()
            const currentDeathEffectEnemyFrame = this.deathEffectEnemies[i].currentFrame
            if (!currentDeathEffectEnemyFrame) {
                this.deathEffectEnemies.splice(i, 1)
                continue
            }
            const isFinishedOneTimeAnimation: boolean =
                currentDeathEffectEnemy.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
                currentDeathEffectEnemy.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1
            if (isFinishedOneTimeAnimation) {
                this.deathEffectEnemies.splice(i, 1)
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
    public addTower(): void {
        if (!this.mouseOverTile) return
        if (!this.activeDashboardTower) return
        const towerBaseProperties: T_baseTowerProperties = getBaseTowerProperties(this.activeDashboardTower.towerType)

        if (this.coins < towerBaseProperties.prices) return
        this.coins -= towerBaseProperties.prices
        const towerOptions: T_tower = {
            name: towerBaseProperties.name,
            projectileType: towerBaseProperties.projectileInfo[E_behaviors.ATTACK].projectileType,
            towerType: towerBaseProperties.towerType,
            position: this.mouseOverTile?.position,
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
        this.towers.sort((a, b) => a.position.y - b.position.y)
        this.mouseOverTile.isOccupied = true
        this.activeDashboardTower = null
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
                const dashboardEnemyBorderOptions: T_dashboardBorder = {
                    name: baseEnemyProperty.dashboardBorderInfo.name,
                    position: { x: 64 * index, y: 64 },
                    initFrames: baseEnemyProperty.dashboardBorderInfo.initFrames,
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
    public checkMouseOverTile({ mouse }: { mouse: T_position }): void {
        this._mouseOverTile = this.placementTiles.find((tile) => tile.hasCollisionWithMouse(mouse)) ?? null
    }
    public checkMouseOverDashboardTower({ mouse }: { mouse: T_position }) {
        this.mouseOverDashboardTower =
            this.dashboardTowers.find((dashboardTowerInfo) =>
                dashboardTowerInfo.dashboardTower.hasCollisionWithMouse(mouse)
            )?.dashboardTower ?? null
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
