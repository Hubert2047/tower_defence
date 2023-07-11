import { E_angels, E_behaviors, E_explosion, E_gate, E_projectile } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
const gatesBaseProperties = new Map([
    [
        E_gate.Egg,
        {
            name: 'Egg',
            gateType: E_gate.Egg,
            offset: { x: 20, y: 70 },
            width: 200,
            height: 220,
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                        maxX: 11,
                        maxY: 1,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_290]: {
                        imageSourceString: '../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                        maxX: 11,
                        maxY: 1,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                        maxX: 11,
                        maxY: 1,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                        maxX: 11,
                        maxY: 1,
                        holdTime: 10,
                    },
                },
            },
            attackSpeed: 10,
            attackRange: 200,
            damage: 3000,
            projectileInfo: {
                name: 'FIRE',
                projectileType: E_projectile.FIRE,
                initFrames: {
                    [E_behaviors.IDLE]: {
                        [E_angels.ANGEL_0]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_wall.png',
                            maxX: 9,
                            maxY: 8,
                            holdTime: 4,
                        },
                        [E_angels.ANGEL_290]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_wall.png',
                            maxX: 9,
                            maxY: 8,
                            holdTime: 4,
                        },
                        [E_angels.ANGEL_90]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_wall.png',
                            maxX: 9,
                            maxY: 8,
                            holdTime: 4,
                        },
                        [E_angels.ANGEL_180]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_wall.png',
                            maxX: 9,
                            maxY: 8,
                            holdTime: 4,
                        },
                    },
                },
                width: 50,
                height: 50,
                offset: { x: -55, y: 12 },
                explosionInfo: {
                    name: 'Fire Ball',
                    explosionType: E_explosion.FIRE_BALL,
                    position: { x: 0, y: 0 },
                    initFrames: {
                        [E_behaviors.IDLE]: {
                            [E_angels.ANGEL_0]: {
                                imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                                maxX: 8,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_290]: {
                                imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                                maxX: 8,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_90]: {
                                imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                                maxX: 8,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_180]: {
                                imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                                maxX: 8,
                                maxY: 1,
                                holdTime: 4,
                            },
                        },
                    },
                    width: 50,
                    height: 50,
                    offset: { x: 0, y: 0 },
                },
            },
        },
    ],
]);
function getGatesTowerProperties(gateType) {
    if (gatesBaseProperties.has(gateType))
        return deepClone(gatesBaseProperties.get(gateType));
    return undefined;
}
export default getGatesTowerProperties;
