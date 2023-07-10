var E_enemy;
(function (E_enemy) {
    E_enemy[E_enemy["DRAGON"] = 1] = "DRAGON";
    E_enemy[E_enemy["BEAR"] = 2] = "BEAR";
    E_enemy[E_enemy["FOX"] = 3] = "FOX";
    E_enemy[E_enemy["SIREN"] = 4] = "SIREN";
    E_enemy[E_enemy["BROOD_MOTHER"] = 5] = "BROOD_MOTHER";
})(E_enemy || (E_enemy = {}));
var E_tower;
(function (E_tower) {
    E_tower[E_tower["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_tower || (E_tower = {}));
var E_projectile;
(function (E_projectile) {
    E_projectile[E_projectile["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_projectile || (E_projectile = {}));
var E_gameMap;
(function (E_gameMap) {
    E_gameMap[E_gameMap["DESERT"] = 1] = "DESERT";
})(E_gameMap || (E_gameMap = {}));
var E_explosion;
(function (E_explosion) {
    E_explosion[E_explosion["FIRE_BALL"] = 0] = "FIRE_BALL";
})(E_explosion || (E_explosion = {}));
export { E_enemy, E_gameMap, E_projectile, E_tower, E_explosion };
