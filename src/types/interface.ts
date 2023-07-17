import Enemy from '../classes/enemy/index.js'
import PlacementTile from '../classes/placementTile/index.js'
import { E_angels, E_behaviors, E_characterActions, E_characters, E_gems } from '../enum/index.js'
import { T_initFramesDictionary, T_position } from '../types/index.js'
interface I_projectile {
    position: T_position
    enemy: Enemy
    offset: T_position
    width?: number
    height?: number
    moveSpeed?: number
    damage?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
interface I_tower {
    position: T_position
    offset?: T_position
    damage?: number
    attackSpeed?: number
    attackRange?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    opacity?: number
    placementTile: PlacementTile
}
interface I_plant {
    position: T_position
    offset?: T_position
    fruitingDuration?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    opacity?: number
    placementTile: PlacementTile
}
interface I_explosion {
    position: T_position
    offset?: T_position | undefined
    width?: number | undefined
    height?: number | undefined
    moveSpeed?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
}
interface I_characterProperties {
    type: E_characters
    initFrames: T_initFramesDictionary
    width: number
    height: number
    action: E_characterActions
}
interface I_gemProperties {
    type: E_gems
    initFrames: T_initFramesDictionary
    width: number
    height: number
}
interface I_character {
    opacity: number
    action: E_characterActions
    width: number
    height: number
    placementTile: PlacementTile
    position: T_position
    hasCollision(position: T_position): boolean
}
export { I_character, I_characterProperties, I_explosion, I_gemProperties, I_plant, I_projectile, I_tower }
