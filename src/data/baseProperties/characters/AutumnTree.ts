import {
    E_angels,
    E_behaviors,
    E_characterRoles,
    E_characters,
    E_gems,
    E_level,
    E_towerAttackProperties,
} from '../../../enum/index.js'
import { I_characterProperties } from '../../../types/interface.js'
const AutumnTreeProperties: I_characterProperties = {
    type: E_characters.AUTUMN_TREE,
    width: 85,
    height: 110,
    role: E_characterRoles.PLANTED,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/trees/autumn_tree.png',
                maxX: 3,
                maxY: 1,
                holdTime: 60,
            },
        },
    },
    dataLv: {
        [E_towerAttackProperties.ATTACK_DAMAGE]: {
            [E_level.LV1]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV3]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV4]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV5]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV6]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV7]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV8]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV9]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
            },
            [E_level.LV10]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1000,
                textDiscription: '+1000 Attack Damage',
                isMaxLevel: true,
            },
        },
        [E_towerAttackProperties.ATTACK_RANGE]: {
            [E_level.LV1]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV3]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV4]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV5]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV6]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV7]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV8]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV9]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV10]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
            },
            [E_level.LV11]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 20,
                textDiscription: '+20 Attack Range',
                isMaxLevel: true,
            },
        },
        [E_towerAttackProperties.ATTACK_MULTI]: {
            [E_level.LV1]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV3]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV4]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV5]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV6]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV7]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV8]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV9]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV10]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
            },
            [E_level.LV11]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                textDiscription: '+1 Attack Multi',
                isMaxLevel: true,
            },
        },
        [E_towerAttackProperties.ATTACK_SPEED]: {
            [E_level.LV1]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV3]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV4]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV5]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV6]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV7]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV8]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV9]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV10]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
            },
            [E_level.LV11]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                textDiscription: '+10 Attack Speed',
                isMaxLevel: true,
            },
        },
    },
}
export default AutumnTreeProperties
