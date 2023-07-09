import { createImageSources } from '../../helper/index.js'
import { T_frame, T_position } from '../../types/index'
import Enemy from '../enemies/index'
import Projectile from './index.js'
interface props {
    position: T_position
    offset?: T_position
    width?: number
    height?: number
    moveSpeed?: number
    damage: number
    enemy: Enemy
}
export default class BloodMoonProjectile extends Projectile {
    constructor({ position = { x: 0, y: 0 }, damage = 50, moveSpeed = 2, enemy }: props) {
        const sources = ['../../public/src/assets/images/projectiles/fire_ball_3.png']
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const offset = { x: -60, y: 30 }
        const width = 80
        const height = 80
        const frame: T_frame = { maxX: 6, maxY: 5, holdTime: 3 }
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            frame,
            moveSpeed,
            damage,
            enemy,
        })
    }
}
