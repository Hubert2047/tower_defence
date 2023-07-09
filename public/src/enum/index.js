var E_enemyType;
(function (E_enemyType) {
    E_enemyType[E_enemyType["DRAGON"] = 1] = "DRAGON";
    E_enemyType[E_enemyType["BEAR"] = 2] = "BEAR";
    E_enemyType[E_enemyType["FOX"] = 3] = "FOX";
    E_enemyType[E_enemyType["SIREN"] = 4] = "SIREN";
    E_enemyType[E_enemyType["BROOD_MOTHER"] = 5] = "BROOD_MOTHER";
})(E_enemyType || (E_enemyType = {}));
var E_towerType;
(function (E_towerType) {
    E_towerType[E_towerType["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_towerType || (E_towerType = {}));
var E_projectileType;
(function (E_projectileType) {
    E_projectileType[E_projectileType["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_projectileType || (E_projectileType = {}));
var E_gameMap;
(function (E_gameMap) {
    E_gameMap[E_gameMap["DESERT"] = 1] = "DESERT";
})(E_gameMap || (E_gameMap = {}));
export { E_enemyType, E_gameMap, E_projectileType, E_towerType };
