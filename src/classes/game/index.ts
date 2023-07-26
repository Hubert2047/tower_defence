import { TILE_SIZE } from '../../constants/index.js'
import context2D, { canvas, resetCanvas } from '../../context2D/index.js'
import { E_behaviors, E_buttons, E_gameMap } from '../../enum/index.js'
import { createImage, getGameMapData } from '../../helper/index.js'
import { T_position } from '../../types/index.js'
import Button from '../buttoms/index.js'
import GameMap from '../gameMap/index.js'
type T_buttons = { isDisplay: boolean; element: Button }
export default class Game {
    gameMap: GameMap | null
    backgroundImageGame: HTMLImageElement
    btns: T_buttons[]
    activeHoverBtn: Button | null
    mousePosition: T_position
    constructor() {
        this.gameMap = null
        this.backgroundImageGame = createImage('../../../public/src/assets/images/background/in_game.png')
        this.btns = this.createBtns()
        this.mousePosition = { x: 0, y: 0 }
        this.activeHoverBtn = null
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseClick = this.handleMouseClick.bind(this)
        this.handleAddEventGame()
    }
    public update() {
        resetCanvas()
        if (!this.gameMap) {
            this.createBackgroundGame()
            this.updateBtn()
        } else {
            // this.removeEvents()
            const [isGameOver, isVictory] = this.gameMap.updateMap()
            if (isGameOver) return
            if (isVictory) return
        }
    }
    private updateBtn() {
        for (let i = 0; i < this.btns.length; i++) {
            const btn = this.btns[i]
            if (!btn.isDisplay) continue
            if (btn.element === this.activeHoverBtn) {
                btn.element.behaviorKey = E_behaviors.HOVER
                if (canvas) canvas.style.cursor = 'pointer'
            } else {
                btn.element.behaviorKey = E_behaviors.IDLE
            }
            btn.element.update()
        }
    }
    private createBtns(): T_buttons[] {
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
        return [
            { isDisplay: true, element: newGameBtn },
            { isDisplay: true, element: menuBtn },
            { isDisplay: true, element: settingBtn },
        ]
    }
    private createBackgroundGame() {
        if (context2D) {
            context2D.drawImage(this.backgroundImageGame, 0, 0)
        }
    }
    private checkBtnHover() {
        this.activeHoverBtn = this.btns.find((btn) => btn.element.hasCollision(this.mousePosition))?.element ?? null
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
    // private removeEvents() {
    //     if (canvas) {
    //         canvas.removeEventListener('click', this.handleMouseClick)
    //         canvas.removeEventListener('mousemove', this.handleMouseMove)
    //     }
    // }
    private handleAddEventGame() {
        if (canvas) {
            canvas.addEventListener('mousemove', this.handleMouseMove)
            canvas.addEventListener('click', this.handleMouseClick)
        }
    }
    private handleMouseClick() {
        if (this.gameMap) return
        this.handleOnBtnClick()
    }
    private handleMouseMove(event: MouseEvent) {
        if (this.gameMap) return
        this.mousePosition.x = event.offsetX
        this.mousePosition.y = event.offsetY
        this.checkBtnHover()
    }
}
