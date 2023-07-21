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

const HauntedTreeProperties: I_characterProperties = {
    type: E_characters.HAUNTED_TREE,
    role: E_characterRoles.TOWER,
    width: 90,
    height: 240,
    initFrames: {
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/0.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_22]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/22.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/45.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_67]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/67.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/90.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_112]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/112.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/135.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_157]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/157.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/180.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_202]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/202.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/225.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_247]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/247.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/270.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_292]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/292.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/315.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_337]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/337.png',
                maxX: 1,
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
            },
        },
    },
}
export default HauntedTreeProperties
