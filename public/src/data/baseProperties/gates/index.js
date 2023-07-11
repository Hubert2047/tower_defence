import { E_angels, E_behaviors, E_explosion, E_gate, E_projectile } from '../../../enum/index.js';
import { deepClone } from '../../../helper/index.js';
const gatesBaseProperties = new Map([
    [
        E_gate.GIRL_HERO,
        {
            name: 'Girl Hero',
            gateType: E_gate.GIRL_HERO,
            offset: { x: 75, y: 70 },
            width: 250,
            height: 300,
            attackSpeed: 5,
            health: 5000000000,
            attackRange: 6000,
            damage: 1000,
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/idle/top_0.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_290]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/idle/left_290.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/idle/right_90.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/idle/bottom_180.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                },
                [E_behaviors.ATTACK]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/sword/top_0.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_290]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/sword/left_290.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/sword/right_90.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/sword/bottom_180.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                },
                [E_behaviors.ATTACK_BOW]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/bow/top_0.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_290]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/bow/left_290.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/bow/right_90.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../public/src/assets/images/gates/girl_hero/attack/bow/bottom_180.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                },
            },
            projectileInfo: {
                name: 'FIRE',
                projectileType: E_projectile.FIRE,
                width: 50,
                height: 50,
                offset: { x: -115, y: 70 },
                initFrames: {
                    [E_behaviors.IDLE]: {
                        [E_angels.ANGEL_0]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fly/fly_0.png',
                            maxX: 4,
                            maxY: 2,
                            holdTime: 4,
                        },
                        [E_angels.ANGEL_145]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fly/fly_135.png',
                            maxX: 4,
                            maxY: 2,
                            holdTime: 4,
                        },
                        [E_angels.ANGEL_35]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fly/fly_35.png',
                            maxX: 4,
                            maxY: 2,
                            holdTime: 4,
                        },
                        [E_angels.ANGEL_180]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fly/fly_135.png',
                            maxX: 4,
                            maxY: 2,
                            holdTime: 4,
                        },
                    },
                },
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
function getGatesProperties(gateType) {
    if (gatesBaseProperties.has(gateType))
        return deepClone(gatesBaseProperties.get(gateType));
    return deepClone(gatesBaseProperties.get(E_gate.GIRL_HERO));
}
export default getGatesProperties;
