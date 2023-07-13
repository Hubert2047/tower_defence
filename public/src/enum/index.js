var E_enemy;
(function (E_enemy) {
    E_enemy[E_enemy["DRAGON"] = 1] = "DRAGON";
    E_enemy[E_enemy["BEAR"] = 2] = "BEAR";
    E_enemy[E_enemy["FOX"] = 3] = "FOX";
    E_enemy[E_enemy["SIREN"] = 4] = "SIREN";
    E_enemy[E_enemy["BROOD_MOTHER"] = 5] = "BROOD_MOTHER";
    E_enemy[E_enemy["Blue_Brood_Mother"] = 6] = "Blue_Brood_Mother";
    E_enemy[E_enemy["TIDE_HUNTER"] = 7] = "TIDE_HUNTER";
    E_enemy[E_enemy["Hunter"] = 8] = "Hunter";
})(E_enemy || (E_enemy = {}));
var E_tower;
(function (E_tower) {
    E_tower[E_tower["BLOOD_MOON"] = 1] = "BLOOD_MOON";
    E_tower[E_tower["FLYING_OBELISK"] = 2] = "FLYING_OBELISK";
    E_tower[E_tower["HAUNTED_TREE"] = 3] = "HAUNTED_TREE";
    E_tower[E_tower["OBELISK_THUNDER"] = 4] = "OBELISK_THUNDER";
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
    E_behaviors["HIT"] = "gethit";
})(E_behaviors || (E_behaviors = {}));
var E_angels;
(function (E_angels) {
    E_angels["ANGEL_0"] = "0degree";
    E_angels["ANGEL_22"] = "22degree";
    E_angels["ANGEL_45"] = "45degree";
    E_angels["ANGEL_67"] = "67degree";
    E_angels["ANGEL_90"] = "90degree";
    E_angels["ANGEL_112"] = "112degree";
    E_angels["ANGEL_135"] = "135degree";
    E_angels["ANGEL_157"] = "157degree";
    E_angels["ANGEL_180"] = "180degree";
    E_angels["ANGEL_202"] = "202degree";
    E_angels["ANGEL_225"] = "225degree";
    E_angels["ANGEL_247"] = "247degree";
    E_angels["ANGEL_292"] = "292degree";
    E_angels["ANGEL_270"] = "270degree";
    E_angels["ANGEL_315"] = "315degree";
    E_angels["ANGEL_337"] = "337degree";
})(E_angels || (E_angels = {}));
export { E_angels, E_behaviors, E_enemy, E_explosion, E_gameMap, E_gate, E_projectile, E_tower };
