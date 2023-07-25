import RequestAnimationFrame from './classes/fps/index.js'
import Game from './classes/game/index.js'
function main() {
    const game = new Game()
    const requestAnimation: RequestAnimationFrame = new RequestAnimationFrame({
        loopFunction: game.update.bind(game),
    })
    requestAnimation.start()
}
main()
