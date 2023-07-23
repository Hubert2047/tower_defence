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
                    imageSourceString: '../../public/src/assets/images/levelUp/tower_level_up_menu.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        }
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({ position, frames, width: 12 * TILE_SIZE, height: 7 * TILE_SIZE, opacity: 0.99 })
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.levelUpIcons = {
            [E_towerAttackProperties.ATTACK_DAMAGE]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 5 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
                name: 'attack damage',
            }),
            [E_towerAttackProperties.ATTACK_SPEED]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 4 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
                name: 'attack speed',
            }),
            [E_towerAttackProperties.ATTACK_RANGE]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 3 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
                name: 'attack range',
            }),
            [E_towerAttackProperties.ATTACK_MULTI]: new LevelUpIcon({
                position: { x: this.position.x + 10 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: 0, y: -12 },
                height: 48,
                width: 48,
                name: 'attack multi',
            }),
        }
        this.gemConditionIcons = {
            [E_gems.BLUE]: new Gem({
                position: { x: this.position.x + 6 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: -12, y: 70 },
                gemType: E_gems.BLUE,
                width: 36,
                height: 36,
                gemNum: 0,
                isDisplayGemNum: false,
            }),
            [E_gems.RED]: new Gem({
                position: { x: this.position.x + 7.2 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: -12, y: 70 },
                gemType: E_gems.RED,
                gemNum: 0,
                width: 36,
                height: 36,
                isDisplayGemNum: false,
            }),
            [E_gems.PURPLE]: new Gem({
                position: { x: this.position.x + 8.4 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: -12, y: 70 },
                gemType: E_gems.PURPLE,
                gemNum: 0,
                width: 36,
                height: 36,
                isDisplayGemNum: false,
            }),
            [E_gems.COIN]: new Gem({
                position: { x: this.position.x + 9.6 * TILE_SIZE, y: this.position.y - 2 * TILE_SIZE },
                offset: { x: -12, y: 70 },
                gemType: E_gems.COIN,
                gemNum: 0,
                width: 36,
                height: 36,
                isDisplayGemNum: false,
            }),
        }
    }
    update(activeLevelUpTower: Tower, gemsInfo: T_gemsInfo, mousePosition: T_position) {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        this.drawPropertiesText(activeLevelUpTower)
        this.drawLevelUpIcon(activeLevelUpTower, gemsInfo)
        if (activeLevelUpTower.displayLevelUpTower) {
            this.updateDisplayLeveUpTower(activeLevelUpTower.displayLevelUpTower)
        }
        this.drawGemConditions(activeLevelUpTower, mousePosition, gemsInfo)
    }

    private updateDisplayLeveUpTower(tower: Tower): void {
        tower.position.x = this.position.x + 2.5 * TILE_SIZE
        tower.position.y = this.position.y - 2.5 * TILE_SIZE
        tower.draw({ behaviorKey: E_behaviors.ATTACK, angelKey: E_angels.ANGEL_0 })
        drawText({
            position: { x: this.position.x + 3 * TILE_SIZE, y: this.position.y - 1.5 * TILE_SIZE },
            text: tower.name.toString(),
            color: 'white',
            center: true,
            fontSize: 18,
            offset: { x: 0, y: -20 },
        })
        tower.levelTitleEffect.position.x = this.position.x + 2.5 * TILE_SIZE
        tower.levelTitleEffect.position.y = this.position.y - 3.5 * TILE_SIZE
        tower.levelTitleEffect.update()
    }
    private findLevelUpIconCollisionWithMouse(
        mousePosition: T_position
    ): [string, LevelUpIcon] | [undefined, undefined] {
        const towerAttackProperties = Object.keys(this.levelUpIcons)
        for (let towerAttackProperty of towerAttackProperties) {
            if (this.levelUpIcons[towerAttackProperty].hasCollision(mousePosition)) {
                return [towerAttackProperty, this.levelUpIcons[towerAttackProperty]]
            }
        }
        return [undefined, undefined]
    }
    public checkOnClickLevelUpIcon(activeLevelUpTower: Tower, mousePosition: T_position, gemsInfo: T_gemsInfo) {
        const [collistionProperty, collistionLevelUpIcon] = this.findLevelUpIconCollisionWithMouse(mousePosition)
        if (!collistionProperty || !collistionLevelUpIcon) return
        const baseTower: I_characterProperties = getBaseCharacterProperties(activeLevelUpTower.type)
        const currentPropertyLv = activeLevelUpTower.data[collistionProperty].currentLv
        if (baseTower.dataLv[collistionProperty][currentPropertyLv]?.isMaxLevel) return
        const nextLvCondition: T_conditionLevelUp =
            baseTower.dataLv[collistionProperty][currentPropertyLv + 1].condition
        const hasFulfillCondition = nextLvCondition.every((condition) => {
            return condition.value <= gemsInfo[condition.type].value
        })
        if (!hasFulfillCondition) return
        const addLevelOption = {
            property: collistionProperty,
            value: baseTower.dataLv[collistionProperty][currentPropertyLv + 1].addValue,
        }
        activeLevelUpTower.upPropertyLelvel(addLevelOption)
        nextLvCondition.forEach((condition) => {
            gemsInfo[condition.type].value -= condition.value
        })
    }
    public drawGemConditions(activeLevelUpTower: Tower, mousePosition: T_position, gemsInfo: T_gemsInfo) {
        const [collistionProperty, collistionLevelUpIcon] = this.findLevelUpIconCollisionWithMouse(mousePosition)
        if (!collistionProperty || !collistionLevelUpIcon) return
        const baseTower = getBaseCharacterProperties(activeLevelUpTower.type)
        const currentPropertyLv = activeLevelUpTower.data[collistionProperty].currentLv
        if (baseTower.dataLv[collistionProperty][currentPropertyLv]?.isMaxLevel) return
        const nextLvCondition: T_conditionLevelUp =
            baseTower.dataLv[collistionProperty][currentPropertyLv + 1].condition
        const gemKeys = Object.keys(this.gemConditionIcons)
        for (let gemKey of gemKeys) {
            const currentConditionGem = nextLvCondition.find((condition) => condition.type === gemKey)
            if (currentConditionGem) {
                let opacity = 1
                if (currentConditionGem.value > gemsInfo[gemKey].value) {
                    opacity = 0.2
                }
                this.gemConditionIcons[gemKey].opacity = opacity
                this.gemConditionIcons[gemKey].update()
                const textPosition = {
                    x: this.gemConditionIcons[gemKey].position.x + TILE_SIZE - 12,
                    y: this.gemConditionIcons[gemKey].position.y + this.gemConditionIcons[gemKey].height / 2 + 38,
                }
                this.drawConditionText(currentConditionGem.value.toString(), textPosition, opacity)
            }
        }
        const textLevelPostion = {
            x: this.position.x + 6 * TILE_SIZE,
            y: this.position.y - 2 * TILE_SIZE,
        }
        const textString = `Level ${(
            activeLevelUpTower.data[collistionProperty].currentLv + 1
        ).toString()} :  ${baseTower.dataLv[collistionProperty][currentPropertyLv + 1].textDiscription.toString()}`
        this.drawLevel(textString, textLevelPostion, {
            x: 12,
            y: 22,
        })
    }
    private drawLevel(text: string, position: T_position, offset: T_position) {
        drawText({ text, position, color: 'green', fontSize: 14, offset })
    }
    private drawConditionText(text: string, position: T_position, opacity: number) {
        drawText({ text, position, color: 'white', fontSize: 16, offset: { x: 0, y: 0 }, opacity })
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
        const startPosition = { x: this.position.x + 9.5 * TILE_SIZE, y: this.position.y - 5.5 * TILE_SIZE }
        const displayData = [
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_DAMAGE],
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_SPEED],
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_RANGE],
            activeLevelUpTower.data[E_towerAttackProperties.ATTACK_MULTI],
        ]
        displayData.forEach((data, index) => {
            drawText({
                position: { x: startPosition.x, y: startPosition.y + index * TILE_SIZE },
                text: data.value.toString(),
                color: 'white',
                center: true,
                fontSize: 18,
                offset: { x: -5, y: 6 },
            })
            if (data.currentLv !== 0) {
                drawText({
                    position: { x: startPosition.x - 3 * TILE_SIZE, y: startPosition.y + index * TILE_SIZE },
                    text: `+${data.currentLv.toString()}`,
                    color: 'green',
                    center: true,
                    fontSize: 16,
                    offset: { x: 30, y: -10 },
                })
            }
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
