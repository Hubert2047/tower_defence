import { createImageSources } from '../../../helper/index.js'
import { T_explosionProjectileInfo, T_frame, T_position } from '../../../types/index'
import Enemy from '../../enemies/index'
import Projectile from '../index.js'
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
    constructor({ position = { x: 0, y: 0 }, damage = 50, moveSpeed = 5, enemy }: props) {
        const sources = ['../../public/src/assets/images/projectiles/fireBall/fire_ball.png']
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const explosionSources = ['../../public/src/assets/images/projectiles/fireBall/fire_end.png']
        const explosionImageSources: HTMLImageElement[] = createImageSources(explosionSources)
        const explosionProjectileInfo: T_explosionProjectileInfo = {
            imageSources: explosionImageSources,
            offset: { x: 0, y: 0 },
            frame: { maxX: 8, maxY: 1, holdTime: 3 },
        }
        const offset = { x: -60, y: 30 }
        const width = 80
        const height = 80
        const frame: T_frame = { maxX: 6, maxY: 5, holdTime: 10 }
        super({
            position,
            offset,
            width,
            height,
            imageSources,
            explosionProjectileInfo,
            frame,
            moveSpeed,
            damage,
            enemy,
        })
    }
}
