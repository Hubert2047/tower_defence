import Enemy from '../classes/enemy/index.js'
import { E_angels, E_behaviors, E_enemy, E_explosion, E_gate, E_projectile, E_tower } from '../enum/index.js'

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
    coins: number
}
type T_round = {
    roundName: string
    enemies: T_enemyInfo[]
}
type T_gameMapData = {
    rounds: T_round[]
    placementTiles2D: number[][]
    backgroundImage: HTMLImageElement
    startCoins: number
    waypoints: T_position[]
    initDashboardTowerInfo: T_initDashboardTowerInfo[]
    gateInfor: T_gateInfo
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
    towerType: E_tower
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
    attackTargetNums?: number
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
type T_initDashboardTowerInfo = {
    name: string
    towerType: E_tower
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
export {
    T_baseEnemyProperties,
    T_baseGateProperties,
    T_dashboardBorder,
    T_enemy,
    T_enemyInfo,
    T_explosion,
    T_frame,
    T_gameMapData,
    T_gate,
    T_gateInfo,
    T_initDashboardTowerInfo,
    T_initFrame,
    T_initFramesDictionary,
    T_position,
    T_projectile,
    T_projectileInfo,
    T_round,
    T_sprite,
    T_thunderProjectile,
    T_tower,
}
