import { POSITION_GOAL, TILE_SIZE } from '../../constants/index.js'
import { E_EnemyType, E_TowerType } from '../../enum/index.js'
import { T_enemyInfo, T_gameMapData, T_position, T_round } from '../../types/index.js'
import PlacementTile from '../PlacementTile.js'
import Bear from '../enemies/Bear.js'
import BroodMother from '../enemies/BroodMother.js'
import Dragon from '../enemies/Dragon.js'
import Fox from '../enemies/Fox.js'
import Siren from '../enemies/Siren.js'
import Enemy from '../enemies/index.js'
import BloodMoon from '../towers/BloodMoon.tower.js'
import Tower from '../towers/index.js'
interface gameStatus {
    isGameOver: boolean
    isVictory: boolean
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
    private isGameOver: boolean
    private isVictory: boolean
    private _activeTile: PlacementTile | null
    constructor({ rounds, placementTiles2D, waypoints, backgoundImage, limitAttacks }: T_gameMapData) {
        this._currentEnemiesData = []
        this.rounds = rounds
        this.waypoints = waypoints
        this.limitAttacks = limitAttacks
        this.backgoundImage = backgoundImage
        this.currentRoundIndex = 0
        this.placementTiles = this.getPlacementTiles(placementTiles2D)
        this.towers = []
        this.isGameOver = false
        this.isVictory = false
        this._activeTile = null
        this.createCurrentRoundEnemies()
    }
    public updateMap(mouse: T_position) {
        this.updateEnemies()
        this.updatePlacementTiles(mouse)
        this.updateTowers()
        return [this.isGameOver, this.isVictory]
    }
    public get activeTile(): PlacementTile | null {
        return this._activeTile
    }
    public get currentEnemiesData() {
        return this._currentEnemiesData
    }
    public updatePlacementTiles(mouse: T_position) {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(mouse)
        })
    }
    public updateTowers() {
        this.towers.forEach((tower: Tower) => {
            tower.update({ enemies: this._currentEnemiesData })
        })
    }
    public updateEnemies() {
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
                if (this.limitAttacks === 0) {
                    this.isGameOver = true
                    break
                }
                continue
            }
            if (currentEnemy.HP <= 0) {
                this._currentEnemiesData.splice(i, 1)
                continue
            }
            currentEnemy.update(this.waypoints)
        }
    }
    public addTower({ towerType }: { towerType: E_TowerType }): void {
        if (!this.activeTile) return
        switch (towerType) {
            case E_TowerType.BLOOD_MOON:
                this.towers.push(new BloodMoon({ position: this.activeTile?.position }))
                break
            default:
                throw new Error('we dont have this tower')
        }
    }
    private createCurrentRoundEnemies(): void {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = []
        }
        const currentRound: T_round = this.rounds[this.currentRoundIndex]
        currentRound.enemies.forEach((enemyInfo) => {
            const enemy = this.createEnemy(enemyInfo)
            this._currentEnemiesData.push(enemy)
        })
    }
    private createEnemy(enemyInfo: T_enemyInfo): Enemy {
        switch (enemyInfo.enemyType) {
            case E_EnemyType.DRAGON:
                return new Dragon({ position: enemyInfo.position })
            case E_EnemyType.BEAR:
                return new Bear({ position: enemyInfo.position })
            case E_EnemyType.BROOD_MOTHER:
                return new BroodMother({ position: enemyInfo.position })
            case E_EnemyType.FOX:
                return new Fox({ position: enemyInfo.position })
            case E_EnemyType.SIREN:
                return new Siren({ position: enemyInfo.position })
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
