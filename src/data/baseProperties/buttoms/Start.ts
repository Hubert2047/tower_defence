import { E_angels, E_behaviors, E_buttons } from '../../../enum/index.js'
import { I_Button } from '../../../types/interface.js'
const startBtn: I_Button = {
    type: E_buttons.START,
    width: 128,
    height: 64,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString:
                    '../../../public/src/assets/images/buttons/start/start.png',
                maxX: 1,
                maxY: 1,
                holdTime: 6000,
            },
        },
        [E_behaviors.HOVER]: {
            [E_angels.ANGEL_0]: {
                imageSourceString:
                    '../../../public/src/assets/images/buttons/start/hover_start.png',
                maxX: 1,
                maxY: 1,
                holdTime: 6000,
            },
        },
    },
}
export default startBtn
