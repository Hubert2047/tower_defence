import { T_position } from 'src/types/index'
import Sprite from '../../classes/sprite/index.js'
import getBaseCharacterProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characterActions, E_characters } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_dashboardCharacters, T_frame } from '../../types/index.js'
import { I_characterProperties } from '../../types/interface'
export default class DashboardCharacter extends Sprite {
    public dashboardShadow: DashboardCharacter | undefined
    private baseCharacterProperties: I_characterProperties
    private angelKey: E_angels
    private behaviorKey: E_behaviors
    public type: E_characters
    public action: E_characterActions
    constructor({
        type,
        position,
        offset,
        width,
        height,
        angelKey = E_angels.ANGEL_0,
        behaviorKey = E_behaviors.IDLE,
        isDashboardShadow,
        opacity = 1,
    }: T_dashboardCharacters & { isDashboardShadow?: boolean }) {
        const baseCharacterProperties = getBaseCharacterProperties(type)
        const frames: Map<string, Map<string, T_frame>> = createFrames({
            initFrames: baseCharacterProperties.initFrames,
        })
        super({
            position,
            offset,
            width,
            height,
            frames,
            opacity,
        })
        if (!isDashboardShadow) {
            this.dashboardShadow = this.createDashboardShadow({
                type,
                position,
            })
        }
        this.type = type
        this.baseCharacterProperties = baseCharacterProperties
        this.angelKey = angelKey
        this.behaviorKey = behaviorKey
        this.action = this.getCharacterAction(type)
    }
    createDashboardShadow({ type, position }: T_dashboardCharacters): DashboardCharacter {
        const baseCharacterProperties = getBaseCharacterProperties(type)
        const characterOptions: T_dashboardCharacters & { isDashboardShadow: boolean } = {
            type,
            position,
            offset: { x: baseCharacterProperties.width / 2, y: baseCharacterProperties.height / 2 },
            width: baseCharacterProperties.width,
            height: baseCharacterProperties.height,
            isDashboardShadow: true,
            opacity: 0.8,
        }
        return new DashboardCharacter(characterOptions)
    }
    update(): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public hasCollision(mouse: T_position): boolean {
        return (
            this.position.x + this.offset.x <= mouse.x &&
            mouse.x <= this.position.x + this.width - this.offset.x &&
            this.position.y - this.height + this.offset.y <= mouse.y &&
            mouse.y <= this.position.y + this.height - 3 * this.offset.y
        )
    }
    private getCharacterAction(type: E_characters): E_characterActions {
        switch (type) {
            case E_characters.AUTUMN_TREE:
                return E_characterActions.PLANTED
            case E_characters.GREEN_TREE:
                return E_characterActions.PLANTED
            case E_characters.MONSTERRA_TREE:
                return E_characterActions.PLANTED
            case E_characters.BLOOD_MOON:
                return E_characterActions.ATTACK
            case E_characters.OBELISK_THUNDER:
                return E_characterActions.ATTACK
            case E_characters.FLYING_OBELISK:
                return E_characterActions.ATTACK
            case E_characters.SHOVEL:
                return E_characterActions.DESTROY
            default:
                return E_characterActions.PLANTED
        }
    }
}
