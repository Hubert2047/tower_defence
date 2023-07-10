"use strict";
// import { E_enemy } from '../../enum/index.js'
// import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js'
// import { T_enemiesDefaultProperty, T_frame, T_position, T_enemy } from '../../types/index.js'
// import defaultProperty from '../enemies/enemies.default.property.js'
// import Enemy from './index.js'
// export default class Bear extends Enemy {
//     constructor({ position = { x: 0, y: 0 }, moveSpeed = 1, health = 5000, coins = 1 }: T_enemy) {
//         const sources = [
//             '../../public/src/assets/images/enemies/Bear/top_0.png',
//             '../../public/src/assets/images/enemies/Bear/left_290.png',
//             '../../public/src/assets/images/enemies/Bear/right_90.png',
//             '../../public/src/assets/images/enemies/Bear/bottom_180.png',
//         ]
//         const imageSources: HTMLImageElement[] = createImageSources(sources)
//         const property: T_enemiesDefaultProperty = deepClone(defaultProperty.get(E_enemy.BEAR))
//         const { enemyType, offset, maxX, maxY, width, height } = property
//         const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
//         const frame: T_frame = { maxX, maxY, holdTime }
//         super({ enemyType, position, width, height, offset, imageSources, frame, moveSpeed, health, coins })
//     }
// }
