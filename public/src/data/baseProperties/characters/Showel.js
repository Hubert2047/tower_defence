import { E_angels, E_behaviors, E_characters } from '../../../enum/index.js';
const ShovelProperties = {
    type: E_characters.SHOWVEL,
    width: 64,
    height: 64,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/stuff/shovel.png',
                maxX: 1,
                maxY: 1,
                holdTime: 10000,
            },
        },
    },
};
export default ShovelProperties;
