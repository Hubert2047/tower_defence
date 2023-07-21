import { T_position } from 'src/types/index'
import Sprite from '../../classes/sprite/index.js'
import getBaseCharacterProperties from '../../data/baseProperties/characters/index.js'
import { E_angels, E_behaviors, E_characterRoles, E_characters } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_dashboardCharacters, T_frame } from '../../types/index.js'
import { I_characterProperties } from '../../types/interface'
export default class DashboardCharacter extends Sprite {
    public dashboardShadow: DashboardCharacter | undefined
    private baseCharacterProperties: I_characterProperties
    private angelKey: E_angels
    private behaviorKey: E_behaviors
    public type: E_characters
    public role: E_characterRoles
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
        this.baseCharacterProperties = baseCharacterProperties
        if (!isDashboardShadow) {
            this.dashboardShadow = this.createDashboardShadow({
                type,
                position: { x: position.x, y: position.y },
            })
        }
        this.type = type
        this.angelKey = angelKey
        this.behaviorKey = behaviorKey
        this.role = this.getCharacterRole(type)
    }
    createDashboardShadow({ type, position }: T_dashboardCharacters): DashboardCharacter {
        const characterOptions: T_dashboardCharacters & { isDashboardShadow: boolean } = {
            type,
            position,
            offset: { x: this.baseCharacterProperties.width / 2, y: this.baseCharacterProperties.height / 2 },
            width: this.baseCharacterProperties.width,
            height: this.baseCharacterProperties.height,
            isDashboardShadow: true,
            opacity: 0.8,
        }
        return new DashboardCharacter(characterOptions)
    }
    update({ isDisplayDashboardShadow, mouse }: { isDisplayDashboardShadow: boolean; mouse: T_position }): void {
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
        if (isDisplayDashboardShadow && this.dashboardShadow) {
            this.dashboardShadow.position.x = mouse.x
            this.dashboardShadow.position.y = mouse.y - this.dashboardShadow.offset.y / 2
            this.dashboardShadow.update({ isDisplayDashboardShadow: false, mouse })
        }
    }
    public hasCollision(mouse: T_position): boolean {
        return (
            this.position.x + this.offset.x <= mouse.x &&
            mouse.x <= this.position.x + this.width - this.offset.x &&
            this.position.y - this.height + this.offset.y <= mouse.y &&
            mouse.y <= this.position.y + this.height - 3 * this.offset.y
        )
    }
    private getCharacterRole(type: E_characters): E_characterRoles {
        switch (type) {
            case E_characters.AUTUMN_TREE:
                return E_characterRoles.PLANTED
            case E_characters.GREEN_TREE:
                return E_characterRoles.PLANTED
            case E_characters.MONSTERRA_TREE:
                return E_characterRoles.PLANTED
            case E_characters.BLOOD_MOON:
                return E_characterRoles.TOWER
            case E_characters.OBELISK_THUNDER:
                return E_characterRoles.TOWER
            case E_characters.FLYING_OBELISK:
                return E_characterRoles.TOWER
            case E_characters.SHOVEL:
                return E_characterRoles.DESTROY
            default:
                return E_characterRoles.PLANTED
        }
    }
}
