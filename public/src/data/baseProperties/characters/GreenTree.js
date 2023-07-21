import { E_angels, E_behaviors, E_characterRoles, E_characters, E_gems, E_level, E_towerAttackProperties, } from '../../../enum/index.js';
const GreenTreeProperties = {
    type: E_characters.GREEN_TREE,
    width: 90,
    height: 100,
    role: E_characterRoles.PLANTED,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/trees/green_tree.png',
                maxX: 6,
                maxY: 4,
                holdTime: 60,
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
};
export default GreenTreeProperties;
