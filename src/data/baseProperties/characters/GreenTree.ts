import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../../enum/index.js'
import { I_characterProperties } from '../../../types/interface.js'
const GreenTreeProperties: I_characterProperties = {
    type: E_characters.GREEN_TREE,
    width: 90,
    height: 100,
    action: E_characterActions.PLANTED,
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
}
export default GreenTreeProperties
