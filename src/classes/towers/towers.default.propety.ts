import { E_projectileType, E_towerType } from '../../enum/index.js'
const towersDefaultProperty = new Map([
    [
        E_towerType.BLOOD_MOON,
        {
            maxX: 11,
            maxY: 1,
            holdTime: 10,
            damage: 2000,
            attackSpeed: 10,
            attackArea: 300,
            projectileType: E_projectileType.BLOOD_MOON,
            offset: { x: 20, y: 70 },
        },
    ],
])
export default towersDefaultProperty
