import RequestAnimationFrame from './classes/fps/index.js'
import GameMap from './classes/gameMap/index.js'
import { E_gameMap } from './enum/index.js'
import { getGameMapData } from './helper/index.js'
import { T_gameMapData } from './types/index.js'
const fps = 60
let lastDate = Date.now()
let currentDate
main()
function main() {
    const gameMapType: E_gameMap = E_gameMap.DESERT
    const currentMapData = getGameMapData(gameMapType)
    if (currentMapData) newGame(currentMapData)
}
function newGame(currentMapData: T_gameMapData) {
    const currentMap: GameMap = new GameMap(currentMapData)
    const requestAnimation: RequestAnimationFrame = new RequestAnimationFrame({
        loopFunction: startGame,
        fps: 60,
    })
    requestAnimation.start({ gameMap: currentMap })
}
function startGame({ gameMap }: { gameMap: GameMap }): void {
    const [isGameOver, isVictory] = gameMap.updateMap()
    if (isGameOver) return
    if (isVictory) return
}
