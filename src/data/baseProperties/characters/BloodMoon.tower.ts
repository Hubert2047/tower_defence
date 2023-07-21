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
const BloodMoonProperties: I_characterProperties = {
    type: E_characters.BLOOD_MOON,
    width: 90,
    height: 128,
    role: E_characterRoles.TOWER,
    initFrames: {
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_22]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_67]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_112]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_157]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_202]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_247]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_292]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_337]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
        },
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_22]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_67]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_112]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_157]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_202]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_247]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_292]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_337]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 3,
            },
        },
    },
    dataLv: {
        [E_towerAttackProperties.ATTACK_DAMAGE]: {
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 100,
                isMaxLevel: true,
            },
        },
        [E_towerAttackProperties.ATTACK_RANGE]: {
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 10,
                isMaxLevel: true,
            },
        },
        [E_towerAttackProperties.ATTACK_MULTI]: {
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 200 },
                    { type: E_gems.RED, value: 150 },
                    { type: E_gems.PURPLE, value: 100 },
                    { type: E_gems.COIN, value: 50 },
                ],
                addValue: 1,
                isMaxLevel: true,
            },
        },
        [E_towerAttackProperties.ATTACK_SPEED]: {
            [E_level.LV2]: {
                condition: [
                    { type: E_gems.BLUE, value: 20 },
                    { type: E_gems.RED, value: 10 },
                    { type: E_gems.PURPLE, value: 5 },
                    { type: E_gems.COIN, value: 0 },
                ],
                addValue: 1,
                isMaxLevel: true,
            },
        },
    },
}
export default BloodMoonProperties
