import { E_angels, E_behaviors, E_explosion, E_projectile, E_tower } from '../../../enum/index.js';
const BloodMoonProperties = {
    name: 'Blood Moon',
    towerType: E_tower.BLOOD_MOON,
    offset: { x: 20, y: 70 },
    width: 100,
    height: 180,
    prices: 10,
    initFrames: {
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/0.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/45.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/90.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/135.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/180.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/225.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/270.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/315.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
        },
    },
    attackSpeed: 8,
    attackRange: 300,
    damage: 1000,
    projectileInfo: {
        [E_behaviors.ATTACK]: {
            name: 'FIRE',
            projectileType: E_projectile.FIRE,
            initFrames: {
                [E_behaviors.ATTACK]: {
                    [E_angels.ANGEL_0]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/0.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/45.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/90.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/135.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/180.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/225.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/270.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 4,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/gate/girl_hero/idle/315.png',
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
                    [E_behaviors.ATTACK]: {
                        [E_angels.ANGEL_0]: {
                            imageSourceString: '../../public/src/assets/images/projectiles/fireBall/fire_end.png',
                            maxX: 8,
                            maxY: 1,
                            holdTime: 3,
                        },
                    },
                },
                width: 50,
                height: 50,
                offset: { x: 0, y: 0 },
            },
        },
    },
};
export default BloodMoonProperties;
