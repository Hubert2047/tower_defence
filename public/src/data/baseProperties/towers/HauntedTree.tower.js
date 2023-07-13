import { E_angels, E_behaviors, E_explosion, E_projectile, E_tower } from '../../../enum/index.js';
const HauntedTreeProperties = {
    name: 'HAUNTED TREE',
    towerType: E_tower.HAUNTED_TREE,
    offset: { x: 60, y: 100 },
    width: 192,
    height: 230,
    prices: 10,
    initFrames: {
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/0.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_22]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/22.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/45.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_67]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/67.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/90.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_112]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/112.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/135.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_157]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/157.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/180.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_202]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/202.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/225.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_247]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/247.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/270.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_292]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/292.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/315.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
            },
            [E_angels.ANGEL_337]: {
                imageSourceString: '../../../public/src/assets/images/towers/HuantedTree/attack/337.png',
                maxX: 1,
                maxY: 1,
                holdTime: 3,
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
export default HauntedTreeProperties;
