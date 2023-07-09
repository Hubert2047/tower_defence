import { E_projectile, E_tower } from '../../enum/index.js';
const towersDefaultProperty = new Map([
    [
        E_tower.BLOOD_MOON,
        {
            maxX: 11,
            maxY: 1,
            holdTime: 10,
            damage: 500,
            attackSpeed: 10,
            attackArea: 300,
            projectileType: E_projectile.BLOOD_MOON,
            offset: { x: 20, y: 70 },
        },
    ],
]);
export default towersDefaultProperty;
