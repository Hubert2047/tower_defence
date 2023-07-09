import { POSITION_GOAL, TILE_SIZE } from '../../constants/index.js';
import context2D from '../../context2D/index.js';
import { E_enemy, E_tower } from '../../enum/index.js';
import { createImageSources, randomNumberInRange } from '../../helper/index.js';
import PlacementTile from '../PlacementTile.js';
import Bear from '../enemies/Bear.js';
import BroodMother from '../enemies/BroodMother.js';
import Dragon from '../enemies/Dragon.js';
import Fox from '../enemies/Fox.js';
import Siren from '../enemies/Siren.js';
import Sprite from '../sprite/index.js';
import BloodMoon from '../towers/BloodMoon.tower.js';
export default class GameMap {
    constructor({ rounds, placementTiles2D, waypoints, backgroundImage, limitAttacks, startCoins }) {
        this._currentEnemiesData = [];
        this.rounds = rounds;
        this.waypoints = waypoints;
        this.limitAttacks = limitAttacks;
        this.backgroundImage = backgroundImage;
        this.currentRoundIndex = 0;
        this.placementTiles = this.getPlacementTiles(placementTiles2D);
        this.shootingAudio = document.getElementById('shooting');
        this.towers = [];
        this.coins = startCoins;
        this.currentDashboardEnemiesInfo = [];
        this._activeTile = null;
        this.isGameOver = false;
        this.isVictory = false;
        this.createCurrentRoundEnemies();
    }
    updateMap(mouse) {
        this.updateScreenGame();
        this.updateEnemies();
        this.updatePlacementTiles(mouse);
        this.updateTowers(this.shootingAudio);
        // this.updateCoins()
        // this.updateMapHP()
        this.updateDashboardEnemies();
        return [this.isGameOver, this.isVictory];
    }
    get activeTile() {
        return this._activeTile;
    }
    updateScreenGame() {
        this.createBackground();
    }
    createBackground() {
        if (context2D)
            context2D.drawImage(this.backgroundImage, 0, 0);
    }
    drawCoinsAndGameHealth() { }
    updateDashboardEnemies() {
        const sourcString = ['../../public/src/assets/images/borders/1.png'];
        const imageSources = createImageSources(sourcString);
        const sourcString1 = ['../../public/src/assets/images/borders/4.png'];
        const imageSources1 = createImageSources(sourcString1);
        const a = new Sprite({
            position: { x: 0, y: 64 },
            offset: { x: 0, y: 0 },
            imageSources,
            width: 64,
            height: 64,
            frame: { maxX: 1, maxY: 1, holdTime: 4 },
        });
        const b = new Sprite({
            position: { x: 64 * 1, y: 64 },
            offset: { x: 0, y: 0 },
            imageSources: imageSources1,
            width: 64,
            height: 64,
            frame: { maxX: 1, maxY: 1, holdTime: 4 },
        });
        a.draw({ sourceIndex: 0 });
        b.draw({ sourceIndex: 0 });
        this.currentDashboardEnemiesInfo[0].enemy.draw({ sourceIndex: 3 });
        this.currentDashboardEnemiesInfo[1].enemy.draw({ sourceIndex: 3 });
        // dragon.draw({ sourceIndex: 2 })
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
    updateTowers(shootingAudio) {
        this.towers.forEach((tower) => {
            tower.update({ enemies: this._currentEnemiesData, shootingAudio });
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
                this.subtractDisplayEnemies(currentEnemy);
                if (this.limitAttacks === 0) {
                    this.isGameOver = true;
                    break;
                }
                continue;
            }
            if (currentEnemy.remainHealth <= 0) {
                this._currentEnemiesData.splice(i, 1);
                this.subtractDisplayEnemies(currentEnemy);
                this.coins += currentEnemy.coins;
                continue;
            }
            currentEnemy.update(this.waypoints);
        }
    }
    subtractDisplayEnemies(subtractEnemy) {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemy) => {
            if (dashboardEnemy.enemyType === subtractEnemy.enemyType) {
                dashboardEnemy.remainEnemiesTotal--;
            }
        });
    }
    addTower({ towerType }) {
        var _a;
        if (!this.activeTile)
            return;
        switch (towerType) {
            case E_tower.BLOOD_MOON:
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
        this.currentDashboardEnemiesInfo = [];
        const currentRound = this.rounds[this.currentRoundIndex];
        currentRound.enemies.forEach((enemyInfo, index) => {
            const enemy = {
                enemyType: enemyInfo.enemyType,
                position: { x: 64 * index, y: 64 },
                offset: { x: 18, y: 20 },
                width: 100,
                height: 100,
            };
            const dashboardEnemy = this.createEnemy(enemy);
            this.currentDashboardEnemiesInfo.push({
                enemyType: enemyInfo.enemyType,
                enemy: dashboardEnemy,
                remainEnemiesTotal: enemyInfo.amount,
            });
            for (let i = 0; i < enemyInfo.amount; i++) {
                const space = randomNumberInRange(enemyInfo.spaceMin, enemyInfo.spaceMax);
                const position = { x: enemyInfo.basePosition.x - space * i, y: enemyInfo.basePosition.y };
                const enemy = this.createEnemy({
                    position,
                    enemyType: enemyInfo.enemyType,
                    moveSpeed: enemyInfo.moveSpeed,
                    health: enemyInfo.health,
                    coins: enemyInfo.coins,
                });
                this._currentEnemiesData.push(enemy);
            }
        });
    }
    createEnemy(enemy) {
        switch (enemy.enemyType) {
            case E_enemy.DRAGON:
                return new Dragon(enemy);
            case E_enemy.BEAR:
                return new Bear(enemy);
            case E_enemy.BROOD_MOTHER:
                return new BroodMother(enemy);
            case E_enemy.FOX:
                return new Fox(enemy);
            case E_enemy.SIREN:
                return new Siren(enemy);
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
