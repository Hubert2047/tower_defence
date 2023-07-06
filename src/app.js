import Enermy from './classes/enermy.js'
import { resetCanvas } from './context2D.js'
import { placementTiles2D } from './data.js'

const enermys = []
console.log(placementTiles2D)
for (let i = 1; i < 10; i++) {
    const offsetX = i * 100
    enermys.push(new Enermy({ position: { x: -10 - offsetX, y: 484 }, moveSpeed: 2 }))
}
function startGame() {
    resetCanvas()
    for (let i = 0; i < enermys.length; i++) {
        enermys[i].update()
    }
    requestAnimationFrame(startGame)
}
startGame()
