"use strict";
// import { E_enemy } from '../../enum/index.js'
// import { calculateHoldTime, createImageSources, deepClone } from '../../helper/index.js'
// import { T_enemy, T_frame } from '../../types/index'
// import { T_enemiesDefaultProperty } from '../../types/index.js'
// import defaultProperty from '../enemies/enemies.default.property.js'
// import Enemy from './index.js'
// export default class BroodMother extends Enemy {
//     constructor({ position = { x: 0, y: 0 }, moveSpeed = 1, health = 3000, coins = 2 }: T_enemy) {
//         const sources = [
//             '../../public/src/assets/images/enemies/Broodmother/top_0.png',
//             '../../public/src/assets/images/enemies/Broodmother/left_290.png',
//             '../../public/src/assets/images/enemies/Broodmother/right_90.png',
//             '../../public/src/assets/images/enemies/Broodmother/bottom_180.png',
//         ]
//         const imageSources: HTMLImageElement[] = createImageSources(sources)
//         const property: T_enemiesDefaultProperty = deepClone(defaultProperty.get(E_enemy.BROOD_MOTHER))
//         const { enemyType, offset, maxX, maxY, width, height } = property
//         const holdTime = calculateHoldTime({ maxX, maxY, moveSpeed })
//         const frame: T_frame = { maxX, maxY, holdTime }
//         super({ enemyType, position, width, height, offset, imageSources, frame, moveSpeed, health, coins })
//     }
// }
