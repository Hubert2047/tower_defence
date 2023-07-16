import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../../enum/index.js'
import { I_characterProperties } from '../../../types/interface.js'
const ShovelProperties: I_characterProperties = {
    type: E_characters.SHOVEL,
    width: 64,
    height: 64,
    action: E_characterActions.DESTROY,
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
}
export default ShovelProperties
