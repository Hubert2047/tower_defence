import { createImageSources } from '../../helper/index.js'
import { position } from '../../types/index'
import Tower from './index.js'

export default class BloodMoon extends Tower {
    constructor({ position = { x: 0, y: 0 } }: { position: position }) {
        const towerSourceString = ['../../public/src/assets/images/Tower/BloodMoon/tower_bloodmoon.png']
        const projectileSourceString = ['../../public/src/assets/images/Tower/BloodMoon/projectile_bloodmoon.png']
        const towerSources: HTMLImageElement[] = createImageSources(towerSourceString)
        const projectileSources: HTMLImageElement[] = createImageSources(projectileSourceString)
        super({
            position,
            offset: { x: 20, y: 70 },
            imageSources: towerSources,
            projectileSources,
            frameMaxX: 11,
            frameMaxY: 1,
            attackSpeed: 5,
            damage: 10000000000,
        })
    }
}
