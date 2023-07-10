import { E_explosion, E_projectile, E_tower } from '../../../enum/index.js';
const BloodMoonProperties = {
    name: 'Blood Moon',
    towerType: E_tower.BLOOD_MOON,
    offset: { x: 20, y: 70 },
    width: 100,
    height: 180,
    prices: 10,
    imageSourceString: ['../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png'],
    frame: { maxX: 11, maxY: 1, holdTime: 10 },
    attackSpeed: 8,
    attackArea: 300,
    damage: 1000,
    projectileInfo: {
        name: 'Blood Moon',
        projectileType: E_projectile.FIRE,
        imageSourceString: ['../../public/src/assets/images/projectiles/fireBall/fire_wall.png'],
        frame: { maxX: 9, maxY: 8, holdTime: 4 },
        width: 50,
        height: 50,
        offset: { x: -55, y: 12 },
        explosionInfo: {
            name: 'Fire Ball',
            explosionType: E_explosion.FIRE_BALL,
            position: { x: 0, y: 0 },
            imageSourceString: ['../../public/src/assets/images/projectiles/fireBall/fire_end.png'],
            frame: { maxX: 8, maxY: 1, holdTime: 3 },
            width: 50,
            height: 50,
            offset: { x: 0, y: 0 },
        },
    },
};
export default BloodMoonProperties;
