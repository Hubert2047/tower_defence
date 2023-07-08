import { E_EnemyType } from '../enum/index.js'
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
    enemyType: E_EnemyType
    position: T_position
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
export { T_enemyInfo, T_frame, T_gameMapData, T_position, T_round }
