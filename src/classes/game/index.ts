import { TILE_SIZE } from '../../constants/index.js'
import context2D, { canvas, resetCanvas } from '../../context2D/index.js'
import { E_behaviors, E_buttons, E_gameMap } from '../../enum/index.js'
import { createImage, getGameMapData } from '../../helper/index.js'
import { T_position } from '../../types/index.js'
import Button from '../buttoms/index.js'
import GameMap from '../gameMap/index.js'
export default class Game {
    gameMap: GameMap | null
    backgroundGameImage: HTMLImageElement
    btns: Button[]
    activeHoverBtn: Button | null
    mousePosition: T_position
    constructor() {
        this.gameMap = null
        this.backgroundGameImage = createImage('../../../public/src/assets/images/background/in_game.png')
        this.btns = this.createBtns()
        this.mousePosition = { x: 0, y: 0 }
        this.activeHoverBtn = null
        this.handleAddEventGame()
    }
    public update() {
        resetCanvas()
        if (!this.gameMap) {
            this.handleNoGameMap()
            return
        }
        this.handleHasGame()
    }
    private handleNoGameMap() {
        this.createGameBackground()
        this.updateBtns()
    }
    private handleHasGame() {
        if (!this.gameMap) return
        this.removeCurrentEvents()
        const [isGameOver, isVictory] = this.gameMap.updateMap()
        if (isGameOver) return
        if (isVictory) return
    }
    private updateBtns() {
        this.btns.forEach((btn) => {
            if (btn === this.activeHoverBtn) {
                btn.behaviorKey = E_behaviors.HOVER
                if (canvas) canvas.style.cursor = 'pointer'
            } else {
                btn.behaviorKey = E_behaviors.IDLE
            }
            btn.update()
        })
    }
    private createBtns(): Button[] {
        const newGameBtn = new Button({
            position: { x: 8 * TILE_SIZE, y: 5 * TILE_SIZE },
            width: 4 * TILE_SIZE,
            height: 1 * TILE_SIZE,
            type: E_buttons.NEW_GAME,
        })
        const menuBtn = new Button({
            position: { x: 8 * TILE_SIZE, y: 6.25 * TILE_SIZE },
            width: 4 * TILE_SIZE,
            height: 1 * TILE_SIZE,
            type: E_buttons.MENU,
        })
        const settingBtn = new Button({
            position: { x: 8 * TILE_SIZE, y: 7.5 * TILE_SIZE },
            width: 4 * TILE_SIZE,
            height: 1 * TILE_SIZE,
            type: E_buttons.SETTING,
        })
        return [newGameBtn, menuBtn, settingBtn]
    }
    private createGameBackground() {
        if (context2D) {
            context2D.drawImage(this.backgroundGameImage, 0, 0)
        }
    }
    private checkBtnHover() {
        this.activeHoverBtn = this.btns.find((btn) => btn.hasCollision(this.mousePosition)) ?? null
    }
    private handleOnBtnClick() {
        if (this.activeHoverBtn) {
            switch (this.activeHoverBtn.type) {
                case E_buttons.NEW_GAME:
                    this.handleOnNewGameClick()
            }
        }
    }
    private handleOnNewGameClick() {
        const gameMapType: E_gameMap = E_gameMap.DESERT
        const currentMapData = getGameMapData(gameMapType)
        if (currentMapData) this.gameMap = new GameMap(currentMapData)
    }
    private removeCurrentEvents() {
        canvas?.removeEventListener('mousemove', this.handleMouseMove)
        canvas?.removeEventListener('click', this.handleMouseClick)
    }
    private handleAddEventGame() {
        if (canvas) {
            canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
            canvas.addEventListener('click', this.handleMouseClick.bind(this))
        }
    }
    private handleMouseClick() {
        this.handleOnBtnClick()
    }
    private handleMouseMove(event: MouseEvent) {
        this.mousePosition.x = event.offsetX
        this.mousePosition.y = event.offsetY
        this.checkBtnHover()
    }
}
