import { E_angels, E_behaviors, E_characterRoles, E_characters } from '../../../enum/index.js'
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
}
export default AutumnTreeProperties
