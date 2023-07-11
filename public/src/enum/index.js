var E_enemy;
(function (E_enemy) {
    E_enemy[E_enemy["DRAGON"] = 1] = "DRAGON";
    E_enemy[E_enemy["BEAR"] = 2] = "BEAR";
    E_enemy[E_enemy["FOX"] = 3] = "FOX";
    E_enemy[E_enemy["SIREN"] = 4] = "SIREN";
    E_enemy[E_enemy["BROOD_MOTHER"] = 5] = "BROOD_MOTHER";
    E_enemy[E_enemy["Blue_Brood_Mother"] = 6] = "Blue_Brood_Mother";
    E_enemy[E_enemy["TIDE_HUNTER"] = 7] = "TIDE_HUNTER";
})(E_enemy || (E_enemy = {}));
var E_tower;
(function (E_tower) {
    E_tower[E_tower["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_tower || (E_tower = {}));
var E_projectile;
(function (E_projectile) {
    E_projectile[E_projectile["FIRE"] = 1] = "FIRE";
})(E_projectile || (E_projectile = {}));
var E_gameMap;
(function (E_gameMap) {
    E_gameMap[E_gameMap["DESERT"] = 1] = "DESERT";
})(E_gameMap || (E_gameMap = {}));
var E_explosion;
(function (E_explosion) {
    E_explosion[E_explosion["FIRE_BALL"] = 0] = "FIRE_BALL";
})(E_explosion || (E_explosion = {}));
var E_gate;
(function (E_gate) {
    E_gate[E_gate["GIRL_HERO"] = 0] = "GIRL_HERO";
})(E_gate || (E_gate = {}));
var E_behaviors;
(function (E_behaviors) {
    E_behaviors["RUN"] = "run";
    E_behaviors["ATTACK"] = "attack";
    E_behaviors["ATTACK_BOW"] = "attackBow";
    E_behaviors["DEATH"] = "death";
    E_behaviors["IDLE"] = "idle";
})(E_behaviors || (E_behaviors = {}));
var E_angels;
(function (E_angels) {
    E_angels["ANGEL_0"] = "0degree";
    E_angels["ANGEL_90"] = "90degree";
    E_angels["ANGEL_180"] = "180degree";
    E_angels["ANGEL_290"] = "290degree";
    E_angels["ANGEL_35"] = "35degree";
    E_angels["ANGEL_145"] = "145degree";
})(E_angels || (E_angels = {}));
export { E_angels, E_behaviors, E_enemy, E_explosion, E_gameMap, E_gate, E_projectile, E_tower };
