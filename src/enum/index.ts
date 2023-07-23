enum E_enemy {
    DRAGON = 1,
    BEAR = 2,
    FOX = 3,
    SIREN = 4,
    BROOD_MOTHER = 5,
    Blue_Brood_Mother = 6,
    TIDE_HUNTER,
    Hunter,
    BUTTER_FLY,
    YELLOW_SPIDER,
    ROBOT,
    EYES,
}
enum E_projectile {
    FIRE = 1,
    THUNDER = 2,
    NUCLEAR = 3,
}
enum E_gameMap {
    DESERT = 1,
}
enum E_explosion {
    FIRE_BALL,
    THUNDER,
    FIRE,
    NUCLEAR,
    DESTROY,
}
enum E_gate {
    GIRL_HERO,
}
enum E_behaviors {
    RUN = 'run',
    ATTACK = 'attack',
    ATTACK_BOW = 'attackBow',
    DEATH = 'death',
    IDLE = 'idle',
    HIT = 'gethit',
    DROP_CHEST = 'DROP_CHEST',
    LEVEL_TITLE_1 = 'LEVEL_TITLE_1',
    LEVEL_TITLE_2 = 'LEVEL_TITLE_2',
    LEVEL_TITLE_3 = 'LEVEL_TITLE_3',
}
enum E_angels {
    ANGEL_0 = '0degree',
    ANGEL_22 = '22degree',
    ANGEL_45 = '45degree',
    ANGEL_67 = '67degree',
    ANGEL_90 = '90degree',
    ANGEL_112 = '112degree',
    ANGEL_135 = '135degree',
    ANGEL_157 = '157degree',
    ANGEL_180 = '180degree',
    ANGEL_202 = '202degree',
    ANGEL_225 = '225degree',
    ANGEL_247 = '247degree',
    ANGEL_292 = '292degree',
    ANGEL_270 = '270degree',
    ANGEL_315 = '315degree',
    ANGEL_337 = '337degree',
}
enum E_characters {
    GREEN_TREE = 1,
    MONSTERRA_TREE = 2,
    BLOOD_MOON = 3,
    FLYING_OBELISK = 4,
    HAUNTED_TREE = 5,
    OBELISK_THUNDER = 6,
    AUTUMN_TREE = 7,
    GALATA = 8,
    SHOVEL = 9,
}
enum E_characterRoles {
    TOWER = 'tower',
    PLANTED = 'planted',
    DESTROY = 'destroy',
}
enum E_gems {
    BLUE = 'blue',
    RED = 'red',
    PURPLE = 'purple',
    COIN = 'coin',
}
enum E_chests {
    GOLD = 'gold',
    SILVER = 'silver',
    PURPLE = 'purple',
}
enum E_towerAttackProperties {
    ATTACK_RANGE = 'AttackRange',
    ATTACK_DAMAGE = 'Damage',
    ATTACK_SPEED = 'AttackSpeed',
    ATTACK_MULTI = 'MultiTarget',
    PROJECTILE = 'Projectile',
}
enum E_level {
    LV1 = '1',
    LV2 = '2',
    LV3 = '3',
    LV4 = '4',
    LV5 = '5',
    LV6 = '6',
    LV7 = '7',
    LV8 = '8',
    LV9 = '9',
    LV10 = '10',
    LV11 = '11',
    LV12 = '12',
    LV13 = '13',
    LV14 = '14',
    LV15 = '15',
    LV16 = '16',
    LV17 = '17',
    LV18 = '18',
    LV19 = '19',
    LV20 = '20',
    LV21 = '21',
}
enum E_levelTitle {
    TITLE_0 = 'TITLE_0',
    TITLE_1 = 'TITLE_1',
    TITLE_2 = 'TITLE_2',
    TITLE_3 = 'TITLE_3',
}
export {
    E_angels,
    E_behaviors,
    E_characterRoles,
    E_characters,
    E_chests,
    E_enemy,
    E_explosion,
    E_gameMap,
    E_gate,
    E_gems,
    E_level,
    E_projectile,
    E_towerAttackProperties,
    E_levelTitle,
}
