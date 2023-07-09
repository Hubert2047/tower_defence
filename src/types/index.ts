import { E_enemy, E_projectile } from '../enum/index.js'
type T_position = {
    x: number
    y: number
}
type T_enemiesDefaultProperty = {
    enemyType: E_enemy
    health: number
    coins: number
    moveSpeed: number
    maxX: number
    maxY: number
    height: number
    width: number
    offset: T_position
}
type T_towersDefaultPropety = {
    maxX: number
    maxY: number
    holdTime: number
    damage: number
    attackSpeed: number
    projectileType: E_projectile.BLOOD_MOON
    offset: T_position
    attackArea: number
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
    backgoundImage: HTMLImageElement
    startCoins: number
    waypoints: T_position[]
    limitAttacks: number
}
type T_explosionProjectileInfo = {
    offset: T_position
    imageSources: HTMLImageElement[]
    frame: T_frame
}
type T_enemy = {
    enemyType: E_enemy
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    moveSpeed?: number
    health?: number
    coins?: number
}
export {
    T_enemiesDefaultProperty,
    T_enemy,
    T_enemyInfo,
    T_explosionProjectileInfo,
    T_frame,
    T_gameMapData,
    T_position,
    T_round,
    T_towersDefaultPropety,
}
