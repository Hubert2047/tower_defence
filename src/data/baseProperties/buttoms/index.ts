import { E_buttons } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { I_Button } from '../../../types/interface.js'
import Menu from './Menu.js'
import NewGame from './NewGame.js'
import Setting from './Setting.js'
import Start from './Start.js'
import SquareSetting from './SquareSetting.js'
const buttonBaseProperties: Map<E_buttons, I_Button> = new Map([
    [E_buttons.START, Start],
    [E_buttons.MENU, Menu],
    [E_buttons.SETTING, Setting],
    [E_buttons.NEW_GAME, NewGame],
    [E_buttons.SQUARE_SETTING, SquareSetting],
])
function getBaseButtonProperties(type: E_buttons): any {
    if (buttonBaseProperties.has(type))
        return deepClone(buttonBaseProperties.get(type))
    return deepClone(Start)
}
export default getBaseButtonProperties
