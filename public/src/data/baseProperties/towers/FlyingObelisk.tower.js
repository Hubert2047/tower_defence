import { E_angels, E_behaviors, E_explosion, E_projectile, E_tower } from '../../../enum/index.js';
const FlyingObeliskProperties = {
    name: 'FLYING OBELISK',
    towerType: E_tower.FLYING_OBELISK,
    offset: { x: 20, y: 70 },
    width: 100,
    height: 250,
    prices: 10,
    initFrames: {
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/towers/FlyingObelisk/FlyingObelisk.png',
                maxX: 13,
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
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_45]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_90]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_135]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_180]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_225]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_270]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                    [E_angels.ANGEL_315]: {
                        imageSourceString: '../../../public/src/assets/images/projectiles/fireBall/fire_ball.png',
                        maxX: 9,
                        maxY: 8,
                        holdTime: 10,
                    },
                },
            },
            width: 50,
            height: 50,
            offset: { x: -65, y: 12 },
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
export default FlyingObeliskProperties;
