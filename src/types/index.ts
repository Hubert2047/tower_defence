import Enemy from '../classes/enemies/index.js'
import { E_enemy, E_explosion, E_projectile, E_tower } from '../enum/index.js'
type T_position = {
    x: number
    y: number
}
type T_frame = {
    maxX: number
    maxY: number
    holdTime: number
}
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
    limitAttacks: number
}

type T_enemy = {
    name: string
    enemyType: E_enemy
    position: T_position
    imageSourceString: string[]
    frame: T_frame
    offset?: T_position
    width?: number
    height?: number
    moveSpeed?: number
    health?: number
    coins?: number
}
type T_dashboardEnemyBorder = {
    name: string
    position: T_position
    imageSourceString: string[]
    frame: T_frame
    offset?: T_position
    width?: number
    height?: number
}
type T_baseEnemyProperties = {
    name: string
    enemyType: E_enemy
    width: number
    height: number
    maxX: number
    maxY: number
    offset: T_position
    baseHealth: number
    baseMoveSpeed: number
    baseCoins: number
    imageSourceString: string[]
    dashboardBorderInfo: T_dashboardEnemyBorder
}
type T_tower = {
    name: string
    towerType: E_tower
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    frame: T_frame
    imageSourceString: string[]
    attackSpeed?: number
    attackArea?: number
    damage?: number
    projectileType: E_projectile
}
type T_explosion = {
    name: string
    explosionType: E_explosion
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    imageSourceString: string[]
    frame: T_frame
}
type T_projectileInfo = {
    name: string
    projectileType: E_projectile
    imageSourceString: string[]
    frame: T_frame
    width: number
    height: number
    offset?: T_position
    explosionInfo: T_explosion
}
type T_projectile = {
    name: string
    ProjectileType: E_projectile
    position: T_position
    imageSourceString: string[]
    enemy: Enemy
    offset?: T_position
    width?: number
    height?: number
    frame: T_frame
    moveSpeed?: number
    damage?: number
}
type T_baseTowerProperties = {
    name: string
    towerType: E_tower
    offset: T_position
    width: number
    height: number
    prices: number
    imageSourceString: string[]
    frame: T_frame
    attackSpeed: number
    attackArea: number
    damage: number
    projectileInfo: T_projectileInfo
}
type T_Sprite = {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    imageSources: HTMLImageElement[]
    frame: T_frame
}
export {
    T_baseEnemyProperties,
    T_baseTowerProperties,
    T_dashboardEnemyBorder,
    T_enemy,
    T_enemyInfo,
    T_explosion,
    T_frame,
    T_gameMapData,
    T_position,
    T_projectile,
    T_projectileInfo,
    T_round,
    T_tower,
    T_Sprite,
}
