import Shovel from '../../classes/stuff/Shovel.js';
import BloodMoon from '../../classes/tower/BloodMoon.js';
import FlyingObelisk from '../../classes/tower/FlyingObelisk.js';
import ObeliskThunder from '../../classes/tower/ObeliskThunder.js';
import { BLUE_GEM_POSITION, GATE_POSITION_X, RED_GEM_POSITION, TILE_SIZE, YELLOW_GEM_POSITION, } from '../../constants/index.js';
import context2D, { canvas, resetCanvas } from '../../context2D/index.js';
import getBaseEnemyProperties from '../../data/baseProperties/enemies/index.js';
import gatesBaseProperties from '../../data/baseProperties/gates/index.js';
import { E_angels, E_behaviors, E_characterActions, E_characters, E_gate, E_gems } from '../../enum/index.js';
import { createFrames, drawText, randomNumberInRange } from '../../helper/index.js';
import Border from '../dashboardBorder/index.js';
import DashboardCharacter from '../dashboardCharacters/index.js';
import Enemy from '../enemy/index.js';
import DestroyExplosion from '../explosionProjectile/Destroy.js';
import Gate from '../gate/index.js';
import PlacementTile from '../placementTile/index.js';
import AutumnTree from '../plant/AutumnTree.js';
import GreenTree from '../plant/GreenTree.js';
import MonsterraTree from '../plant/MonsterraTree.js';
import Sprite from '../sprite/index.js';
export default class GameMap {
    constructor({ rounds, placementTiles2D, waypoints, backgroundImage, startGems, initDashboardCharacterInfo, gateInfor, }) {
        this._currentEnemiesData = [];
        this.rounds = rounds;
        this.waypoints = waypoints;
        this.backgroundImage = backgroundImage;
        this.currentRoundIndex = 0;
        this.placementTiles = this.getPlacementTiles(placementTiles2D);
        this.shootingAudio = document.getElementById('shooting');
        this.towers = [];
        this.plants = [];
        this.gemsInfo = this.createGemInfo(startGems);
        this.currentDashboardEnemiesInfo = [];
        this.menu = this.createMenu();
        this.displayRound = this.createDisplayRound();
        this._mouseOverTile = null;
        this.mouseOverDashboardCharacter = null;
        this.activeDashboardCharacter = null;
        this.deathEffectEnemies = [];
        this.gateInfor = gateInfor;
        this.activeMouseOverCharacterInfo = null;
        this.dashboardCharacters = this.createDashboardCharacters(initDashboardCharacterInfo);
        this.gate = this.createGate();
        this.gameExplosions = [];
        this.currentRound = 1;
        this.baseIncreasedStrengthEnemies = {
            health: 500,
            damage: 100,
            moveSpeed: 0.05,
            attackSpeed: 0.05,
        };
        this.spawingCurrentRoundEnemies();
        this.mousePosition = { x: 0, y: 0 };
        this.handleAddEventGame();
    }
    //get set place
    get mouseOverTile() {
        return this._mouseOverTile;
    }
    get currentEnemiesData() {
        return this._currentEnemiesData;
    }
    get isDestroyStatus() {
        return (this.activeDashboardCharacter !== null &&
            this.activeDashboardCharacter.action === E_characterActions.DESTROY);
    }
    get isThereObjectToDestroy() {
        return this.towers.length > 0 || this.plants.length > 0;
    }
    //update and draw function place
    updateMap() {
        resetCanvas();
        this.updateScreenGame();
        this.updatePlacementTiles();
        this.updatePlants();
        this.updateTowers();
        this.updateEnemies();
        this.updateDashboardEnemies();
        this.updateDashboardCharacters();
        this.drawGemsAndMenu();
        this.updateGate();
        this.updateDashboardShadow();
        this.updateGameExplosions();
        return this.getGameStatus();
    }
    updatePlants() {
        this.plants.forEach((plant) => {
            const gem = plant.update();
            this.gemsInfo[gem.type].value += gem.value;
        });
    }
    updateGameExplosions() {
        for (let i = this.gameExplosions.length - 1; i >= 0; i--) {
            const currentExplosion = this.gameExplosions[i];
            currentExplosion.update();
            if (currentExplosion.hasFinishedAnimation) {
                this.gameExplosions.splice(i, 1);
            }
        }
    }
    updateDashboardShadow() {
        var _a;
        const currentDashboardShadow = (_a = this.activeDashboardCharacter) === null || _a === void 0 ? void 0 : _a.dashboardShadow;
        if (!currentDashboardShadow || this.mouseOverDashboardCharacter) {
            if (canvas)
                canvas.style.cursor = 'pointer';
            return;
        }
        if (canvas)
            canvas.style.cursor = 'grab';
        currentDashboardShadow.update();
    }
    updateDashboardShadowPosition() {
        var _a;
        if ((_a = this.activeDashboardCharacter) === null || _a === void 0 ? void 0 : _a.dashboardShadow) {
            this.activeDashboardCharacter.dashboardShadow.position = {
                x: this.mousePosition.x,
                y: this.mousePosition.y - this.activeDashboardCharacter.dashboardShadow.offset.y / 2,
            };
        }
    }
    updateGate() {
        if (this.gate) {
            this.gate.update({ enemies: this.currentEnemiesData });
        }
    }
    updateDashboardCharacters() {
        this.dashboardCharacters.map((dashboardCharacterInfo) => {
            const gemsToBuildCharacter = this.gemsToBuildCharacter(dashboardCharacterInfo.type);
            let opacity = 1;
            const isThereNoObjectToDestroy = dashboardCharacterInfo.dashboardCharacter.action === E_characterActions.DESTROY &&
                !this.isThereObjectToDestroy;
            if (!this.hasEnoughGems(dashboardCharacterInfo.type) || isThereNoObjectToDestroy) {
                opacity = 0.4;
            }
            dashboardCharacterInfo.border.opacity = opacity;
            dashboardCharacterInfo.border.update();
            if (dashboardCharacterInfo.dashboardCharacter === this.activeDashboardCharacter) {
                dashboardCharacterInfo.border.updateSelected();
            }
            dashboardCharacterInfo.dashboardCharacter.opacity = opacity;
            dashboardCharacterInfo.dashboardCharacter.update();
            if (gemsToBuildCharacter !== undefined && context2D) {
                const textString = gemsToBuildCharacter.toString();
                const textWidth = context2D.measureText(textString).width;
                const textOptions = {
                    text: textString,
                    position: {
                        x: dashboardCharacterInfo.border.position.x +
                            dashboardCharacterInfo.border.width / 2 -
                            textWidth / 2,
                        y: dashboardCharacterInfo.border.position.y - dashboardCharacterInfo.border.height,
                    },
                    color: '#250806',
                    fontSize: 20,
                };
                drawText(textOptions);
            }
        });
    }
    updateScreenGame() {
        this.createBackground();
    }
    updateDashboardEnemies() {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemyInfor, index) => {
            var _a;
            dashboardEnemyInfor.dashboardEnemyBorder.update();
            dashboardEnemyInfor.dashboardEnemy.draw({ behaviorKey: E_behaviors.RUN, angelKey: E_angels.ANGEL_90 });
            const textString = dashboardEnemyInfor.remainEnemiesTotal.toString();
            const textWidth = (_a = context2D === null || context2D === void 0 ? void 0 : context2D.measureText(textString).width) !== null && _a !== void 0 ? _a : 2;
            const textOptions = {
                text: textString,
                position: {
                    x: dashboardEnemyInfor.dashboardEnemyBorder.position.x +
                        dashboardEnemyInfor.dashboardEnemyBorder.width / 2 -
                        textWidth / 2,
                    y: dashboardEnemyInfor.dashboardEnemyBorder.position.y - 5,
                },
                color: '#8B4513',
                fontSize: 20,
            };
            drawText(textOptions);
        });
    }
    updatePlacementTiles() {
        this.placementTiles.forEach((placementTile) => {
            placementTile.update(this.activeDashboardCharacter, this.mousePosition);
        });
    }
    updateTowers() {
        this.towers.forEach((tower) => {
            tower.update({ enemies: this.currentEnemiesData, shootingAudio: this.shootingAudio });
        });
    }
    updateEnemies() {
        if (this._currentEnemiesData.length <= 0) {
            // if (this.currentRoundIndex < this.rounds.length - 1) {
            this.currentRound++;
            // this.currentRoundIndex++
            this.spawingCurrentRoundEnemies();
            // }
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
                this.gemsInfo[E_gems.BLUE].value += currentEnemy.coins;
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
    drawGemsAndMenu() {
        this.menu.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
        this.drawGems();
        this.drawDisplayRound();
    }
    drawDisplayRound() {
        var _a;
        this.displayRound.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
        const textString = `Round  ${this.currentRound.toString()}`;
        const textWidth = (_a = context2D === null || context2D === void 0 ? void 0 : context2D.measureText(textString).width) !== null && _a !== void 0 ? _a : 10;
        drawText({
            text: textString,
            color: 'white',
            fontSize: 14,
            position: {
                x: this.displayRound.position.x + this.displayRound.width / 2 - textWidth / 3,
                y: this.displayRound.position.y - this.displayRound.height / 2 + 4,
            },
        });
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
            attackSpeed: this.gateInfor.attackSpeed,
            attackRange: this.gateInfor.attackRange,
            damage: this.gateInfor.damage,
            health: this.gateInfor.health,
        };
        return new Gate(gateOptions);
    }
    createDashboardCharacters(initDashboardCharacterInfo) {
        const dashboardCharacters = [];
        initDashboardCharacterInfo.forEach((dashboardCharacter) => {
            const characterOptions = {
                type: dashboardCharacter.type,
                position: dashboardCharacter.position,
                offset: dashboardCharacter.offset,
                width: dashboardCharacter.width,
                height: dashboardCharacter.height,
            };
            const borderOptions = {
                name: dashboardCharacter.dashboardBorderInfo.name,
                position: dashboardCharacter.dashboardBorderInfo.position,
                initFrames: dashboardCharacter.dashboardBorderInfo.initFrames,
                offset: dashboardCharacter.dashboardBorderInfo.offset,
                width: dashboardCharacter.dashboardBorderInfo.width,
                height: dashboardCharacter.dashboardBorderInfo.height,
            };
            const newDashboardCharacter = new DashboardCharacter(characterOptions);
            const newBorder = new Border(borderOptions);
            dashboardCharacters.push({
                dashboardCharacter: newDashboardCharacter,
                border: newBorder,
                type: dashboardCharacter.type,
            });
        });
        return dashboardCharacters;
    }
    createGemInfo(gems) {
        const blueGemIcon = this.createGemIcon({
            gemSourceImage: '../../public/src/assets/images/gems/blue.png',
            offset: { x: 0, y: 0 },
            position: BLUE_GEM_POSITION,
        });
        const redGemIcon = this.createGemIcon({
            gemSourceImage: '../../public/src/assets/images/gems/red.png',
            offset: { x: 0, y: 0 },
            position: RED_GEM_POSITION,
        });
        const yellowGemIcon = this.createGemIcon({
            gemSourceImage: '../../public/src/assets/images/gems/purple.png',
            offset: { x: 0, y: 0 },
            position: YELLOW_GEM_POSITION,
        });
        return {
            [E_gems.BLUE]: { value: gems.blueGems, icon: blueGemIcon },
            [E_gems.RED]: { value: gems.redGems, icon: redGemIcon },
            [E_gems.PURPLE]: { value: gems.yellowGems, icon: yellowGemIcon },
        };
    }
    drawGems() {
        const keys = Object.keys(this.gemsInfo);
        keys.forEach((key) => {
            this.gemsInfo[key].icon.draw({ behaviorKey: E_behaviors.IDLE, angelKey: E_angels.ANGEL_0 });
            const textString = this.gemsInfo[key].value.toString();
            const textOptions = {
                text: textString,
                position: {
                    x: this.gemsInfo[key].icon.position.x + 50,
                    y: this.gemsInfo[key].icon.position.y - 18,
                },
                color: 'white',
                fontSize: 20,
            };
            drawText(textOptions);
        });
    }
    //create function place
    createMenu() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
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
            position: { x: 64 * 15, y: 64 * 1 },
            offset: { x: 20, y: 26 },
            height: 120,
            width: 360,
        };
        return new Sprite(options);
    }
    createDisplayRound() {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: '../../public/src/assets/images/stuff/display-round.png',
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: { x: 64 * 9, y: 64 * 1 },
            offset: { x: 0, y: 0 },
            height: 64,
            width: 128,
        };
        return new Sprite(options);
    }
    createGemIcon({ gemSourceImage, offset, position, }) {
        const initFrames = {
            [E_behaviors.IDLE]: {
                [E_angels.ANGEL_0]: {
                    imageSourceString: gemSourceImage,
                    maxX: 1,
                    maxY: 1,
                    holdTime: 4,
                },
            },
        };
        const frames = createFrames({ initFrames });
        const options = {
            frames,
            position: position,
            offset,
            height: 48,
            width: 48,
        };
        return new Sprite(options);
    }
    getGameStatus() {
        const isGameOver = this.gate.remainHealth === 0;
        // const isVictory = this._currentEnemiesData.length <= 0 && this.currentRoundIndex >= this.rounds.length - 1
        // return [isGameOver, isVictory]
        return [isGameOver, false];
    }
    createBackground() {
        if (context2D)
            context2D.drawImage(this.backgroundImage, 0, 0);
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    spawingCurrentRoundEnemies() {
        if (this.rounds.length <= 0) {
            this._currentEnemiesData = [];
        }
        this.currentDashboardEnemiesInfo = [];
        const currentRound = this.rounds[0];
        this.shuffleArray(currentRound.enemies);
        currentRound.enemies.slice(0, 8).forEach((enemyInfo, index) => {
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
                const minEnemies = 1 + this.currentRound > 15 ? 15 : 1 + this.currentRound;
                const maxEnemies = this.currentRound * 1 + 10 > 30 ? 30 : this.currentRound * 1 + 10;
                const enemies = parseInt(randomNumberInRange(minEnemies, maxEnemies).toString());
                const dashboardEnemyBorder = new Border(dashboardEnemyBorderOptions);
                this.currentDashboardEnemiesInfo.push({
                    enemyType: enemyInfo.enemyType,
                    dashboardEnemy,
                    dashboardEnemyBorder,
                    remainEnemiesTotal: enemies,
                });
                //create battle enemies
                for (let i = 0; i < enemies; i++) {
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
            moveSpeed: enemyInfo.moveSpeed + this.baseIncreasedStrengthEnemies.moveSpeed * this.currentRound,
            attackSpeed: enemyInfo.attackSpeed + this.baseIncreasedStrengthEnemies.attackSpeed * this.currentRound,
            damage: enemyInfo.damage + this.baseIncreasedStrengthEnemies.damage * this.currentRound,
            coins: enemyInfo.coins,
            health: enemyInfo.health + this.baseIncreasedStrengthEnemies.health * this.currentRound,
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
    handleCharacterAction() {
        if (!this.activeDashboardCharacter)
            return;
        const isDestroyAction = this.activeDashboardCharacter.action === E_characterActions.DESTROY;
        if (!this.mouseOverTile || (!isDestroyAction && this.mouseOverTile.isOccupied))
            return;
        const gemsToBuildCharacter = this.gemsToBuildCharacter(this.activeDashboardCharacter.type);
        if (gemsToBuildCharacter === undefined || this.gemsInfo[E_gems.BLUE].value < gemsToBuildCharacter)
            return;
        const options = {
            position: this.mouseOverTile.position,
            placementTile: this.mouseOverTile,
        };
        let isActionSuccess = false;
        switch (this.activeDashboardCharacter.action) {
            case E_characterActions.ATTACK:
                isActionSuccess = this.handleBuildTowers({ options, type: this.activeDashboardCharacter.type });
                break;
            case E_characterActions.PLANTED:
                isActionSuccess = this.handleBuildPlants({ options, type: this.activeDashboardCharacter.type });
                break;
            case E_characterActions.DESTROY:
                this.handleDestroyStuff();
                break;
        }
        if (isActionSuccess) {
            this.gemsInfo[E_gems.BLUE].value -= gemsToBuildCharacter;
            this.mouseOverTile.isOccupied = true;
        }
        if (!this.activeDashboardCharacter || !this.hasEnoughGems(this.activeDashboardCharacter.type)) {
            this.activeDashboardCharacter = null;
            if (canvas)
                canvas.style.cursor = 'pointer';
        }
    }
    handleBuildTowers({ options, type, }) {
        let isSuccess = true;
        switch (type) {
            case E_characters.BLOOD_MOON:
                this.towers.push(new BloodMoon(options));
                break;
            case E_characters.FLYING_OBELISK:
                this.towers.push(new FlyingObelisk(options));
                break;
            case E_characters.OBELISK_THUNDER:
                this.towers.push(new ObeliskThunder(options));
                break;
            default:
                isSuccess = false;
                break;
        }
        if (isSuccess)
            this.towers.sort((a, b) => a.position.y - b.position.y);
        return isSuccess;
    }
    handleBuildPlants({ options, type, }) {
        let isSuccess = true;
        switch (type) {
            case E_characters.GREEN_TREE:
                this.plants.push(new GreenTree(options));
                break;
            case E_characters.MONSTERRA_TREE:
                this.plants.push(new MonsterraTree(options));
                break;
            case E_characters.AUTUMN_TREE:
                this.plants.push(new AutumnTree(options));
                break;
            default:
                isSuccess = false;
                break;
        }
        if (isSuccess)
            this.plants.sort((a, b) => a.position.y - b.position.y);
        return isSuccess;
    }
    handleDestroyStuff() {
        if (!this.activeMouseOverCharacterInfo)
            return;
        if (this.activeMouseOverCharacterInfo.action === E_characterActions.ATTACK) {
            for (let i = this.towers.length - 1; i >= 0; i--) {
                let currentCharacter = this.towers[i];
                if (currentCharacter === this.activeMouseOverCharacterInfo.activeMouseOverCharacter) {
                    if (currentCharacter.placementTile) {
                        currentCharacter.placementTile.isOccupied = false;
                    }
                    const destroyExplosion = new DestroyExplosion({
                        position: {
                            x: currentCharacter.position.x + currentCharacter.width / 2,
                            y: currentCharacter.position.y + currentCharacter.height / 2,
                        },
                    });
                    this.gameExplosions.push(destroyExplosion);
                    this.towers.splice(i, 1);
                }
            }
            return;
        }
        if (this.activeMouseOverCharacterInfo.action === E_characterActions.PLANTED) {
            for (let i = this.plants.length - 1; i >= 0; i--) {
                let currentCharacter = this.plants[i];
                if (currentCharacter === this.activeMouseOverCharacterInfo.activeMouseOverCharacter) {
                    if (currentCharacter.placementTile) {
                        currentCharacter.placementTile.isOccupied = false;
                    }
                    const destroyExplosion = new DestroyExplosion({
                        position: {
                            x: currentCharacter.position.x + currentCharacter.width / 2,
                            y: currentCharacter.position.y + currentCharacter.height,
                        },
                    });
                    this.gameExplosions.push(destroyExplosion);
                    this.plants.splice(i, 1);
                }
            }
            return;
        }
    }
    //check to do something function place
    checkHavestGems() {
        this.plants.forEach((plant) => {
            for (let i = plant.gems.length - 1; i >= 0; i--) {
                const currentGem = plant.gems[i];
                if (currentGem.hasCollision(this.mousePosition)) {
                    currentGem.harvestGem();
                }
            }
        });
    }
    checkMouseOverTile() {
        var _a, _b;
        if (!((_a = this.activeDashboardCharacter) === null || _a === void 0 ? void 0 : _a.dashboardShadow)) {
            this._mouseOverTile = null;
        }
        else {
            const dashboardShadow = this.activeDashboardCharacter.dashboardShadow;
            this._mouseOverTile = (_b = this.placementTiles.find((tile) => tile.hasCollision(this.mousePosition))) !== null && _b !== void 0 ? _b : null;
        }
    }
    checkToHandleBuildCharacter() {
        var _a, _b;
        //click ouside can plant character and select character in dashboard
        const isDestroyAction = ((_a = this.mouseOverDashboardCharacter) === null || _a === void 0 ? void 0 : _a.action) === E_characterActions.DESTROY;
        if (!this.mouseOverTile &&
            !this.mouseOverDashboardCharacter &&
            !isDestroyAction &&
            !this.activeMouseOverCharacterInfo) {
            this.activeDashboardCharacter = null;
            if (canvas)
                canvas.style.cursor = 'pointer';
            return;
        }
        //click destroy shovel
        if (isDestroyAction && !this.isThereObjectToDestroy)
            return;
        //click into dashboard character
        if (this.hasEnoughGems((_b = this.mouseOverDashboardCharacter) === null || _b === void 0 ? void 0 : _b.type) &&
            this.activeDashboardCharacter !== this.mouseOverDashboardCharacter) {
            this.activeDashboardCharacter = this.mouseOverDashboardCharacter;
            if (canvas)
                canvas.style.cursor = 'grab';
            return;
        }
        //just click outside and not destroying something
        if (!this.mouseOverTile &&
            this.activeDashboardCharacter &&
            !isDestroyAction &&
            !this.activeMouseOverCharacterInfo) {
            this.activeDashboardCharacter = null;
            if (canvas)
                canvas.style.cursor = 'pointer';
            return;
        }
        //already selected character then we build character
        if (this.mouseOverTile && this.activeDashboardCharacter) {
            this.handleCharacterAction();
        }
    }
    checkMouseOverDashboardCharacters() {
        var _a, _b;
        this.mouseOverDashboardCharacter =
            (_b = (_a = this.dashboardCharacters.find((dashboardCharacterInfo) => dashboardCharacterInfo.dashboardCharacter.hasCollisionWithMouse(this.mousePosition))) === null || _a === void 0 ? void 0 : _a.dashboardCharacter) !== null && _b !== void 0 ? _b : null;
    }
    checkMouseOverCharacter() {
        if (this.activeDashboardCharacter === null)
            return;
        const allCurrentCharacters = [...this.towers, ...this.plants];
        this.activeMouseOverCharacterInfo = this.handleFindDestroyCharacterInfo(allCurrentCharacters, this.mousePosition);
    }
    //calculate function place
    handleFindDestroyCharacterInfo(characters, mouse) {
        var _a;
        let activeMouseOverCharacterInfo = null;
        for (let i = 0; i < characters.length; i++) {
            if (characters[i].placementTile.hasCollision(mouse)) {
                activeMouseOverCharacterInfo = {
                    action: characters[i].action,
                    activeMouseOverCharacter: characters[i],
                };
                if (((_a = this.activeDashboardCharacter) === null || _a === void 0 ? void 0 : _a.action) === E_characterActions.DESTROY) {
                    characters[i].opacity = 0.4;
                }
            }
            else {
                characters[i].opacity = 1;
            }
        }
        return activeMouseOverCharacterInfo;
    }
    hasEnoughGems(type) {
        if (type === undefined)
            return false;
        switch (type) {
            case E_characters.BLOOD_MOON:
                return BloodMoon.prices <= this.gemsInfo[E_gems.BLUE].value;
            case E_characters.FLYING_OBELISK:
                return FlyingObelisk.prices <= this.gemsInfo[E_gems.BLUE].value;
            case E_characters.OBELISK_THUNDER:
                return ObeliskThunder.prices <= this.gemsInfo[E_gems.BLUE].value;
            case E_characters.GREEN_TREE:
                return GreenTree.prices <= this.gemsInfo[E_gems.BLUE].value;
            case E_characters.MONSTERRA_TREE:
                return MonsterraTree.prices <= this.gemsInfo[E_gems.BLUE].value;
            case E_characters.AUTUMN_TREE:
                return AutumnTree.prices <= this.gemsInfo[E_gems.BLUE].value;
            case E_characters.SHOVEL:
                return Shovel.prices <= this.gemsInfo[E_gems.BLUE].value;
            default:
                return false;
        }
    }
    gemsToBuildCharacter(type) {
        switch (type) {
            case E_characters.BLOOD_MOON:
                return BloodMoon.prices;
            case E_characters.FLYING_OBELISK:
                return FlyingObelisk.prices;
            case E_characters.OBELISK_THUNDER:
                return ObeliskThunder.prices;
            case E_characters.GREEN_TREE:
                return GreenTree.prices;
            case E_characters.MONSTERRA_TREE:
                return MonsterraTree.prices;
            case E_characters.AUTUMN_TREE:
                return AutumnTree.prices;
            case E_characters.SHOVEL:
                return Shovel.prices;
        }
    }
    subtractDashboardEnemies(subtractEnemy) {
        this.currentDashboardEnemiesInfo.forEach((dashboardEnemy) => {
            if (dashboardEnemy.enemyType === subtractEnemy.enemyType) {
                dashboardEnemy.remainEnemiesTotal--;
            }
        });
    }
    getPlacementTiles(placementTiles2D) {
        const placementTiles = [];
        placementTiles2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 1) {
                    placementTiles.push(new PlacementTile({ position: { x: x * TILE_SIZE, y: y * TILE_SIZE } }));
                }
            });
        });
        return placementTiles;
    }
    handleAddEventGame() {
        if (canvas) {
            canvas.addEventListener('mousemove', (event) => {
                this.mousePosition.x = event.offsetX;
                this.mousePosition.y = event.offsetY;
                this.checkMouseOverCharacter();
                this.checkMouseOverTile();
                this.checkMouseOverDashboardCharacters();
                this.updateDashboardShadowPosition();
            });
            canvas.addEventListener('click', () => {
                this.checkHavestGems();
                this.checkToHandleBuildCharacter();
            });
        }
    }
}
