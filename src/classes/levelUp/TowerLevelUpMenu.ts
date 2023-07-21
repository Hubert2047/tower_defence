import { TILE_SIZE } from '../../constants/index.js'
import getBaseCharacterProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_gems, E_towerAttackProperties } from '../../enum/index.js'
import { createFrames, drawText } from '../../helper/index.js'
import { T_conditionLevelUp, T_frame, T_gemsInfo, T_initFramesDictionary, T_position } from '../../types/index.js'
import { I_characterProperties } from '../../types/interface.js'
import Gem from '../gems/index.js'
import LevelUpIcon from '../levelUpIcon/index.js'
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
    levelUpIcons: Record<string, LevelUpIcon>
    gemConditionIcons: Record<string, Gem>
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
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width: 12 * TILE_SIZE, height: 8 * TILE_SIZE, opacity: 0.99 })
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.levelUpIcons = {
            [E_towerAttackProperties.ATTACK_DAMAGE]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 6 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
            }),
            [E_towerAttackProperties.ATTACK_SPEED]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 5 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
            }),
            [E_towerAttackProperties.ATTACK_RANGE]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 4 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
            }),
            [E_towerAttackProperties.ATTACK_MULTI]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 3 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
            }),
        }
        this.gemConditionIcons = {
            [E_gems.BLUE]: new Gem({
                position: { x: this.position.x + 2 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                gemType: E_gems.BLUE,
                gemNum: 0,
                isDisplayGemNum: false,
            }),
            [E_gems.RED]: new Gem({
                position: { x: this.position.x + 4 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                gemType: E_gems.RED,
                gemNum: 0,
                isDisplayGemNum: false,
            }),
            [E_gems.PURPLE]: new Gem({
                position: { x: this.position.x + 6 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                gemType: E_gems.PURPLE,
                gemNum: 0,
                isDisplayGemNum: false,
            }),
            [E_gems.COIN]: new Gem({
                position: { x: this.position.x + 8 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                gemType: E_gems.COIN,
                gemNum: 0,
                isDisplayGemNum: false,
            }),
        }
    }
    update(activeLevelUpTower: Tower, gemsInfo: T_gemsInfo) {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.drawPropertiesText(activeLevelUpTower)
        this.drawLevelUpIcon(activeLevelUpTower, gemsInfo)
        if (activeLevelUpTower.displayLevelUpTower) {
            this.updateDisplayLeveUpTower(activeLevelUpTower.displayLevelUpTower)
        }
    }
    private updateDisplayLeveUpTower(tower: Tower): void {
        tower.position.x = this.position.x + 2.5 * TILE_SIZE
        tower.position.y = this.position.y - 3.5 * TILE_SIZE
        tower.draw({ behaviorKey: E_behaviors.ATTACK, angelKey: E_angels.ANGEL_0 })
        drawText({
            position: { x: this.position.x + 3 * TILE_SIZE, y: this.position.y - 2.5 * TILE_SIZE },
            text: tower.name.toString(),
            color: 'white',
            center: true,
            fontSize: 18,
            offset: { x: 0, y: -20 },
        })
    }
    public drawGemConditions(activeLevelUpTower: Tower, mousePosition: T_position) {
        const towerAttackProperties = Object.keys(this.levelUpIcons)
        for (let towerAttackProperty of towerAttackProperties) {
            if (this.levelUpIcons[towerAttackProperty].hasCollision(mousePosition)) {
                const baseTower = getBaseCharacterProperties(activeLevelUpTower.type)
                const currentAttackPropertyLv = activeLevelUpTower.data[towerAttackProperty].currentLv
                const nextLvCondition: T_conditionLevelUp =
                    baseTower.dataLv[towerAttackProperty][currentAttackPropertyLv + 1].condition
                const gemKeys = Object.keys(this.gemConditionIcons)
                for (let gemKey of gemKeys) {
                    const currentConditionGem = nextLvCondition.find((condition) => condition.type === gemKey)
                    if (currentConditionGem) {
                        this.gemConditionIcons[gemKey].update()
                        const textPosition = {
                            x: this.gemConditionIcons[gemKey].position.x + TILE_SIZE,
                            y: this.gemConditionIcons[gemKey].position.y,
                        }
                        this.drawConditionText(currentConditionGem.value.toString(), textPosition)
                    }
                }
            }
            break
        }
    }
    private drawConditionText(text: string, position: T_position) {
        drawText({ text, position, color: 'white', fontSize: 18, offset: { x: 0, y: 0 } })
    }
    private drawLevelUpIcon(activeLevelUpTower: Tower, gemsInfo: T_gemsInfo) {
        const towerAttackProperties: string[] = Object.keys(this.levelUpIcons) //E_towerAttackProperties
        const baseTower: I_characterProperties = getBaseCharacterProperties(activeLevelUpTower.type)
        for (let towerAttackProperty of towerAttackProperties) {
            const currentAttackPropertyLv = activeLevelUpTower.data[towerAttackProperty].currentLv
            if (baseTower.dataLv[towerAttackProperty][currentAttackPropertyLv]?.isMaxLevel) {
                this.levelUpIcons[towerAttackProperty].opacity = 0.4
                this.levelUpIcons[towerAttackProperty].behaviorKey = E_behaviors.IDLE
                this.levelUpIcons[towerAttackProperty].update()
                continue
            }
            const nextLvCondition: T_conditionLevelUp =
                baseTower.dataLv[towerAttackProperty][currentAttackPropertyLv + 1].condition
            const hasFulfillCondition = nextLvCondition.every((condition) => {
                return condition.value <= gemsInfo[condition.type].value
            })
            if (hasFulfillCondition) {
                this.levelUpIcons[towerAttackProperty].behaviorKey = E_behaviors.RUN
                this.levelUpIcons[towerAttackProperty].opacity = 1
            } else {
                this.levelUpIcons[towerAttackProperty].opacity = 0.4
                this.levelUpIcons[towerAttackProperty].behaviorKey = E_behaviors.IDLE
            }
            this.levelUpIcons[towerAttackProperty].update()
        }
    }
    private drawPropertiesText(activeLevelUpTower: Tower) {
        const startPosition = { x: this.position.x + 9.5 * TILE_SIZE, y: this.position.y - 6.5 * TILE_SIZE }
        const displayData = [
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_DAMAGE].value,
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_SPEED].value,
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_RANGE].value,
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_MULTI].value,
        ]
        displayData.forEach((data, index) => {
            drawText({
                position: { x: startPosition.x, y: startPosition.y + index * TILE_SIZE },
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
        const closePosition = { x: this.position.x + this.width - TILE_SIZE, y: this.position.y - this.height }
        return (
            closePosition.x <= position.x &&
            position.x <= closePosition.x + TILE_SIZE &&
            closePosition.y <= position.y &&
            closePosition.y + TILE_SIZE >= position.y
        )
    }
    public isClose(position: T_position) {
        return !this.hasCollision(position) || this.hasCollistionWithCloseBtn(position)
    }
}
