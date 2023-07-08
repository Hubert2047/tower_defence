var E_EnemyType;
(function (E_EnemyType) {
    E_EnemyType[E_EnemyType["DRAGON"] = 1] = "DRAGON";
    E_EnemyType[E_EnemyType["BEAR"] = 2] = "BEAR";
    E_EnemyType[E_EnemyType["FOX"] = 3] = "FOX";
    E_EnemyType[E_EnemyType["SIREN"] = 4] = "SIREN";
    E_EnemyType[E_EnemyType["BROOD_MOTHER"] = 5] = "BROOD_MOTHER";
})(E_EnemyType || (E_EnemyType = {}));
var E_TowerType;
(function (E_TowerType) {
    E_TowerType[E_TowerType["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_TowerType || (E_TowerType = {}));
var E_ProjectileType;
(function (E_ProjectileType) {
    E_ProjectileType[E_ProjectileType["BLOOD_MOON"] = 1] = "BLOOD_MOON";
})(E_ProjectileType || (E_ProjectileType = {}));
var E_GameMap;
(function (E_GameMap) {
    E_GameMap[E_GameMap["DESERT"] = 1] = "DESERT";
})(E_GameMap || (E_GameMap = {}));
export { E_EnemyType, E_GameMap, E_ProjectileType, E_TowerType };
