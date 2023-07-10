import { E_explosion, E_projectile, E_tower } from '../../enum/index.js';
import { deepClone } from '../../helper/index.js';
const towersBaseProperties = new Map([
    [
        E_tower.BLOOD_MOON,
        {
            name: 'Blood Moon',
            towerType: E_tower.BLOOD_MOON,
            offset: { x: 20, y: 70 },
            width: 100,
            height: 180,
            prices: 10,
            imageSourceString: ['../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png'],
            frame: { maxX: 6, maxY: 5, holdTime: 6 },
            attackSpeed: 2,
            attackArea: 300,
            damage: 500,
            projectileInfo: {
                name: 'Blood Moon',
                projectileType: E_projectile.BLOOD_MOON,
                imageSourceString: ['../../../public/src/assets/images/projectiles/fireBall/fire_ball.png'],
                frame: { maxX: 1, maxY: 1, holdTime: 4 },
                width: 80,
                height: 80,
                offset: { x: 0, y: 0 },
                explosionInfo: {
                    name: 'Fire Ball',
                    explosionType: E_explosion.FIRE_BALL,
                    imageSourceString: ['../../../public/src/assets/images/projectiles/fireBall/fire_end.png'],
                    frame: { maxX: 8, maxY: 1, holdTime: 4 },
                    width: 50,
                    height: 50,
                    offset: { x: 0, y: 0 },
                },
            },
        },
    ],
]);
function getBaseTowerProperties(towerType) {
    if (towersBaseProperties.has(towerType))
        return deepClone(towersBaseProperties.get(towerType));
    return undefined;
}
export default getBaseTowerProperties;