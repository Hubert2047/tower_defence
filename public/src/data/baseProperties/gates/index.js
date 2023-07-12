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
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/0.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/45.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/90.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/135.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/180.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/225.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/270.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/315.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                },
                [E_behaviors.ATTACK]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/0.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/45.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/90.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/135.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/180.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/225.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/270.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/bow/315.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                },
                [E_behaviors.ATTACK_BOW]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/0.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/45.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/90.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/135.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/180.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/225.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/270.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/attack/sword/315.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 4,
                    },
                },
            },
            projectileInfo: {
                [E_behaviors.ATTACK_BOW]: {
                    name: 'FIRE',
                    projectileType: E_projectile.FIRE,
                    width: 50,
                    height: 50,
                    offset: { x: -115, y: 70 },
                    initFrames: {
                        [E_behaviors.ATTACK]: {
                            [E_angels.ANGEL_0]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/0.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_45]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/45.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_90]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/90.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_135]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/135.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_180]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/180.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_225]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/225.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_270]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/270.png',
                                maxX: 4,
                                maxY: 2,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_315]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/315.png',
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
                            [E_behaviors.ATTACK]: {
                                [E_angels.ANGEL_0]: {
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
        },
    ],
]);
function getGatesProperties(gateType) {
    if (gatesBaseProperties.has(gateType))
        return deepClone(gatesBaseProperties.get(gateType));
    return deepClone(gatesBaseProperties.get(E_gate.GIRL_HERO));
}
export default getGatesProperties;
