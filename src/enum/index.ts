enum E_enemy {
    DRAGON = 1,
    BEAR = 2,
    FOX = 3,
    SIREN = 4,
    BROOD_MOTHER = 5,
    Blue_Brood_Mother = 6,
    TIDE_HUNTER,
}
enum E_tower {
    BLOOD_MOON = 1,
}
enum E_projectile {
    FIRE = 1,
}
enum E_gameMap {
    DESERT = 1,
}
enum E_explosion {
    FIRE_BALL,
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
}
enum E_angels {
    ANGEL_0 = '0degree',
    ANGEL_90 = '90degree',
    ANGEL_180 = '180degree',
    ANGEL_290 = '290degree',
    ANGEL_35 = '35degree',
    ANGEL_145 = '145degree',
}
export { E_angels, E_behaviors, E_enemy, E_explosion, E_gameMap, E_gate, E_projectile, E_tower }
