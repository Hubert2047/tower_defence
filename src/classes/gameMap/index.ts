import Shovel from '../../classes/stuff/Shovel.js'
import BloodMoon from '../../classes/tower/BloodMoon.js'
import FlyingObelisk from '../../classes/tower/FlyingObelisk.js'
import ObeliskThunder from '../../classes/tower/ObeliskThunder.js'
import {
    BLUE_GEM_POSITION,
    COIN_POSITION,
    PURPLE_GEM_POSITION,
    RED_GEM_POSITION,
    TILE_SIZE,
} from '../../constants/index.js'
import context2D, { canvas, resetCanvas } from '../../context2D/index.js'
import getBaseEnemyProperties from '../../data/baseProperties/enemies/index.js'
import gatesBaseProperties from '../../data/baseProperties/gates/index.js'
import { E_angels, E_behaviors, E_characterRoles, E_characters, E_enemy, E_gate, E_gems } from '../../enum/index.js'
import { createFrames, drawText, formatNumberToK, randomNumberInRange } from '../../helper/index.js'
import {
    T_activeCharacterDestroyInfo,
    T_baseEnemyProperties,
    T_dashboardBorder,
    T_dashboardCharacters,
    T_enemy,
    T_enemyInfo,
    T_gameMapData,
    T_gate,
    T_gateInfo,
    T_gemsInfo,
    T_gemStartInfo,
    T_initDashboardCharacterInfo,
    T_initFramesDictionary,
    T_position,
    T_round,
    T_sprite,
    T_text,
} from '../../types/index.js'
import { I_character } from '../../types/interface.js'
import Border from '../dashboardBorder/index.js'
import DashboardCharacter from '../dashboardCharacters/index.js'
import Enemy from '../enemy/index.js'
import Gate from '../gate/index.js'
import Gem from '../gems/index.js'
import TowerLevelUpMenu from '../levelUp/TowerLevelUpMenu.js'
import PlacementTile from '../placementTile/index.js'
import AutumnTree from '../plant/AutumnTree.js'
import GreenTree from '../plant/GreenTree.js'
import Plant from '../plant/index.js'
import MonsterraTree from '../plant/MonsterraTree.js'
import Sprite from '../sprite/index.js'
import Galata from '../tower/Galata.js'
import Tower from '../tower/index.js'
interface I_dashboardEnemiesInfo {
    enemyType: E_enemy
    dashboardEnemy: Enemy
    dashboardEnemyBorder: Border
    remainEnemiesTotal: number
}
interface I_dashboardCharactersInfo {
    dashboardCharacter: DashboardCharacter
    border: Border
    type: E_characters
}

type T_baseIncreasedStrengthEnemies = {
    health: number
    damage: number
    moveSpeed: number
    attackSpeed: number
}
export default class GameMap {
    private _currentEnemiesData: Enemy[]
    private rounds: T_round[]
    private placementTiles: PlacementTile[]
    public backgroundImage: HTMLImageElement
    private towers: Tower[]
    private plants: Plant[]
    private waypoints: T_position[]
    public gemsInfo: T_gemsInfo
    public shootingAudio: HTMLElement | HTMLAudioElement | null
    private _mouseOverTile: PlacementTile | null
    public mouseOverDashboardCharacter: DashboardCharacter | null
    public activeDashboardCharacter: DashboardCharacter | null
    public dashboardCharacters: I_dashboardCharactersInfo[]
    private menu: Sprite
    private displayRound: Sprite
    private gateInfor: T_gateInfo
    private gate: Gate
    private activeMouseOverCharacterInfo: T_activeCharacterDestroyInfo | null
    private currentDashboardEnemiesInfo: I_dashboardEnemiesInfo[]
    private currentRound: number
    private baseIncreasedStrengthEnemies: T_baseIncreasedStrengthEnemies
    private mousePosition: T_position
    private towerLevelUpMenu: TowerLevelUpMenu
    private activeLevelUpTower: Tower | undefined
    constructor({
        rounds,
        placementTiles2D,
        waypoints,
        backgroundImage,
        startGems,
        initDashboardCharacterInfo,
        gateInfor,
    }: T_gameMapData) {
        this._currentEnemiesData = []
        this.rounds = rounds
        this.waypoints = waypoints
        this.backgroundImage = backgroundImage
        this.placementTiles = this.getPlacementTiles(placementTiles2D)
        this.shootingAudio = document.getElementById('shooting')
        this.towers = []
        this.plants = []
        this.gemsInfo = this.createGemInfo(startGems)
        this.currentDashboardEnemiesInfo = []
        this.menu = this.createMenu()
        this.towerLevelUpMenu = new TowerLevelUpMenu({ position: { x: 64 * 5, y: 64 * 9 } })
        this.displayRound = this.createDisplayRound()
        this._mouseOverTile = null
        this.mouseOverDashboardCharacter = null
        this.activeDashboardCharacter = null
        this.gateInfor = gateInfor
        this.activeMouseOverCharacterInfo = null
        this.dashboardCharacters = this.createDashboardCharacters(initDashboardCharacterInfo)
        this.gate = this.createGate()
        this.currentRound = 1
        this.baseIncreasedStrengthEnemies = {
            health: 500,
            damage: 100,
            moveSpeed: 0.5,
            attackSpeed: 0.5,
        }
        this.mousePosition = { x: 0, y: 0 }
        this.activeLevelUpTower = undefined
        this.spawingCurrentRoundEnemies()
        this.handleAddEventGame()
    }
    //get set place
    public get mouseOverTile(): PlacementTile | null {
        return this._mouseOverTile
    }
    private get allCharacters() {
        return [...this.towers, ...this.plants]
    }
    public get currentEnemiesData() {
        return this._currentEnemiesData
    }
    public get isDestroyStatus(): boolean {
        return this.activeDashboardCharacter !== null && this.activeDashboardCharacter.role === E_characterRoles.DESTROY
    }
    private get isThereObjectToDestroy(): boolean {
        return this.towers.length > 0 || this.plants.length > 0
    }
    //update and draw function place
    public updateMap(): [boolean, boolean] {
        this.updateScreenGame()
        this.updatePlacementTiles()
        this.updateAllCharacters()
        this.updateEnemies()
        this.updateDashboardEnemies()
        this.updateDashboardCharacters()
        this.drawGemsAndMenu()
        this.updateGate()
        if (this.activeLevelUpTower) {
            this.towerLevelUpMenu.update(this.activeLevelUpTower, this.gemsInfo, this.mousePosition)
        }
        return this.getGameStatus()
    }
    private updateAllCharacters(): void {
        const allCharacters: I_character[] = [...this.plants, ...this.towers]
        this.towers = []
        this.plants = []
        allCharacters.sort((a, b) => b.position.y - a.position.y)
        for (let i = allCharacters.length - 1; i >= 0; i--) {
            const currentCharacter = allCharacters[i]
            if (currentCharacter.placementTile === undefined) continue //delete currentCharacter
            if (currentCharacter.isAlreadyDestroyed) {
                currentCharacter.placementTile.isOccupied = false //delete currentCharacter
                continue
            }
            if (currentCharacter instanceof Tower) {
                this.updateTower(currentCharacter)
                this.towers.push(currentCharacter)
            }
            if (currentCharacter instanceof Plant) {
                this.updatePlant(currentCharacter)
                this.plants.push(currentCharacter)
            }
        }
    }
    private updateTower(tower: Tower): void {
        const isDisplayAttackRangeCircleAndLevelUp =
            this.activeMouseOverCharacterInfo?.activeMouseOverCharacter === tower &&
            this.activeDashboardCharacter === null &&
            this.activeLevelUpTower === undefined
        tower.update({
            enemies: this.currentEnemiesData,
            shootingAudio: this.shootingAudio,
            isDisplayAttackRangeCircleAndLevelUp,
        })
    }
    private updatePlant(plant: Plant): void {
        const isDisplayLevelUp =
            this.activeMouseOverCharacterInfo?.activeMouseOverCharacter === plant &&
            this.activeDashboardCharacter === null
        const gem = plant.update(isDisplayLevelUp)
        if (gem) {
            this.gemsInfo[gem.type].value += gem.value
        }
    }
    private updateGate() {
        if (this.gate) {
            this.gate.update({ enemies: this.currentEnemiesData })
        }
    }
    private updateDashboardCharacters(): void {
        this.dashboardCharacters.map((dashboardCharacterInfo: I_dashboardCharactersInfo) => {
            const gemsToBuildCharacter = this.gemsToBuildCharacter(dashboardCharacterInfo.type)
            let opacity = 1
            const isThereNoObjectToDestroy =
                dashboardCharacterInfo.dashboardCharacter.role === E_characterRoles.DESTROY &&
                !this.isThereObjectToDestroy
            if (!this.hasEnoughGems(dashboardCharacterInfo.type) || isThereNoObjectToDestroy) {
                opacity = 0.4
            }
            this.updateDashboardCharacterBorder(dashboardCharacterInfo, opacity)
            this.updateDashboardCharacter(dashboardCharacterInfo, opacity)
            if (gemsToBuildCharacter !== undefined) {
                const text = gemsToBuildCharacter.toString()
                this.updateDashboardCharacterPricesText(dashboardCharacterInfo, text)
            }
        })
    }
    private updateDashboardCharacterBorder(dashboardCharacterInfo: I_dashboardCharactersInfo, opacity: number) {
        dashboardCharacterInfo.border.opacity = opacity
        if (dashboardCharacterInfo.dashboardCharacter === this.activeDashboardCharacter) {
            dashboardCharacterInfo.border.updateSelected()
        } else {
            dashboardCharacterInfo.border.update()
        }
    }
    private updateDashboardCharacterPricesText(dashboardCharacterInfo: I_dashboardCharactersInfo, text: string) {
        if (!context2D) return
        const textWidth = context2D.measureText(text).width
        const textOptions: T_text = {
            text: text,
            position: {
                x: dashboardCharacterInfo.border.position.x + dashboardCharacterInfo.border.width / 2 - textWidth / 2,
                y: dashboardCharacterInfo.border.position.y - dashboardCharacterInfo.border.height,
            },
            color: '#250806',
            fontSize: 20,
        }
        drawText(textOptions)
    }
    private updateDashboardCharacter(dashboardCharacterInfo: I_dashboardCharactersInfo, opacity: number) {
        dashboardCharacterInfo.dashboardCharacter.opacity = opacity
        const isDisplayDashboardShadow =
            this.activeDashboardCharacter !== null &&
            this.mouseOverDashboardCharacter === null &&
            this.activeDashboardCharacter === dashboardCharacterInfo.dashboardCharacter
        dashboardCharacterInfo.dashboardCharacter.update({ isDisplayDashboardShadow, mouse: this.mousePosition })
    }
    private updateScreenGame(): void {
        resetCanvas()
        this.createBackground()
    }
    private updateDashboardEnemies(): void {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemyInfor, index) => {
            dashboardEnemyInfor.dashboardEnemyBorder.update()
            dashboardEnemyInfor.dashboardEnemy.draw({ behaviorKey: E_behaviors.RUN, angelKey: E_angels.ANGEL_90 })
            const textString = dashboardEnemyInfor.remainEnemiesTotal.toString()
            const textWidth = context2D?.measureText(textString).width ?? 2
            const textOptions: T_text = {
                text: textString,
                position: {
                    x:
                        dashboardEnemyInfor.dashboardEnemyBorder.position.x +
                        dashboardEnemyInfor.dashboardEnemyBorder.width / 2 -
                        textWidth / 2,
                    y: dashboardEnemyInfor.dashboardEnemyBorder.position.y - 5,
                },
                color: '#8B4513',
                fontSize: 20,
            }
            drawText(textOptions)
        })
    }
    private updatePlacementTiles(): void {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(this.activeDashboardCharacter, this.mousePosition)
        })
    }

    private updateEnemies(): void {
        if (this._currentEnemiesData.length <= 0) {
            this.currentRound++
            this.spawingCurrentRoundEnemies()
        }
        for (let i = this._currentEnemiesData.length - 1; i >= 0; i--) {
            const currentEnemy: Enemy = this._currentEnemiesData[i]
            currentEnemy.update(this.waypoints, this.gate)
            if (currentEnemy.isAlreadyDead) {
                this._currentEnemiesData.splice(i, 1)
                this.subtractDashboardEnemies(currentEnemy)
                if (currentEnemy.gem !== null) {
                    this.gemsInfo[currentEnemy.gem.type].value += currentEnemy.gem.value
                }
            }
        }
    }
    private drawGemsAndMenu(): void {
        this.menu.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        this.drawGems()
        this.drawDisplayRound()
    }
    private drawDisplayRound() {
        this.displayRound.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
        const textString = `Round  ${this.currentRound.toString()}`
        const textWidth = context2D?.measureText(textString).width ?? 10

        drawText({
            text: textString,
            color: 'white',
            fontSize: 14,
            position: {
                x: this.displayRound.position.x + this.displayRound.width / 2 - textWidth / 3,
                y: this.displayRound.position.y - this.displayRound.height / 2 + 4,
            },
        })
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
            attackSpeed: this.gateInfor.attackSpeed,
            attackRange: this.gateInfor.attackRange,
            damage: this.gateInfor.damage,
            health: this.gateInfor.health,
        }
        return new Gate(gateOptions)
    }
    private createDashboardCharacters(
        initDashboardCharacterInfo: T_initDashboardCharacterInfo[]
    ): I_dashboardCharactersInfo[] {
        const dashboardCharacters: I_dashboardCharactersInfo[] = []
        initDashboardCharacterInfo.forEach((dashboardCharacter) => {
            const characterOptions: T_dashboardCharacters = {
                type: dashboardCharacter.type,
                position: dashboardCharacter.position,
                offset: dashboardCharacter.offset,
                width: dashboardCharacter.width,
                height: dashboardCharacter.height,
            }
            const borderOptions: T_dashboardBorder = {
                name: dashboardCharacter.dashboardBorderInfo.name,
                position: dashboardCharacter.dashboardBorderInfo.position,
                initFrames: dashboardCharacter.dashboardBorderInfo.initFrames,
                offset: dashboardCharacter.dashboardBorderInfo.offset,
                width: dashboardCharacter.dashboardBorderInfo.width,
                height: dashboardCharacter.dashboardBorderInfo.height,
            }
            const newDashboardCharacter: DashboardCharacter = new DashboardCharacter(characterOptions)

            const newBorder: Border = new Border(borderOptions)
            dashboardCharacters.push({
                dashboardCharacter: newDashboardCharacter,
                border: newBorder,
                type: dashboardCharacter.type,
            })
        })
        return dashboardCharacters
    }
    private createGemInfo(gems: T_gemStartInfo): T_gemsInfo {
        const coinIcon = new Gem({
            position: COIN_POSITION,
            gemType: E_gems.COIN,
            isDisplayGemNum: false,
            gemNum: 0,
        })
        const blueGemIcon = new Gem({
            position: BLUE_GEM_POSITION,
            gemType: E_gems.BLUE,
            isDisplayGemNum: false,
            gemNum: 0,
        })
        const redGemIcon = new Gem({
            position: RED_GEM_POSITION,
            gemType: E_gems.RED,
            isDisplayGemNum: false,
            gemNum: 0,
        })
        const yellowGemIcon = new Gem({
            position: PURPLE_GEM_POSITION,
            gemType: E_gems.PURPLE,
            isDisplayGemNum: false,
            gemNum: 0,
        })

        return {
            [E_gems.BLUE]: { value: gems.blueGems, icon: blueGemIcon },
            [E_gems.RED]: { value: gems.redGems, icon: redGemIcon },
            [E_gems.PURPLE]: { value: gems.yellowGems, icon: yellowGemIcon },
            [E_gems.COIN]: { value: gems.coins, icon: coinIcon },
        }
    }
    private drawGems() {
        const keys = Object.keys(this.gemsInfo)
        keys.forEach((key) => {
            this.gemsInfo[key].icon.update()
            const textString = formatNumberToK(this.gemsInfo[key].value)
            const textOptions: T_text = {
                text: textString,
                position: {
                    x: this.gemsInfo[key].icon.position.x + 50,
                    y: this.gemsInfo[key].icon.position.y - 18,
                },
                color: 'white',
                fontSize: 20,
            }
            drawText(textOptions)
        })
    }
    //create function place
    private createMenu() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
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
            position: { x: 64 * 14, y: 64 * 1 },
            offset: { x: 45, y: 26 },
            height: 120,
            width: 430,
        }
        return new Sprite(options)
    }
    private createDisplayRound() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/display-round.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }

        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: 64 * 9, y: 64 * 1 },
            offset: { x: 0, y: 0 },
            height: 64,
            width: 128,
        }
        return new Sprite(options)
    }
    private getGameStatus(): [boolean, boolean] {
        const isGameOver = this.gate.remainHealth === 0
        // const isVictory = this._currentEnemiesData.length <= 0 && this.currentRoundIndex >= this.rounds.length - 1
        // return [isGameOver, isVictory]
        return [isGameOver, false]
    }
    private createBackground(): void {
        if (context2D) context2D.drawImage(this.backgroundImage, 0, 0)
    }
    private shuffleArray(array: T_enemyInfo[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
    }
    private spawingCurrentRoundEnemies(): void {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = []
        }
        this.currentDashboardEnemiesInfo = []
        const currentRound: T_round = this.rounds[0]
        this.shuffleArray(currentRound.enemies)
        currentRound.enemies.slice(0, 8).forEach((enemyInfo: T_enemyInfo, index: number) => {
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
                const minEnemies = 1 + this.currentRound > 15 ? 15 : 1 + this.currentRound
                const maxEnemies = this.currentRound * 1 + 10 > 30 ? 30 : this.currentRound * 1 + 10
                const enemies = parseInt(randomNumberInRange(minEnemies, maxEnemies).toString())
                const dashboardEnemyBorder = new Border(dashboardEnemyBorderOptions)
                this.currentDashboardEnemiesInfo.push({
                    enemyType: enemyInfo.enemyType,
                    dashboardEnemy,
                    dashboardEnemyBorder,
                    remainEnemiesTotal: enemies,
                })
                //create battle enemies
                for (let i = 0; i < enemies; i++) {
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
            moveSpeed: enemyInfo.moveSpeed + this.baseIncreasedStrengthEnemies.moveSpeed * this.currentRound,
            attackSpeed: enemyInfo.attackSpeed + this.baseIncreasedStrengthEnemies.attackSpeed * this.currentRound,
            damage: enemyInfo.damage + this.baseIncreasedStrengthEnemies.damage * this.currentRound,
            coins: enemyInfo.coins,
            health: enemyInfo.health + this.baseIncreasedStrengthEnemies.health * this.currentRound,
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
    public handleCharacterRoleBehavior(): void {
        if (!this.activeDashboardCharacter) return
        const isDestroyRole = this.activeDashboardCharacter.role === E_characterRoles.DESTROY
        if (!this.mouseOverTile || (!isDestroyRole && this.mouseOverTile.isOccupied)) return
        const gemsToBuildCharacter = this.gemsToBuildCharacter(this.activeDashboardCharacter.type)
        if (gemsToBuildCharacter === undefined || this.gemsInfo[E_gems.BLUE].value < gemsToBuildCharacter) return
        const options = {
            position: this.mouseOverTile.position,
            placementTile: this.mouseOverTile,
        }
        let isSuccess = true
        switch (this.activeDashboardCharacter.role) {
            case E_characterRoles.TOWER:
                isSuccess = this.handleBuildTowers({ options, type: this.activeDashboardCharacter.type })
                break
            case E_characterRoles.PLANTED:
                isSuccess = this.handleBuildPlants({ options, type: this.activeDashboardCharacter.type })
                break
            case E_characterRoles.DESTROY:
                isSuccess = this.handleDestroyStuff()
                break
        }
        if (isSuccess) {
            this.gemsInfo[E_gems.BLUE].value -= gemsToBuildCharacter
            this.mouseOverTile.isOccupied = true
        }
        if (!this.activeDashboardCharacter || !this.hasEnoughGems(this.activeDashboardCharacter.type)) {
            this.activeDashboardCharacter = null
            if (canvas) canvas.style.cursor = 'pointer'
        }
    }
    private handleBuildTowers({
        options,
        type,
    }: {
        options: { position: T_position; placementTile: PlacementTile }
        type: E_characters
    }): boolean {
        let isSuccess: boolean = true
        switch (type) {
            case E_characters.BLOOD_MOON:
                this.towers.push(new BloodMoon(options))
                break
            case E_characters.FLYING_OBELISK:
                this.towers.push(new FlyingObelisk(options))
                break
            case E_characters.OBELISK_THUNDER:
                this.towers.push(new ObeliskThunder(options))
                break
            case E_characters.GALATA:
                this.towers.push(new Galata(options))
                break
            default:
                isSuccess = false
                break
        }
        return isSuccess
    }
    private handleBuildPlants({
        options,
        type,
    }: {
        options: { position: T_position; placementTile: PlacementTile }
        type: E_characters
    }): boolean {
        let isSuccess: boolean = true
        switch (type) {
            case E_characters.GREEN_TREE:
                this.plants.push(new GreenTree(options))
                break
            case E_characters.MONSTERRA_TREE:
                this.plants.push(new MonsterraTree(options))
                break
            case E_characters.AUTUMN_TREE:
                this.plants.push(new AutumnTree(options))
                break
            default:
                isSuccess = false
                break
        }
        return isSuccess
    }
    private handleDestroyStuff(): boolean {
        if (!this.activeMouseOverCharacterInfo) return false
        for (let i = this.allCharacters.length - 1; i >= 0; i--) {
            let currentCharacter: I_character = this.allCharacters[i]
            if (currentCharacter === this.activeMouseOverCharacterInfo.activeMouseOverCharacter) {
                currentCharacter.beingDestroyed = true
            }
        }
        return true
    }
    //check to do something function place
    public checkHavestGems() {
        this.plants.forEach((plant: Plant) => {
            for (let i = plant.gems.length - 1; i >= 0; i--) {
                const currentGem = plant.gems[i]
                if (currentGem.hasCollision(this.mousePosition)) {
                    currentGem.haveharvestGems = true
                }
            }
        })
    }
    private checkMouseOverTile(): void {
        if (!this.activeDashboardCharacter?.dashboardShadow) {
            this._mouseOverTile = null
            return
        }
        this._mouseOverTile = this.placementTiles.find((tile) => tile.hasCollision(this.mousePosition)) ?? null
    }
    private checkToHandleBuildCharacter(): void {
        //click ouside can plant character and select character in dashboard
        const isDestroyRole = this.mouseOverDashboardCharacter?.role === E_characterRoles.DESTROY

        if (
            !this.mouseOverTile &&
            !this.mouseOverDashboardCharacter &&
            !isDestroyRole &&
            !this.activeMouseOverCharacterInfo
        ) {
            this.activeDashboardCharacter = null
            if (canvas) canvas.style.cursor = 'pointer'
            return
        }
        //click destroy shovel
        if (isDestroyRole && !this.isThereObjectToDestroy) return
        //click into dashboard character
        if (
            this.hasEnoughGems(this.mouseOverDashboardCharacter?.type) &&
            this.activeDashboardCharacter !== this.mouseOverDashboardCharacter
        ) {
            this.activeDashboardCharacter = this.mouseOverDashboardCharacter
            if (canvas) canvas.style.cursor = 'grab'
            return
        }
        //just click outside and not destroying something
        if (
            !this.mouseOverTile &&
            this.activeDashboardCharacter &&
            !isDestroyRole &&
            !this.activeMouseOverCharacterInfo
        ) {
            this.activeDashboardCharacter = null
            if (canvas) canvas.style.cursor = 'pointer'
            return
        }
        //already selected character then we build character
        if (this.mouseOverTile && this.activeDashboardCharacter) {
            this.handleCharacterRoleBehavior()
        }
    }
    private checkMouseOverDashboardCharacters() {
        this.mouseOverDashboardCharacter =
            this.dashboardCharacters.find((dashboardCharacterInfo) =>
                dashboardCharacterInfo.dashboardCharacter.hasCollision(this.mousePosition)
            )?.dashboardCharacter ?? null
    }
    private checkMouseOverCharacter() {
        this.activeMouseOverCharacterInfo = this.handleFindMouseOverCharacterInfo(this.mousePosition)
        if (this.activeDashboardCharacter === null) return
        this.activeMouseOverCharacterInfo = this.handleFindMouseOverCharacterInfo(this.mousePosition)
    }
    //calculate function place
    private handleFindMouseOverCharacterInfo(mouse: T_position): T_activeCharacterDestroyInfo | null {
        let activeMouseOverCharacterInfo: T_activeCharacterDestroyInfo | null = null
        for (let i = 0; i < this.allCharacters.length; i++) {
            const currentCharacter = this.allCharacters[i]
            if (currentCharacter.placementTile === undefined) continue
            if (currentCharacter.placementTile.hasCollision(mouse)) {
                activeMouseOverCharacterInfo = {
                    role: currentCharacter.role,
                    activeMouseOverCharacter: currentCharacter,
                }
                if (this.activeDashboardCharacter?.role === E_characterRoles.DESTROY) {
                    currentCharacter.opacity = 0.4
                }
            } else {
                currentCharacter.opacity = 1
            }
        }
        return activeMouseOverCharacterInfo
    }
    private hasEnoughGems(type: E_characters | undefined): boolean {
        if (type === undefined) return false
        switch (type) {
            case E_characters.BLOOD_MOON:
                return BloodMoon.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.FLYING_OBELISK:
                return FlyingObelisk.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.OBELISK_THUNDER:
                return ObeliskThunder.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.GREEN_TREE:
                return GreenTree.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.MONSTERRA_TREE:
                return MonsterraTree.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.AUTUMN_TREE:
                return AutumnTree.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.GALATA:
                return Galata.prices <= this.gemsInfo[E_gems.BLUE].value
            case E_characters.SHOVEL:
                return Shovel.prices <= this.gemsInfo[E_gems.BLUE].value
            default:
                return false
        }
    }
    private gemsToBuildCharacter(type: E_characters): number | undefined {
        switch (type) {
            case E_characters.BLOOD_MOON:
                return BloodMoon.prices
            case E_characters.FLYING_OBELISK:
                return FlyingObelisk.prices
            case E_characters.OBELISK_THUNDER:
                return ObeliskThunder.prices
            case E_characters.GREEN_TREE:
                return GreenTree.prices
            case E_characters.MONSTERRA_TREE:
                return MonsterraTree.prices
            case E_characters.AUTUMN_TREE:
                return AutumnTree.prices
            case E_characters.SHOVEL:
                return Shovel.prices
            case E_characters.GALATA:
                return Galata.prices
        }
    }
    public subtractDashboardEnemies(subtractEnemy: Enemy): void {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemy) => {
            if (dashboardEnemy.enemyType === subtractEnemy.enemyType) {
                dashboardEnemy.remainEnemiesTotal--
            }
        })
    }
    private getPlacementTiles(placementTiles2D: number[][]): PlacementTile[] {
        const placementTiles: PlacementTile[] = []
        placementTiles2D.forEach((row: number[], y: number) => {
            row.forEach((symbol: number, x: number) => {
                if (symbol === 1) {
                    placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }))
                }
            })
        })
        return placementTiles
    }
    private handleCheckDisplayUpdateLevel() {
        if (this.activeLevelUpTower) {
            this.towerLevelUpMenu.checkOnClickLevelUpIcon(this.activeLevelUpTower, this.mousePosition, this.gemsInfo)
        }
        if (this.towerLevelUpMenu.isClose(this.mousePosition)) {
            this.activeLevelUpTower = undefined
        }
        if (this.activeMouseOverCharacterInfo?.activeMouseOverCharacter && this.activeDashboardCharacter === null) {
            if (this.activeMouseOverCharacterInfo.activeMouseOverCharacter instanceof Tower) {
                this.activeLevelUpTower = this.activeMouseOverCharacterInfo.activeMouseOverCharacter
            }
        }
    }
    private handleAddEventGame() {
        if (canvas) {
            canvas.addEventListener('mousemove', (event) => {
                this.mousePosition.x = event.offsetX
                this.mousePosition.y = event.offsetY
                this.checkMouseOverCharacter()
                this.checkMouseOverTile()
                this.checkMouseOverDashboardCharacters()
            })
            canvas.addEventListener('click', () => {
                this.checkHavestGems()
                this.checkToHandleBuildCharacter()
                this.handleCheckDisplayUpdateLevel()
            })
        }
    }
}
