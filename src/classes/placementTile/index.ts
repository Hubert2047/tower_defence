import { TILE_SIZE } from '../../constants/index.js'
import { E_angels, E_behaviors, E_characterRoles } from '../../enum/index.js'
import { createFrames } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index.js'
import DashboardCharacter from '../dashboardCharacters/index.js'
import Sprite from '../sprite/index.js'
type T_placement = {
    position: T_position
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    offset?: T_position
}
export default class PlacementTile extends Sprite {
    public position: T_position
    behaviorKey: E_behaviors
    angelKey: E_angels
    public isOccupied: boolean
    constructor({
        position = { x: 0, y: 0 },
        behaviorKey = E_behaviors.IDLE,
        offset = { x: 0, y: 64 },
        angelKey = E_angels.ANGEL_0,
    }: T_placement) {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../../public/src/assets/images/stuff/placement-tile.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 300000,
                },
            },
        }
        const frames: Map<string, Map<string, T_frame>> = createFrames({ initFrames })
        super({
            position,
            frames,
            width: 64,
            height: 64,
            opacity: 1,
            offset,
        })
        this.position = position
        this.behaviorKey = behaviorKey
        this.angelKey = angelKey
        this.isOccupied = false
    }
    public update(activeDashboardCharacter: DashboardCharacter | null, mouse: T_position): void {
        const isDestroyAction = activeDashboardCharacter?.role === E_characterRoles.DESTROY
        const isDestroy = isDestroyAction
        if (isDestroy && !this.isOccupied) return
        if (!activeDashboardCharacter && !this.isOccupied) return
        if (this.hasCollision(mouse) && activeDashboardCharacter && !this.isOccupied) {
            this.opacity = 1
        } else {
            this.opacity = 0.4
        }
        this.draw({ behaviorKey: this.behaviorKey, angelKey: this.angelKey })
    }
    public hasCollision(position: T_position): boolean {
        return (
            this.position.x <= position.x &&
            position.x <= this.position.x + TILE_SIZE &&
            this.position.y <= position.y &&
            position.y <= this.position.y + TILE_SIZE
        )
    }
}
