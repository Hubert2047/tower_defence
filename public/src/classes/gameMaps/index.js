import { POSITION_GOAL, TILE_SIZE } from '../../constants/index.js';
import { E_EnemyType, E_TowerType } from '../../enum/index.js';
import PlacementTile from '../PlacementTile.js';
import Bear from '../enemies/Bear.js';
import BroodMother from '../enemies/BroodMother.js';
import Dragon from '../enemies/Dragon.js';
import Fox from '../enemies/Fox.js';
import Siren from '../enemies/Siren.js';
import BloodMoon from '../towers/BloodMoon.tower.js';
export default class GameMap {
    constructor({ rounds, placementTiles2D, waypoints, backgoundImage, limitAttacks, startCoins }) {
        this._currentEnemiesData = [];
        this.rounds = rounds;
        this.waypoints = waypoints;
        this.limitAttacks = limitAttacks;
        this.backgoundImage = backgoundImage;
        this.currentRoundIndex = 0;
        this.placementTiles = this.getPlacementTiles(placementTiles2D);
        this.towers = [];
        this.isGameOver = false;
        this.coins = startCoins;
        this.isVictory = false;
        this._activeTile = null;
        this.createCurrentRoundEnemies();
    }
    updateMap(mouse) {
        this.updateEnemies();
        this.updatePlacementTiles(mouse);
        this.updateTowers();
        this.updateCoins();
        this.updateMapHP();
        return [this.isGameOver, this.isVictory];
    }
    get activeTile() {
        return this._activeTile;
    }
    updateMapHP() {
        const coinsHtml = document.querySelector('#hearts');
        if (coinsHtml) {
            coinsHtml.textContent = this.limitAttacks.toString();
        }
    }
    updateCoins() {
        const coinsHtml = document.querySelector('#coins');
        if (coinsHtml) {
            coinsHtml.textContent = this.coins.toString();
        }
    }
    get currentEnemiesData() {
        return this._currentEnemiesData;
    }
    updatePlacementTiles(mouse) {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(mouse);
        });
    }
    updateTowers() {
        this.towers.forEach((tower) => {
            tower.update({ enemies: this._currentEnemiesData });
        });
    }
    updateEnemies() {
        if (this._currentEnemiesData.length <= 0) {
            if (this.currentRoundIndex < this.rounds.length - 1) {
                this.currentRoundIndex++;
                this.createCurrentRoundEnemies();
            }
            else {
                this.isVictory = true;
            }
        }
        for (let i = this._currentEnemiesData.length - 1; i >= 0; i--) {
            const currentEnemy = this._currentEnemiesData[i];
            if (currentEnemy.position.x > POSITION_GOAL) {
                this.limitAttacks -= 1;
                this._currentEnemiesData.splice(i, 1);
                if (this.limitAttacks === 0) {
                    this.isGameOver = true;
                    break;
                }
                continue;
            }
            if (currentEnemy.HP <= 0) {
                this._currentEnemiesData.splice(i, 1);
                this.coins += currentEnemy.coins;
                continue;
            }
            currentEnemy.update(this.waypoints);
        }
    }
    addTower({ towerType }) {
        var _a;
        if (!this.activeTile)
            return;
        switch (towerType) {
            case E_TowerType.BLOOD_MOON:
                if (this.coins < BloodMoon.prices)
                    return;
                this.towers.push(new BloodMoon({ position: (_a = this.activeTile) === null || _a === void 0 ? void 0 : _a.position }));
                this.coins -= BloodMoon.prices;
                break;
            default:
                throw new Error('we dont have this tower');
        }
    }
    createCurrentRoundEnemies() {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = [];
        }
        const currentRound = this.rounds[this.currentRoundIndex];
        currentRound.enemies.forEach((enemyInfo) => {
            const enemy = this.createEnemy(enemyInfo);
            this._currentEnemiesData.push(enemy);
        });
    }
    createEnemy(enemyInfo) {
        switch (enemyInfo.enemyType) {
            case E_EnemyType.DRAGON:
                return new Dragon({ position: enemyInfo.position });
            case E_EnemyType.BEAR:
                return new Bear({ position: enemyInfo.position });
            case E_EnemyType.BROOD_MOTHER:
                return new BroodMother({ position: enemyInfo.position });
            case E_EnemyType.FOX:
                return new Fox({ position: enemyInfo.position });
            case E_EnemyType.SIREN:
                return new Siren({ position: enemyInfo.position });
            default:
                throw new Error('we dont have this enemy');
        }
    }
    checkActiveTile({ mouse }) {
        var _a;
        this._activeTile = (_a = this.placementTiles.find((tile) => tile.hasCollisionWithMouse(mouse))) !== null && _a !== void 0 ? _a : null;
    }
    getPlacementTiles(placementTiles2D) {
        const placementTiles = [];
        placementTiles2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 14) {
                    placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }));
                }
            });
        });
        return placementTiles;
    }
}
