import { E_angels, E_behaviors } from '../../enum/index.js'
import { createFrames, drawText } from '../../helper/index.js'
import { T_frame, T_initFramesDictionary, T_position, T_sprite } from '../../types/index.js'
import Sprite from '../sprite/index.js'
import Tower from '../tower/index.js'
type T_towerLevelUp = {
    position: T_position
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
export default class TowerLevelUp extends Sprite {
    behaviorKey: E_behaviors
    angelKey: E_angels
    col: number
    row: number
    levelUpIcon: Sprite
    constructor({ position, angelKey = E_angels.ANGEL_0, behaviorKey = E_behaviors.IDLE }: T_towerLevelUp) {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/levelup/tower_level_up_menu.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const col = 12
        const row = 8
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width: 64 * col, height: 64 * row, opacity: 0.99 })
        this.col = col
        this.row = row
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.levelUpIcon = this.createLeveUpIcon()
    }
    update(activeLevelUpTower: Tower) {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.drawPropertiesText(activeLevelUpTower)
        this.levelUpIcon.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        if (activeLevelUpTower.displayLevelUpTower) {
            this.updateDisplayLeveUpTower(activeLevelUpTower.displayLevelUpTower)
        }
    }
    private updateDisplayLeveUpTower(tower: Tower): void {
        const startPosition = { x: this.position.x + 64 * 2 + 32, y: this.position.y - 3 * 64 - 32 }
        tower.position.x = startPosition.x
        tower.position.y = startPosition.y
        tower.draw({ behaviorKey: E_behaviors.ATTACK, angelKey: E_angels.ANGEL_0 })
        drawText({
            position: { x: this.position.x + 64 * 3, y: startPosition.y + 64 },
            text: tower.name.toString(),
            color: 'white',
            center: true,
            fontSize: 18,
            offset: { x: 0, y: -20 },
        })
    }
    private createLeveUpIcon() {
        const initFrames: T_initFramesDictionary = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/level-up.png',
                    maxX: 5,
                    maxY: 3,
                    holdTime: 4,
                },
            },
        }
        const frames = createFrames({ initFrames })
        const options: T_sprite = {
            frames,
            position: { x: this.position.x + 64 * 10, y: this.position.y - 6 * 64 },
            offset: { x: 0, y: -12 },
            height: 48,
            width: 48,
        }
        return new Sprite(options)
    }
    private drawPropertiesText(activeLevelUpTower: Tower) {
        const startPosition = { x: this.position.x + 64 * 9 + 32, y: this.position.y - 6 * 64 - 32 }
        const displayData = [
            activeLevelUpTower.data.damage,
            activeLevelUpTower.data.attackSpeed,
            activeLevelUpTower.data.attackRange,
            activeLevelUpTower.data.multipleTarget,
        ]
        displayData.forEach((data, index) => {
            drawText({
                position: { x: startPosition.x, y: startPosition.y + index * 64 },
                text: data.toString(),
                color: 'white',
                center: true,
                fontSize: 18,
                offset: { x: -5, y: 6 },
            })
        })
    }
    public hasCollision(position: T_position): boolean {
        return (
            this.position.x + this.offset.x <= position.x &&
            position.x <= this.position.x + this.width - this.offset.x &&
            this.position.y >= position.y - this.offset.y &&
            position.y >= this.position.y - this.height + this.offset.y
        )
    }
    private hasCollistionWithCloseBtn(position: T_position) {
        const closePosition = { x: this.position.x + this.width - 64, y: this.position.y - this.height }
        return (
            closePosition.x <= position.x &&
            position.x <= closePosition.x + 64 &&
            closePosition.y <= position.y &&
            closePosition.y + 64 >= position.y
        )
    }
    public isClose(position: T_position) {
        return !this.hasCollision(position) || this.hasCollistionWithCloseBtn(position)
    }
}
