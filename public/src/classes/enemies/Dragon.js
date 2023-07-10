"use strict";
// import { E_enemy } from '../../enum/index.js'
// import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js'
// import { T_enemiesDefaultProperty, T_frame, T_position } from '../../types/index.js'
// import defaultProperty from '../enemies/enemies.default.property.js'
// import Enemy from './index.js'
// export default class Dragon extends Enemy {
//     constructor({
//         position,
//         moveSpeed = 2.5,
//         health = 500,
//         coins = 1,
//         width = 200,
//         height = 200,
//         offset = { x: 65, y: 50 },
//     }: {
//         position: T_position
//         moveSpeed?: number
//         health?: number
//         coins?: number
//         width?: number
//         height?: number
//         offset?: T_position
//     }) {
//         const sources = [
//             '../../public/src/assets/images/enemies/Dragon/top_0.png',
//             '../../public/src/assets/images/enemies/Dragon/left_290.png',
//             '../../public/src/assets/images/enemies/Dragon/right_90.png',
//             '../../public/src/assets/images/enemies/Dragon/bottom_180.png',
//         ]
//         const imageSources: HTMLImageElement[] = createImageSources(sources)
//         const property: T_enemiesDefaultProperty = deepClone(defaultProperty.get(E_enemy.DRAGON))
//         const { enemyType, maxX, maxY } = property
//         const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
//         const frame: T_frame = { maxX, maxY, holdTime }
//         super({ enemyType, position, width, height, offset, imageSources, frame, moveSpeed, health, coins })
//     }
// }
