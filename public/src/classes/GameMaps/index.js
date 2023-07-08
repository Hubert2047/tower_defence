export default class GameMap {
    constructor({ rounds }) {
        this.enemiesData = [];
        this.rounds = rounds;
        this.currentRound = 0;
        this.initCurrentRoundEnemies();
    }
    initCurrentRoundEnemies() {
        if (this.rounds.length <= 0) {
            this.enemiesData = [];
        }
    }
}
