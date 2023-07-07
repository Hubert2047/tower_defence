import { position } from '../../types/index'
import Enemy from '../Enemies/index'
import Projectile from './index.js'
export default class BloodMoonProjectile extends Projectile {
    constructor({
        position = { x: 0, y: 0 },
        offset = { x: -60, y: 30 },
        width = 50,
        height = 50,
        frameMaxX = 1,
        frameMaxY = 1,
        projectileSources,
        damage,
        moveSpeed,
        enemy,
    }: {
        position: position
        offset?: position
        width?: number
        height?: number
        projectileSources: HTMLImageElement[]
        frameMaxX?: number
        frameMaxY?: number
        moveSpeed?: number
        damage: number
        enemy: Enemy
    }) {
        super({
            position,
            offset,
            width,
            height,
            projectileSources,
            frameMaxX,
            frameMaxY,
            moveSpeed,
            damage,
            enemy,
        })
    }
}
