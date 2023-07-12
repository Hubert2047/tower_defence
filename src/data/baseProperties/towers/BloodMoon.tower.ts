import { T_baseTowerProperties } from 'src/types/index.js'
import { E_angels, E_behaviors, E_explosion, E_projectile, E_tower } from '../../../enum/index.js'
const BloodMoonProperties: T_baseTowerProperties = {
    name: 'Blood Moon',
    towerType: E_tower.BLOOD_MOON,
    offset: { x: 20, y: 70 },
    width: 100,
    height: 180,
    prices: 10,
    initFrames: {
        [E_behaviors.ATTACK]: {
            [E_angels.ANGEL_0]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_45]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_90]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_135]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_180]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_225]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_270]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
                maxX: 11,
                maxY: 1,
                holdTime: 4,
            },
            [E_angels.ANGEL_315]: {
                imageSourceString: '../../../public/src/assets/images/towers/BloodMoon/tower_bloodmoon.png',
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
}
export default BloodMoonProperties
