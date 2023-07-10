"use strict";
// import { E_tower } from '../../enum/index.js'
// import { createImageSources, deepClone } from '../../helper/index.js'
// import { T_frame, T_position, T_towersDefaultPropety } from '../../types/index'
// import defaultProperty from '../towers/towers.default.propety.js'
// import Tower from './index.js'
// export default class BloodMoon extends Tower {
//     constructor({
//         position = { x: 0, y: 0 },
//         width = 100,
//         height = 180,
//     }: {
//         position: T_position
//         width?: number
//         height?: number
//     }) {
//         const sources = ['../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png']
//         const imageSources: HTMLImageElement[] = createImageSources(sources)
//         const property: T_towersDefaultPropety = deepClone(defaultProperty.get(E_tower.BLOOD_MOON))
//         const { offset, maxX, maxY, attackSpeed, damage, projectileType, holdTime, attackArea } = property
//         const frame: T_frame = { maxX, maxY, holdTime }
//         super({
//             position,
//             offset,
//             width,
//             height,
//             frame,
//             imageSources,
//             projectileType,
//             attackSpeed,
//             damage,
//             attackArea,
//         })
//     }
//     static prices = 10
// }
