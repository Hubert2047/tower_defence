import Enemy from '../classes/enemy/index.js'
import PlacementTile from '../classes/placementTile/index.js'
import {
    E_angels,
    E_behaviors,
    E_characterRoles,
    E_characters,
    E_enemy,
    E_explosion,
    E_gate,
    E_gems,
    E_projectile,
} from '../enum/index.js'

type T_position = {
    x: number
    y: number
}
type T_initFrame = {
    imageSourceString: string
    maxX: number
    maxY: number
    holdTime: number
}
type T_frame = {
    image: HTMLImageElement
    maxX: number
    maxY: number
    holdTime: number
}
type T_initFramesDictionary = Record<string, Record<string, T_initFrame>>
type T_enemyInfo = {
    enemyType: E_enemy
    basePosition: T_position
    amount: number
    spaceMin: number
    spaceMax: number
    health: number
    moveSpeed: number
    attackSpeed: number
    coins: number
    damage: number
}
type T_round = {
    roundName: string
    enemies: T_enemyInfo[]
}
type T_gemStartInfo = { blueGems: number; redGems: number; yellowGems: number }
type T_gameMapData = {
    rounds: T_round[]
    placementTiles2D: number[][]
    backgroundImage: HTMLImageElement
    waypoints: T_position[]
    initDashboardCharacterInfo: T_initDashboardCharacterInfo[]
    gateInfor: T_gateInfo
    startGems: T_gemStartInfo
}
type T_gateInfo = { health: number; damage: number; attackRange: number; attackSpeed: number }
type T_enemy = {
    name: string
    enemyType: E_enemy
    position: T_position
    initFrames: T_initFramesDictionary
    offset?: T_position
    angelKey?: E_angels
    behaviorKey?: E_behaviors
    width?: number
    height?: number
    moveSpeed?: number
    health?: number
    coins?: number
    damage?: number
    attackRange?: number
    attackSpeed?: number
    haveCreateDeadEffect?: boolean
}
type T_dashboardBorder = {
    name: string
    position: T_position
    initFrames: T_initFramesDictionary
    offset?: T_position
    width?: number
    height?: number
    isSelectedBorder?: boolean
    opacity?: number
}
type T_baseEnemyProperties = {
    name: string
    enemyType: E_enemy
    width: number
    height: number
    offset: T_position
    baseHealth: number
    baseMoveSpeed: number
    baseCoins: number
    initFrames: T_initFramesDictionary
    dashboardBorderInfo: T_dashboardBorder
}
type T_tower = {
    name: string
    type: E_characters
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    initFrames: T_initFramesDictionary
    attackSpeed?: number
    attackRange?: number
    damage?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    projectileType?: E_projectile
    opacity?: number
    multipleTarget?: number
    placementTile: PlacementTile
}
type T_explosion = {
    name: string
    explosionType: E_explosion
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    initFrames: T_initFramesDictionary
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
type T_projectileInfo = {
    name: string
    projectileType: E_projectile
    moveSpeed?: number
    initFrames: T_initFramesDictionary
    width: number
    height: number
    offset?: T_position
    explosionInfo?: T_explosion
}
type T_projectile = {
    name: string
    projectileType: E_projectile
    position: T_position
    initFrames: T_initFramesDictionary
    enemy: Enemy
    offset?: T_position
    width?: number
    height?: number
    moveSpeed?: number
    damage?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
type T_baseGateProperties = {
    name: string
    gateType: E_gate
    offset: T_position
    width: number
    height: number
    health?: number
    initFrames: T_initFramesDictionary
    attackSpeed: number
    attackRange: number
    damage: number
    projectileInfo: Record<string, T_projectileInfo>
}
type T_sprite = {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    opacity?: number
    frames: Map<string, Map<string, T_frame>>
}
type T_gate = {
    name: string
    gateType: E_gate
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    initFrames: T_initFramesDictionary
    damage?: number
    health?: number
    attackSpeed?: number
    attackRange?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
type T_initDashboardCharacterInfo = {
    name: string
    type: E_characters
    position: T_position
    offset: T_position
    width: number
    height: number
    dashboardBorderInfo: T_dashboardBorder
}
type T_initDashboardPlantInfo = {
    name: string
    type: E_characters
    position: T_position
    offset: T_position
    width: number
    height: number
    dashboardBorderInfo: T_dashboardBorder
}
type T_thunderProjectile = {
    position: T_position
    enemy: Enemy
    offset: T_position
    width?: number
    height?: number
    moveSpeed?: number
    damage?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
type T_plant = {
    name: string
    type: E_characters
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    fruitingDuration: number
    initFrames: T_initFramesDictionary
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    opacity?: number
    spawGemType: E_gems
    spawGemPerTime: number
    placementTile: PlacementTile
}
type T_text = {
    text: string
    position: T_position
    fontSize?: number
    color?: string
}
type T_dashboardCharacters = {
    type: E_characters
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    opacity?: number
}
export {
    T_baseEnemyProperties,
    T_baseGateProperties,
    T_dashboardBorder,
    T_dashboardCharacters,
    T_enemy,
    T_enemyInfo,
    T_explosion,
    T_frame,
    T_gameMapData,
    T_gate,
    T_gateInfo,
    T_gemStartInfo,
    T_initDashboardCharacterInfo,
    T_initDashboardPlantInfo,
    T_initFrame,
    T_initFramesDictionary,
    T_plant,
    T_position,
    T_projectile,
    T_projectileInfo,
    T_round,
    T_sprite,
    T_text,
    T_thunderProjectile,
    T_tower,
}
