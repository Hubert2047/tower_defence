enum E_enemy {
    DRAGON = 1,
    BEAR = 2,
    FOX = 3,
    SIREN = 4,
    BROOD_MOTHER = 5,
    Blue_Brood_Mother = 6,
    TIDE_HUNTER,
    Hunter,
}
enum E_tower {
    BLOOD_MOON = 1,
    FLYING_OBELISK = 2,
    HAUNTED_TREE = 3,
    OBELISK_THUNDER = 4,
}
enum E_projectile {
    FIRE = 1,
    THUNDER = 2,
}
enum E_gameMap {
    DESERT = 1,
}
enum E_explosion {
    FIRE_BALL,
    THUNDER,
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
export { E_angels, E_behaviors, E_enemy, E_explosion, E_gameMap, E_gate, E_projectile, E_tower }
