import { E_angels, E_behaviors, E_explosion, E_gate, E_projectile } from '../../../enum/index.js'
import { deepClone } from '../../../helper/index.js'
import { T_baseGateProperties } from '../../../types/index.js'
const gatesBaseProperties: Map<E_gate, T_baseGateProperties> = new Map([
    [
        E_gate.GIRL_HERO,
        {
            name: 'Girl Hero',
            gateType: E_gate.GIRL_HERO,
            offset: { x: 75, y: 70 },
            width: 250,
            height: 301,
            attackSpeed: 5,
            health: 5000000000,
            attackRange: 800,
            damage: 500,
            initFrames: {
                [E_behaviors.IDLE]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/0.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/45.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/90.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/135.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/180.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/225.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/270.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/idle/315.png',
                        maxX: 8,
                        maxY: 5,
                        holdTime: 4,
                    },
                },
                [E_behaviors.ATTACK_BOW]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/0.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_22]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/22.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/45.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_67]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/67.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/90.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_112]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/112.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/135.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_157]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/157.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/180.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_202]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/202.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/225.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_247]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/247.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/270.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_292]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/292.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/315.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_337]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/bow/337.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                },
                [E_behaviors.ATTACK]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/0.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_22]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/22.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/45.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_67]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/67.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/90.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_112]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/112.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/135.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_157]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/157.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/180.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_202]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/202.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/225.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_247]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/247.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/270.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_292]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/292.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/315.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                    [E_angels.ANGEL_337]: {
                        imageSourceString: '../../../public/src/assets/images/gates/girl_hero/attack/sword/337.png',
                        maxX: 6,
                        maxY: 4,
                        holdTime: 3,
                    },
                },
            },
            projectileInfo: {
                [E_behaviors.ATTACK_BOW]: {
                    name: 'FIRE',
                    projectileType: E_projectile.FIRE,
                    width: 30,
                    height: 30,
                    moveSpeed: 8,
                    offset: { x: -115, y: 45 },
                    initFrames: {
                        [E_behaviors.ATTACK]: {
                            [E_angels.ANGEL_0]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_45]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_90]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_135]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_180]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_225]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_270]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
                                holdTime: 4,
                            },
                            [E_angels.ANGEL_315]: {
                                imageSourceString: '../../../public/src/assets/images/projectiles/fly/cicle.png',
                                maxX: 1,
                                maxY: 1,
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
                                    imageSourceString:
                                        '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                                    maxX: 8,
                                    maxY: 1,
                                    holdTime: 4,
                                },
                            },
                        },

                        width: 50,
                        height: 50,
                        offset: { x: 30, y: 30 },
                    },
                },
                [E_behaviors.ATTACK]: {
                    name: 'FIRE',
                    projectileType: E_projectile.FIRE,
                    width: 220,
                    height: 220,
                    moveSpeed: 9,
                    offset: { x: 15, y: 90 },
                    initFrames: {
                        [E_behaviors.ATTACK]: {
                            [E_angels.ANGEL_0]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_45]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_90]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_135]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_180]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_225]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_270]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                            [E_angels.ANGEL_315]: {
                                imageSourceString:
                                    '../../../public/src/assets/images/projectiles/sword_flass/slashed.png',
                                maxX: 3,
                                maxY: 2,
                                holdTime: 2,
                            },
                        },
                    },
                    // explosionInfo: {
                    //     name: 'Fire Ball',
                    //     explosionType: E_explosion.FIRE_BALL,
                    //     position: { x: 0, y: 0 },
                    //     initFrames: {
                    //         [E_behaviors.ATTACK]: {
                    //             [E_angels.ANGEL_0]: {
                    //                 imageSourceString:
                    //                     '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                    //                 maxX: 8,
                    //                 maxY: 1,
                    //                 holdTime: 4,
                    //             },
                    //         },
                    //     },

                    //     width: 50,
                    //     height: 50,
                    //     offset: { x: 0, y: 0 },
                    // },
                },
            },
        },
    ],
])
function getGatesProperties(gateType: E_gate): T_baseGateProperties {
    if (gatesBaseProperties.has(gateType)) return deepClone(gatesBaseProperties.get(gateType))
    return deepClone(gatesBaseProperties.get(E_gate.GIRL_HERO))
}
export default getGatesProperties
