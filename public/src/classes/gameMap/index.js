import { POSITION_GOAL, TILE_SIZE } from '../../constants/index.js';
import context2D from '../../context2D/index.js';
import getBaseEnemyProperties from '../../data/baseProperties/enemies/index.js';
import gatesBaseProperties from '../../data/baseProperties/gates/index.js';
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js';
import { E_angels, E_behaviors, E_gate } from '../../enum/index.js';
import { createFrames, randomNumberInRange } from '../../helper/index.js';
import Border from '../dashboardEnemyBorder/index.js';
import Enemy from '../enemy/index.js';
import Gate from '../gate/index.js';
import PlacementTile from '../placementTile/index.js';
import Sprite from '../sprite/index.js';
import Tower from '../tower/index.js';
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
        this.menu = this.createMenu();
        this.coinsIcon = this.createCoinsIcon();
        this.heartIcon = this.createHeartIcon();
        this.effect = this.createEffec();
        this._activeTile = null;
        this.deathEffectEnemies = [];
        this.isVictory = false;
        this.spawingCurrentRoundEnemies();
        this.gate = this.createGate();
    }
    createGate() {
        const gateBaseProperties = gatesBaseProperties(E_gate.GIRL_HERO);
        const gateOptions = {
            initFrames: gateBaseProperties.initFrames,
            name: gateBaseProperties.name,
            width: gateBaseProperties.width,
            height: gateBaseProperties.height,
            gateType: gateBaseProperties.gateType,
            position: { x: 64 * 18, y: 64 * 5 },
            offset: gateBaseProperties.offset,
            attackSpeed: gateBaseProperties.attackSpeed,
            attackRange: gateBaseProperties.attackRange,
            damage: gateBaseProperties.damage,
            health: gateBaseProperties.health,
        };
        return new Gate(gateOptions);
    }
    updateMap(mouse) {
        this.updateScreenGame();
        this.updateEnemies();
        this.updatePlacementTiles(mouse);
        this.updateTowers();
        this.updateDashboardEnemies();
        this.drawCoinsAndGameHearts();
        this.updateGate();
        return this.getGameStatus();
    }
    getGameStatus() {
        const isGameOver = this.gate.remainHealth === 0;
        const isVictory = this._currentEnemiesData.length <= 0 && this.currentRoundIndex >= this.rounds.length - 1;
        return [isGameOver, isVictory];
    }
    updateGate() {
        if (this.gate) {
            this.gate.update({ enemies: this._currentEnemiesData });
        }
    }
    createMenu() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: 64 * 17, y: 64 * 1 },
            offset: { x: 10, y: 26 },
            height: 120,
            width: 230,
        };
        return new Sprite(options);
    }
    createCoinsIcon() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/screen/coins.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: 64 * 17, y: 64 * 1 },
            offset: { x: 4, y: -12 },
            height: 40,
            width: 40,
        };
        return new Sprite(options);
    }
    createHeartIcon() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/screen/heart.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: 64 * 19, y: 64 * 1 },
            offset: { x: 40, y: -14 },
            height: 34,
            width: 34,
        };
        return new Sprite(options);
    }
    createEffec() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_290]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_90]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
                [E_angels.ANGEL_180]: {
                    imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: 64 * 16, y: 64 * 6 },
            offset: { x: -20, y: -30 },
            height: 400,
            width: 400,
        };
        return new Sprite(options);
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
    drawCoinsAndGameHearts() {
        this.menu.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
        this.drawCoins();
        this.drawHearts();
    }
    drawCoins() {
        this.coinsIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
        const textOptions = {
            text: this.coins.toString(),
            position: { x: this.coinsIcon.position.x + 46, y: this.coinsIcon.position.y - 26 },
            color: 'white',
            fontSize: 20,
        };
        this.drawText(textOptions);
    }
    drawHearts() {
        this.heartIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
        const textOptions = {
            text: this.limitAttacks.toString(),
            position: { x: this.heartIcon.position.x, y: this.heartIcon.position.y - 26 },
            color: 'white',
            fontSize: 20,
        };
        this.drawText(textOptions);
    }
    drawText({ text, position, color = 'black', fontSize = 16 }) {
        if (context2D) {
            context2D.font = `${fontSize}px Changa One`;
            context2D.fillStyle = color;
            context2D.fillText(text, position.x, position.y);
        }
    }
    updateDashboardEnemies() {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemyInfor, index) => {
            dashboardEnemyInfor.dashboardEnemyBorder.update();
            dashboardEnemyInfor.dashboardEnemy.draw({ behaviorKey: E_behaviors.RUN, angelKey: E_angels.ANGEL_90 });
            const textOptions = {
                text: dashboardEnemyInfor.remainEnemiesTotal.toString(),
                position: {
                    x: dashboardEnemyInfor.dashboardEnemyBorder.position.x + 25,
                    y: dashboardEnemyInfor.dashboardEnemyBorder.position.y - 5,
                },
                color: '#8B4513',
                fontSize: 20,
            };
            this.drawText(textOptions);
        });
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
            tower.update({ enemies: this._currentEnemiesData, shootingAudio: this.shootingAudio });
        });
    }
    updateEnemies() {
        if (this._currentEnemiesData.length <= 0) {
            if (this.currentRoundIndex < this.rounds.length - 1) {
                this.currentRoundIndex++;
                this.spawingCurrentRoundEnemies();
            }
        }
        for (let i = this._currentEnemiesData.length - 1; i >= 0; i--) {
            const currentEnemy = this._currentEnemiesData[i];
            if (currentEnemy.remainHealth <= 0) {
                //enemy dead
                const deathEnemyOptions = {
                    name: currentEnemy.name,
                    position: currentEnemy.position,
                    enemyType: currentEnemy.enemyType,
                    initFrames: currentEnemy.initFrames,
                    offset: currentEnemy.offset,
                    width: currentEnemy.width,
                    height: currentEnemy.height,
                    moveSpeed: currentEnemy.moveSpeed,
                    angelKey: currentEnemy.angelKey,
                    behaviorKey: E_behaviors.DEATH,
                };
                this.deathEffectEnemies.push(new Enemy(deathEnemyOptions));
                this._currentEnemiesData.splice(i, 1);
                this.subtractDashboardEnemies(currentEnemy);
                this.coins += currentEnemy.coins;
                continue;
            }
            //enemy reached target gold
            if (currentEnemy.position.x > POSITION_GOAL) {
                currentEnemy.behaviorKey = E_behaviors.ATTACK;
                currentEnemy.updateEnemyAttackGate({ gate: this.gate });
                continue;
            }
            currentEnemy.update(this.waypoints);
        }
        this.updateDeathEffectEnemies();
    }
    updateDeathEffectEnemies() {
        for (let i = this.deathEffectEnemies.length - 1; i >= 0; i--) {
            const currentDeathEffectEnemy = this.deathEffectEnemies[i];
            currentDeathEffectEnemy.updateDeathEffect();
            const currentDeathEffectEnemyFrame = this.deathEffectEnemies[i].currentFrame;
            // console.log('run in', currentDeathEffectEnemyFrame)
            if (!currentDeathEffectEnemyFrame) {
                this.deathEffectEnemies.splice(i, 1);
                continue;
            }
            const isFinishedOneTimeAnimation = currentDeathEffectEnemy.cropPosition.x === currentDeathEffectEnemyFrame.maxX - 1 &&
                currentDeathEffectEnemy.cropPosition.y === currentDeathEffectEnemyFrame.maxY - 1;
            if (isFinishedOneTimeAnimation) {
                this.deathEffectEnemies.splice(i, 1);
            }
        }
    }
    subtractDashboardEnemies(subtractEnemy) {
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
        const towerBaseProperties = getBaseTowerProperties(towerType);
        if (towerBaseProperties) {
            if (this.coins < towerBaseProperties.prices)
                return;
            this.coins -= towerBaseProperties.prices;
            const towerOptions = {
                name: towerBaseProperties.name,
                projectileType: towerBaseProperties.projectileInfo.projectileType,
                towerType: towerBaseProperties.towerType,
                position: (_a = this.activeTile) === null || _a === void 0 ? void 0 : _a.position,
                offset: towerBaseProperties.offset,
                width: towerBaseProperties.width,
                height: towerBaseProperties.height,
                initFrames: towerBaseProperties.initFrames,
                attackSpeed: towerBaseProperties.attackSpeed,
                attackRange: towerBaseProperties.attackRange,
                damage: towerBaseProperties.damage,
            };
            const tower = new Tower(towerOptions);
            this.towers.push(tower);
            this.activeTile.isOccupied = true;
        }
    }
    spawingCurrentRoundEnemies() {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = [];
        }
        this.currentDashboardEnemiesInfo = [];
        const currentRound = this.rounds[this.currentRoundIndex];
        currentRound.enemies.forEach((enemyInfo, index) => {
            const baseEnemyProperty = getBaseEnemyProperties(enemyInfo.enemyType);
            if (baseEnemyProperty) {
                //create dashboard enemies and its border
                const dashboardEnemy = this.createDashboardEnemy(enemyInfo, baseEnemyProperty, index);
                const dashboardEnemyBorderOptions = {
                    name: baseEnemyProperty.dashboardBorderInfo.name,
                    position: { x: 64 * index, y: 64 },
                    initFrames: baseEnemyProperty.dashboardBorderInfo.initFrames,
                    offset: baseEnemyProperty.dashboardBorderInfo.offset,
                    width: baseEnemyProperty.dashboardBorderInfo.width,
                    height: baseEnemyProperty.dashboardBorderInfo.height,
                };
                const dashboardEnemyBorder = new Border(dashboardEnemyBorderOptions);
                this.currentDashboardEnemiesInfo.push({
                    enemyType: enemyInfo.enemyType,
                    dashboardEnemy,
                    dashboardEnemyBorder,
                    remainEnemiesTotal: enemyInfo.amount,
                });
                //create battle enemies
                for (let i = 0; i < enemyInfo.amount; i++) {
                    const battleEnemy = this.createBattleEnemy(enemyInfo, baseEnemyProperty, i);
                    this._currentEnemiesData.push(battleEnemy);
                }
            }
        });
    }
    createBattleEnemy(enemyInfo, baseEnemyProperty, index) {
        const space = randomNumberInRange(enemyInfo.spaceMin, enemyInfo.spaceMax);
        const randomNum = index === 0 ? 0 : randomNumberInRange(6, 10);
        const position = { x: enemyInfo.basePosition.x - space * randomNum, y: enemyInfo.basePosition.y };
        const battleEnemyOptions = {
            name: baseEnemyProperty.name,
            enemyType: enemyInfo.enemyType,
            position,
            offset: baseEnemyProperty.offset,
            initFrames: baseEnemyProperty.initFrames,
            width: baseEnemyProperty.width,
            height: baseEnemyProperty.height,
            moveSpeed: enemyInfo.moveSpeed,
            coins: enemyInfo.coins,
            health: enemyInfo.health,
        };
        return new Enemy(battleEnemyOptions);
    }
    createDashboardEnemy(enemyInfo, baseEnemyProperty, index) {
        const enemyOptions = {
            name: baseEnemyProperty.name,
            enemyType: enemyInfo.enemyType,
            position: { x: 64 * index, y: 64 },
            offset: { x: 14, y: 16 },
            initFrames: baseEnemyProperty.initFrames,
            width: 90,
            height: 90,
            moveSpeed: enemyInfo.moveSpeed,
        };
        return new Enemy(enemyOptions);
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
