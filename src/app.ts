import GameMap from './classes/gameMaps/index.js'
import BloodMoon from './classes/towers/BloodMoon.tower.js'
import { resetCanvas } from './context2D/index.js'
import { E_gameMap, E_towerType } from './enum/index.js'
import { getGameMapData } from './helper/index.js'
import { T_position } from './types/index.js'
main()
function main() {
    newGame()
}
function newGame() {
    const gameMapType: E_gameMap = E_gameMap.DESERT
    const currentMapData = getGameMapData(gameMapType)
    const mouse: T_position = { x: 0, y: 0 }
    if (currentMapData) {
        const currentMap = new GameMap(currentMapData)
        handleAddEventGame({ gameMap: currentMap, mouse })
        startGame({ gameMap: currentMap, mouse })
    }
    resetHTML()
}
function startGame({ gameMap, mouse }: { gameMap: GameMap; mouse: T_position }): void {
    resetCanvas({ backgroundImage: gameMap.backgoundImage })
    const [isGameOver, isVictory] = gameMap.updateMap(mouse)
    if (isGameOver) {
        handleFinishedGame({ text: 'Game Over' })
        return
    }
    if (isVictory) {
        handleFinishedGame({ text: 'Victory' })
        return
    }
    requestAnimationFrame(() => {
        startGame({ gameMap, mouse })
    })
}
function handleAddEventGame({ gameMap, mouse }: { gameMap: GameMap; mouse: T_position }) {
    const canvas = document.querySelector('canvas')
    const startGameBtn = document.querySelector('.start-game-btn')
    if (canvas) {
        canvas.addEventListener('mousemove', handleEventMousemove)
        canvas.addEventListener('click', handleEventClick)
    }
    if (startGameBtn) {
        startGameBtn.addEventListener('click', newGame)
    }
    function handleEventClick() {
        const isCoinsEnough = gameMap.coins >= BloodMoon.prices
        if (!isCoinsEnough) return
        if (gameMap.activeTile && !gameMap.activeTile.isOccupied) {
            gameMap.activeTile.isOccupied = true
            gameMap.addTower({ towerType: E_towerType.BLOOD_MOON })
        }
    }
    function handleEventMousemove(event: MouseEvent) {
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        gameMap.checkActiveTile({ mouse })
    }
}

function handleFinishedGame({ text }: { text: string }) {
    const gameInfoContainer = document.querySelector('.game-info-container')
    const gameSatus = document.querySelector('.game-status')
    const textStatus = document.querySelector('.text-status')
    if (gameSatus && gameInfoContainer && textStatus) {
        gameInfoContainer.classList.add('game-finished')
        gameSatus.classList.add('display')
        textStatus.textContent = text
    }
}
function resetHTML() {
    const gameInfoContainer = document.querySelector('.game-info-container')
    const gameSatus = document.querySelector('.game-status')
    const textStatus = document.querySelector('.text-status')
    if (gameSatus && gameInfoContainer && textStatus) {
        gameInfoContainer.classList.remove('game-finished')
        gameSatus.classList.remove('display')
    }
}
