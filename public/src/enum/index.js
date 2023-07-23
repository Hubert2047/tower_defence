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
    E_behaviors["LEVEL_TITLE_1"] = "LEVEL_TITLE_1";
    E_behaviors["LEVEL_TITLE_2"] = "LEVEL_TITLE_2";
    E_behaviors["LEVEL_TITLE_3"] = "LEVEL_TITLE_3";
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
    E_characters[E_characters["GALATA"] = 8] = "GALATA";
    E_characters[E_characters["SHOVEL"] = 9] = "SHOVEL";
})(E_characters || (E_characters = {}));
var E_characterRoles;
(function (E_characterRoles) {
    E_characterRoles["TOWER"] = "tower";
    E_characterRoles["PLANTED"] = "planted";
    E_characterRoles["DESTROY"] = "destroy";
})(E_characterRoles || (E_characterRoles = {}));
var E_gems;
(function (E_gems) {
    E_gems["BLUE"] = "blue";
    E_gems["RED"] = "red";
    E_gems["PURPLE"] = "purple";
    E_gems["COIN"] = "coin";
})(E_gems || (E_gems = {}));
var E_chests;
(function (E_chests) {
    E_chests["GOLD"] = "gold";
    E_chests["SILVER"] = "silver";
    E_chests["PURPLE"] = "purple";
})(E_chests || (E_chests = {}));
var E_towerAttackProperties;
(function (E_towerAttackProperties) {
    E_towerAttackProperties["ATTACK_RANGE"] = "AttackRange";
    E_towerAttackProperties["ATTACK_DAMAGE"] = "Damage";
    E_towerAttackProperties["ATTACK_SPEED"] = "AttackSpeed";
    E_towerAttackProperties["ATTACK_MULTI"] = "MultiTarget";
    E_towerAttackProperties["PROJECTILE"] = "Projectile";
})(E_towerAttackProperties || (E_towerAttackProperties = {}));
var E_level;
(function (E_level) {
    E_level["LV1"] = "1";
    E_level["LV2"] = "2";
    E_level["LV3"] = "3";
    E_level["LV4"] = "4";
    E_level["LV5"] = "5";
    E_level["LV6"] = "6";
    E_level["LV7"] = "7";
    E_level["LV8"] = "8";
    E_level["LV9"] = "9";
    E_level["LV10"] = "10";
    E_level["LV11"] = "11";
    E_level["LV12"] = "12";
    E_level["LV13"] = "13";
    E_level["LV14"] = "14";
    E_level["LV15"] = "15";
    E_level["LV16"] = "16";
    E_level["LV17"] = "17";
    E_level["LV18"] = "18";
    E_level["LV19"] = "19";
    E_level["LV20"] = "20";
    E_level["LV21"] = "21";
})(E_level || (E_level = {}));
var E_levelTitle;
(function (E_levelTitle) {
    E_levelTitle["TITLE_0"] = "TITLE_0";
    E_levelTitle["TITLE_1"] = "TITLE_1";
    E_levelTitle["TITLE_2"] = "TITLE_2";
    E_levelTitle["TITLE_3"] = "TITLE_3";
})(E_levelTitle || (E_levelTitle = {}));
export { E_angels, E_behaviors, E_characterRoles, E_characters, E_chests, E_enemy, E_explosion, E_gameMap, E_gate, E_gems, E_level, E_projectile, E_towerAttackProperties, E_levelTitle, };
