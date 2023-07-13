import { GATE_POSITION_X, TILE_SIZE } from '../../constants/index.js';
import context2D from '../../context2D/index.js';
import getBaseEnemyProperties from '../../data/baseProperties/enemies/index.js';
import gatesBaseProperties from '../../data/baseProperties/gates/index.js';
import getBaseTowerProperties from '../../data/baseProperties/towers/index.js';
import { E_angels, E_behaviors, E_gate } from '../../enum/index.js';
import { randomNumberInRange } from '../../helper/index.js';
import Border from '../dashboardEnemyBorder/index.js';
import Enemy from '../enemy/index.js';
import Gate from '../gate/index.js';
import PlacementTile from '../placementTile/index.js';
import Tower from '../tower/index.js';
export default class GameMap {
    constructor({ rounds, placementTiles2D, waypoints, backgroundImage, startCoins, initDashboardTowerInfo, }) {
        this._currentEnemiesData = [];
        this.rounds = rounds;
        this.waypoints = waypoints;
        this.backgroundImage = backgroundImage;
        this.currentRoundIndex = 0;
        this.placementTiles = this.getPlacementTiles(placementTiles2D);
        this.shootingAudio = document.getElementById('shooting');
        this.towers = [];
        this.coins = startCoins;
        this.currentDashboardEnemiesInfo = [];
        // this.menu = this.createMenu()
        // this.coinsIcon = this.createCoinsIcon()
        // this.heartIcon = this.createHeartIcon()
        // this.effect = this.createEffec()
        this._mouseOverTile = null;
        this.mouseOverDashboardTower = null;
        this.activeDashboardTower = null;
        this.deathEffectEnemies = [];
        this.activeDashboardTowerShadow = null;
        // this.isVictory = false
        this.dashboardTowers = this.createDashboardTowers(initDashboardTowerInfo);
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
    createDashboardTowerShadow() { }
    createDashboardTowers(initDashboardTowerInfo) {
        const dashboardTowers = [];
        initDashboardTowerInfo.forEach((dashboardTower) => {
            const baseTowerProperties = getBaseTowerProperties(dashboardTower.towerType);
            const towerOptions = {
                name: dashboardTower.name,
                towerType: dashboardTower.towerType,
                initFrames: baseTowerProperties.initFrames,
                position: dashboardTower.position,
                offset: dashboardTower.offset,
                width: dashboardTower.width,
                height: dashboardTower.height,
                projectileType: baseTowerProperties.projectileInfo[E_behaviors.ATTACK].projectileType,
            };
            const borderOptions = {
                name: dashboardTower.dashboardBorderInfo.name,
                position: dashboardTower.dashboardBorderInfo.position,
                initFrames: dashboardTower.dashboardBorderInfo.initFrames,
                offset: dashboardTower.dashboardBorderInfo.offset,
                width: dashboardTower.dashboardBorderInfo.width,
                height: dashboardTower.dashboardBorderInfo.height,
            };
            const newDashboardTower = new Tower(towerOptions);
            const newBorder = new Border(borderOptions);
            dashboardTowers.push({ dashboardTower: newDashboardTower, border: newBorder });
        });
        return dashboardTowers;
    }
    updateMap() {
        this.updateScreenGame();
        this.updateEnemies();
        this.updatePlacementTiles();
        this.updateTowers();
        this.updateDashboardEnemies();
        this.updateDashboardTowers();
        // this.drawCoinsAndGameHearts()
        this.updateGate();
        this.updateDashboardTowerShadow();
        return this.getGameStatus();
    }
    updateDashboardTowerShadow() {
        if (this.activeDashboardTowerShadow) {
            this.activeDashboardTowerShadow.draw();
        }
    }
    getGameStatus() {
        const isGameOver = this.gate.remainHealth === 0;
        const isVictory = this._currentEnemiesData.length <= 0 && this.currentRoundIndex >= this.rounds.length - 1;
        return [isGameOver, isVictory];
    }
    updateGate() {
        if (this.gate) {
            this.gate.update({ enemies: this.currentEnemiesData });
        }
    }
    // private createMenu() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/layout_target.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 17, y: 64 * 1 },
    //         offset: { x: 10, y: 26 },
    //         height: 120,
    //         width: 230,
    //     }
    //     return new Sprite(options)
    // }
    // private createCoinsIcon() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/coins.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 17, y: 64 * 1 },
    //         offset: { x: 4, y: -12 },
    //         height: 40,
    //         width: 40,
    //     }
    //     return new Sprite(options)
    // }
    // private createHeartIcon() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/screen/heart.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 19, y: 64 * 1 },
    //         offset: { x: 40, y: -14 },
    //         height: 34,
    //         width: 34,
    //     }
    //     return new Sprite(options)
    // }
    // private createEffec() {
    //     const initFrames: T_initFramesDictionary = {
    //         [E_behaviors.IDLE]: {
    //             [E_angels.ANGEL_0]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_290]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_90]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //             [E_angels.ANGEL_180]: {
    //                 imageSourceString: '../../public/src/assets/images/effect/7_firespin_spritesheet.png',
    //                 maxX: 1,
    //                 maxY: 1,
    //                 holdTime: 4,
    //             },
    //         },
    //     }
    //     const frames = createFrames({ initFrames })
    //     const options: T_sprite = {
    //         frames,
    //         position: { x: 64 * 16, y: 64 * 6 },
    //         offset: { x: -20, y: -30 },
    //         height: 400,
    //         width: 400,
    //     }
    //     return new Sprite(options)
    // }
    updateDashboardTowers() {
        this.dashboardTowers.map((dashboardTowerInfo) => {
            if (dashboardTowerInfo.dashboardTower === this.activeDashboardTower) {
                dashboardTowerInfo.border.updateSelected();
            }
            else {
                dashboardTowerInfo.border.update();
            }
            dashboardTowerInfo.dashboardTower.draw();
        });
        //   this.currentDashboardEnemiesInfo.forEach((dashboardEnemyInfor, index) => {
        //       dashboardEnemyInfor.dashboardEnemyBorder.update()
        //       dashboardEnemyInfor.dashboardEnemy.draw({ behaviorKey: E_behaviors.RUN, angelKey: E_angels.ANGEL_90 })
        //       const textOptions: T_text = {
        //           text: dashboardEnemyInfor.remainEnemiesTotal.toString(),
        //           position: {
        //               x: dashboardEnemyInfor.dashboardEnemyBorder.position.x + 25,
        //               y: dashboardEnemyInfor.dashboardEnemyBorder.position.y - 5,
        //           },
        //           color: '#8B4513',
        //           fontSize: 20,
        //       }
        //       this.drawText(textOptions)
        //   })
    }
    get mouseOverTile() {
        return this._mouseOverTile;
    }
    updateScreenGame() {
        this.createBackground();
    }
    createBackground() {
        if (context2D)
            context2D.drawImage(this.backgroundImage, 0, 0);
    }
    // private drawCoinsAndGameHearts(): void {
    //     this.menu.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    //     this.drawCoins()
    //     // this.drawHearts()
    // }
    // private drawCoins() {
    //     this.coinsIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    //     const textOptions: T_text = {
    //         text: this.coins.toString(),
    //         position: { x: this.coinsIcon.position.x + 46, y: this.coinsIcon.position.y - 26 },
    //         color: 'white',
    //         fontSize: 20,
    //     }
    //     this.drawText(textOptions)
    // }
    // private drawHearts() {
    //     this.heartIcon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 })
    //     const textOptions: T_text = {
    //         text: this.limitAttacks.toString(),
    //         position: { x: this.heartIcon.position.x, y: this.heartIcon.position.y - 26 },
    //         color: 'white',
    //         fontSize: 20,
    //     }
    //     this.drawText(textOptions)
    // }
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
    updatePlacementTiles() {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(this.activeDashboardTower);
        });
    }
    updateTowers() {
        this.towers.forEach((tower) => {
            tower.update({ enemies: this.currentEnemiesData, shootingAudio: this.shootingAudio });
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
            //enemy reached gate postion then start hit it
            if (currentEnemy.position.x >= GATE_POSITION_X) {
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
    addTower() {
        var _a;
        if (!this.mouseOverTile)
            return;
        if (!this.activeDashboardTower)
            return;
        const towerBaseProperties = getBaseTowerProperties(this.activeDashboardTower.towerType);
        if (this.coins < towerBaseProperties.prices)
            return;
        this.coins -= towerBaseProperties.prices;
        const towerOptions = {
            name: towerBaseProperties.name,
            projectileType: towerBaseProperties.projectileInfo[E_behaviors.ATTACK].projectileType,
            towerType: towerBaseProperties.towerType,
            position: (_a = this.mouseOverTile) === null || _a === void 0 ? void 0 : _a.position,
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
        this.towers.sort((a, b) => a.position.y - b.position.y);
        this.mouseOverTile.isOccupied = true;
        this.activeDashboardTower = null;
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
    checkMouseOverTile({ mouse }) {
        var _a;
        this._mouseOverTile = (_a = this.placementTiles.find((tile) => tile.hasCollisionWithMouse(mouse))) !== null && _a !== void 0 ? _a : null;
    }
    checkMouseOverDashboardTower({ mouse }) {
        var _a, _b;
        this.mouseOverDashboardTower =
            (_b = (_a = this.dashboardTowers.find((dashboardTowerInfo) => dashboardTowerInfo.dashboardTower.hasCollisionWithMouse(mouse))) === null || _a === void 0 ? void 0 : _a.dashboardTower) !== null && _b !== void 0 ? _b : null;
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
