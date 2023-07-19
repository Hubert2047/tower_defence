import { E_angels, E_behaviors, E_gems } from '../../../enum/index.js'
import { I_gemProperties } from '../../../types/interface.js'
const BlueProperties: I_gemProperties = {
    type: E_gems.BLUE,
    width: 48,
    height: 48,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/gems/blue.png',
                maxX: 1,
                maxY: 1,
                holdTime: 60,
            },
        },
    },
    chestFrames: {
        [E_behaviors.DROP_CHEST]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../public/src/assets/images/stuff/chest/chest_silver.png',
                maxX: 3,
                maxY: 1,
                holdTime: 50,
            },
        },
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../public/src/assets/images/stuff/chest/chest_silver_idle.png',
                maxX: 1,
                maxY: 1,
                holdTime: 20,
            },
        },
    },
}
export default BlueProperties
