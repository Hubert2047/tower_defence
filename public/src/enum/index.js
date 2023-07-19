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
    E_enemy[E_enemy["BUTTER_FLY"] = 9] = "BUTTER_FLY";
    E_enemy[E_enemy["YELLOW_SPIDER"] = 10] = "YELLOW_SPIDER";
    E_enemy[E_enemy["ROBOT"] = 11] = "ROBOT";
    E_enemy[E_enemy["EYES"] = 12] = "EYES";
})(E_enemy || (E_enemy = {}));
var E_projectile;
(function (E_projectile) {
    E_projectile[E_projectile["FIRE"] = 1] = "FIRE";
    E_projectile[E_projectile["THUNDER"] = 2] = "THUNDER";
    E_projectile[E_projectile["NUCLEAR"] = 3] = "NUCLEAR";
})(E_projectile || (E_projectile = {}));
var E_gameMap;
(function (E_gameMap) {
    E_gameMap[E_gameMap["DESERT"] = 1] = "DESERT";
})(E_gameMap || (E_gameMap = {}));
var E_explosion;
(function (E_explosion) {
    E_explosion[E_explosion["FIRE_BALL"] = 0] = "FIRE_BALL";
    E_explosion[E_explosion["THUNDER"] = 1] = "THUNDER";
    E_explosion[E_explosion["FIRE"] = 2] = "FIRE";
    E_explosion[E_explosion["NUCLEAR"] = 3] = "NUCLEAR";
    E_explosion[E_explosion["DESTROY"] = 4] = "DESTROY";
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
    E_behaviors["DROP_CHEST"] = "DROP_CHEST";
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
var E_characters;
(function (E_characters) {
    E_characters[E_characters["GREEN_TREE"] = 1] = "GREEN_TREE";
    E_characters[E_characters["MONSTERRA_TREE"] = 2] = "MONSTERRA_TREE";
    E_characters[E_characters["BLOOD_MOON"] = 3] = "BLOOD_MOON";
    E_characters[E_characters["FLYING_OBELISK"] = 4] = "FLYING_OBELISK";
    E_characters[E_characters["HAUNTED_TREE"] = 5] = "HAUNTED_TREE";
    E_characters[E_characters["OBELISK_THUNDER"] = 6] = "OBELISK_THUNDER";
    E_characters[E_characters["AUTUMN_TREE"] = 7] = "AUTUMN_TREE";
    E_characters[E_characters["SHOVEL"] = 8] = "SHOVEL";
})(E_characters || (E_characters = {}));
var E_characterRoles;
(function (E_characterRoles) {
    E_characterRoles["ATTACK"] = "attack";
    E_characterRoles["PLANTED"] = "planted";
    E_characterRoles["DESTROY"] = "destroy";
})(E_characterRoles || (E_characterRoles = {}));
var E_gems;
(function (E_gems) {
    E_gems["BLUE"] = "blue";
    E_gems["RED"] = "red";
    E_gems["PURPLE"] = "purple";
})(E_gems || (E_gems = {}));
var E_chests;
(function (E_chests) {
    E_chests["GOLD"] = "gold";
    E_chests["SILVER"] = "silver";
    E_chests["PURPLE"] = "purple";
})(E_chests || (E_chests = {}));
export { E_angels, E_behaviors, E_enemy, E_characterRoles, E_explosion, E_gameMap, E_gate, E_projectile, E_characters, E_gems, E_chests, };
