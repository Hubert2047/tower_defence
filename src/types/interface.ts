import Enemy from '../classes/enemy/index.js'
import { E_angels, E_behaviors, E_tower } from '../enum/index.js'
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
type I_towerProperties = {
    towerType: E_tower
    initFrames: T_initFramesDictionary
    width: number
    height: number
}
export { I_explosion, I_towerProperties, I_projectile, I_tower }
