import { POSITION_GOAL, TILE_SIZE } from '../../constants/index.js'
import { E_enemy, E_tower } from '../../enum/index.js'
import { createImageSources, randomNumberInRange } from '../../helper/index.js'
import { T_enemy, T_gameMapData, T_position, T_round } from '../../types/index.js'
import PlacementTile from '../PlacementTile.js'
import Bear from '../enemies/Bear.js'
import BroodMother from '../enemies/BroodMother.js'
import Dragon from '../enemies/Dragon.js'
import Fox from '../enemies/Fox.js'
import Siren from '../enemies/Siren.js'
import Enemy from '../enemies/index.js'
import Sprite from '../sprite/index.js'
import BloodMoon from '../towers/BloodMoon.tower.js'
import Tower from '../towers/index.js'
interface gameStatus {
    isGameOver: boolean
    isVictory: boolean
}

interface enemiesStatusInfo {
    enemyType: E_enemy
    enemy: Enemy
    remainEnemiesTotal: number
}
export default class GameMap {
    private _currentEnemiesData: Enemy[]
    private rounds: T_round[]
    private currentRoundIndex: number
    private placementTiles: PlacementTile[]
    public backgoundImage: HTMLImageElement
    private towers: Tower[]
    private waypoints: T_position[]
    private limitAttacks: number
    public coins: number
    private isGameOver: boolean
    private isVictory: boolean
    public shootingAudio: HTMLElement | HTMLAudioElement | null
    private _activeTile: PlacementTile | null
    private currentDashboardEnemiesInfo: enemiesStatusInfo[]
    constructor({ rounds, placementTiles2D, waypoints, backgoundImage, limitAttacks, startCoins }: T_gameMapData) {
        this._currentEnemiesData = []
        this.rounds = rounds
        this.waypoints = waypoints
        this.limitAttacks = limitAttacks
        this.backgoundImage = backgoundImage
        this.currentRoundIndex = 0
        this.placementTiles = this.getPlacementTiles(placementTiles2D)
        this.shootingAudio = document.getElementById('shooting')
        this.towers = []
        this.coins = startCoins
        this.currentDashboardEnemiesInfo = []
        this._activeTile = null
        this.isGameOver = false
        this.isVictory = false
        this.createCurrentRoundEnemies()
    }
    public updateMap(mouse: T_position) {
        this.updateEnemies()
        this.updatePlacementTiles(mouse)
        this.updateTowers(this.shootingAudio)
        this.updateCoins()
        this.updateMapHP()
        this.updateDashboardEnemies()

        return [this.isGameOver, this.isVictory]
    }
    public get activeTile(): PlacementTile | null {
        return this._activeTile
    }
    private updateDashboardEnemies() {
        const sourcString = ['../../public/src/assets/images/borders/1.png']
        const imageSources = createImageSources(sourcString)
        const sourcString1 = ['../../public/src/assets/images/borders/4.png']
        const imageSources1 = createImageSources(sourcString1)
        const a = new Sprite({
            position: { x: 0, y: 64 },
            offset: { x: 0, y: 0 },
            imageSources,
            width: 64,
            height: 64,
            frame: { maxX: 1, maxY: 1, holdTime: 4 },
        })
        const b = new Sprite({
            position: { x: 64 * 1, y: 64 },
            offset: { x: 0, y: 0 },
            imageSources: imageSources1,
            width: 64,
            height: 64,
            frame: { maxX: 1, maxY: 1, holdTime: 4 },
        })
        a.draw({ sourceIndex: 0 })
        b.draw({ sourceIndex: 0 })
        this.currentDashboardEnemiesInfo[0].enemy.draw({ sourceIndex: 3 })
        this.currentDashboardEnemiesInfo[1].enemy.draw({ sourceIndex: 3 })
        // dragon.draw({ sourceIndex: 2 })
    }
    public updateMapHP() {
        const coinsHtml: Element | null = document.querySelector('#hearts')
        if (coinsHtml) {
            coinsHtml.textContent = this.limitAttacks.toString()
        }
    }
    private updateCoins(): void {
        const coinsHtml: Element | null = document.querySelector('#coins')
        if (coinsHtml) {
            coinsHtml.textContent = this.coins.toString()
        }
    }
    public get currentEnemiesData() {
        return this._currentEnemiesData
    }
    public updatePlacementTiles(mouse: T_position) {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(mouse)
        })
    }
    public updateTowers(shootingAudio: HTMLElement | HTMLAudioElement | null) {
        this.towers.forEach((tower: Tower) => {
            tower.update({ enemies: this._currentEnemiesData, shootingAudio })
        })
    }
    public updateEnemies(): void {
        if (this._currentEnemiesData.length <= 0) {
            if (this.currentRoundIndex < this.rounds.length - 1) {
                this.currentRoundIndex++
                this.createCurrentRoundEnemies()
            } else {
                this.isVictory = true
            }
        }
        for (let i = this._currentEnemiesData.length - 1; i >= 0; i--) {
            const currentEnemy: Enemy = this._currentEnemiesData[i]
            if (currentEnemy.position.x > POSITION_GOAL) {
                this.limitAttacks -= 1
                this._currentEnemiesData.splice(i, 1)
                this.subtractDisplayEnemies(currentEnemy)
                if (this.limitAttacks === 0) {
                    this.isGameOver = true
                    break
                }
                continue
            }
            if (currentEnemy.remainHealth <= 0) {
                this._currentEnemiesData.splice(i, 1)
                this.subtractDisplayEnemies(currentEnemy)
                this.coins += currentEnemy.coins
                continue
            }
            currentEnemy.update(this.waypoints)
        }
    }
    public subtractDisplayEnemies(subtractEnemy: Enemy): void {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemy) => {
            if (dashboardEnemy.enemyType === subtractEnemy.enemyType) {
                dashboardEnemy.remainEnemiesTotal--
            }
        })
    }
    public addTower({ towerType }: { towerType: E_tower }): void {
        if (!this.activeTile) return
        switch (towerType) {
            case E_tower.BLOOD_MOON:
                if (this.coins < BloodMoon.prices) return
                this.towers.push(new BloodMoon({ position: this.activeTile?.position }))
                this.coins -= BloodMoon.prices
                break
            default:
                throw new Error('we dont have this tower')
        }
    }
    private createCurrentRoundEnemies(): void {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = []
        }
        this.currentDashboardEnemiesInfo = []
        const currentRound: T_round = this.rounds[this.currentRoundIndex]
        currentRound.enemies.forEach((enemyInfo, index) => {
            const enemy = {
                enemyType: enemyInfo.enemyType,
                position: { x: 64 * index, y: 64 },
                offset: { x: 18, y: 20 },
                width: 100,
                height: 100,
            }
            const dashboardEnemy = this.createEnemy(enemy)
            this.currentDashboardEnemiesInfo.push({
                enemyType: enemyInfo.enemyType,
                enemy: dashboardEnemy,
                remainEnemiesTotal: enemyInfo.amount,
            })
            for (let i = 0; i < enemyInfo.amount; i++) {
                const space = randomNumberInRange(enemyInfo.spaceMin, enemyInfo.spaceMax)
                const position = { x: enemyInfo.basePosition.x - space * i, y: enemyInfo.basePosition.y }
                const enemy = this.createEnemy({
                    position,
                    enemyType: enemyInfo.enemyType,
                    moveSpeed: enemyInfo.moveSpeed,
                    health: enemyInfo.health,
                    coins: enemyInfo.coins,
                })
                this._currentEnemiesData.push(enemy)
            }
        })
    }
    private createEnemy(enemy: T_enemy): Enemy {
        switch (enemy.enemyType) {
            case E_enemy.DRAGON:
                return new Dragon(enemy)
            case E_enemy.BEAR:
                return new Bear(enemy)
            case E_enemy.BROOD_MOTHER:
                return new BroodMother(enemy)
            case E_enemy.FOX:
                return new Fox(enemy)
            case E_enemy.SIREN:
                return new Siren(enemy)
            default:
                throw new Error('we dont have this enemy')
        }
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
