import Enemy from '../classes/enemy/index.js'
import { E_angels, E_behaviors } from '../enum/index.js'
import { T_position } from '../types/index.js'
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
    width?: number
    height?: number
    damage?: number
    attackSpeed?: number
    attackRange?: number
    behaviorKey?: E_behaviors
    angelKey?: E_angels
    opacity?: number
}
export { I_projectile, I_tower }
