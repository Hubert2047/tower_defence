import { E_towerType } from '../../enum/index.js'
import { createImageSources, deepClone } from '../../helper/index.js'
import { T_frame, T_position, T_towersDefaultPropety } from '../../types/index'
import defaultProperty from '../towers/towers.default.propety.js'
import Tower from './index.js'
export default class BloodMoon extends Tower {
    constructor({ position = { x: 0, y: 0 } }: { position: T_position }) {
        const sources = ['../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png']
        const imageSources: HTMLImageElement[] = createImageSources(sources)
        const property: T_towersDefaultPropety = deepClone(defaultProperty.get(E_towerType.BLOOD_MOON))
        const { offset, maxX, maxY, attackSpeed, damage, projectileType, holdTime } = property
        const frame: T_frame = { maxX, maxY, holdTime }
        super({
            position,
            offset,
            imageSources,
            frame,
            projectileType,
            attackSpeed,
            damage,
        })
    }
    static prices = 10
}
