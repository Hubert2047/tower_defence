import { E_angels, E_behaviors, E_characters } from '../../../enum/index.js';
const GreenTreeProperties = {
    type: E_characters.GREEN_TREE,
    width: 90,
    height: 128,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/trees/green_tree.png',
                maxX: 6,
                maxY: 4,
                holdTime: 20,
            },
        },
    },
};
export default GreenTreeProperties;