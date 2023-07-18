import { E_angels, E_behaviors, E_characterRoles, E_characters } from '../../../enum/index.js'
import { I_characterProperties } from '../../../types/interface.js'
const MonsterraTreeProperties: I_characterProperties = {
    type: E_characters.GREEN_TREE,
    width: 90,
    height: 100,
    role: E_characterRoles.PLANTED,
    initFrames: {
        [E_behaviors.IDLE]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/trees/monsterra.png',
                maxX: 6,
                maxY: 4,
                holdTime: 50,
            },
        },
    },
}
export default MonsterraTreeProperties
