import BaseScene from "./BaseScene";
import Unit from "../models/unit";
import Base from "../models/base";

class MainScene extends BaseScene {
    constructor(config) {
        super('MainScene', config);

        this.leftBaseX = 100;
        this.rightBaseX = 1180;
        this.laneY = 400;
        
        this.leftUnits = [];
        this.rightUnits = [];

        this.leftBase = null;
        this.rightBase = null;

        this.isGameOver = false;
    }

    create() {
        this.drawLane();
        this.createBases();

        this.spawnTestUnit('left', this.leftBaseX + 50);
        this.spawnTestUnit('right', this.rightBaseX - 50);
    }

    update(_, delta) {
        this.updateUnits(this.leftUnits, this.rightUnits, delta, this.rightBase);
        this.updateUnits(this.rightUnits, this.leftUnits, delta, this.leftBase);

        this.cleanupDead();
        this.checkGameOver();
    }

    spawnTestUnit(team, x) {
        const unit = new Unit(
            this,
            x,
            this.laneY,
            team
        );

        if (team === 'left')
            this.leftUnits.push(unit);
        else
            this.rightUnits.push(unit);
    }

    updateUnits(units, enemies, delta, enemyBase) {
        units.forEach(unit => unit.update(delta, enemies, enemyBase));
    }

    cleanupDead() {
        this.leftUnits = this.leftUnits.filter(u => !u.isDead);
        this.rightUnits = this.rightUnits.filter(u => !u.isDead);
    }

    drawLane() {
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xffffff);
        graphics.lineBetween(0, this.laneY, this.config.width, this.laneY);
    }

    createBases() {
        this.leftBase = new Base(this, this.leftBaseX, this.laneY, 'left');
        this.rightBase = new Base(this, this.rightBaseX, this.laneY, 'right');
    }

    checkGameOver() {
        if (this.leftBase.isDead)
            return this.endGame('RIGHT WINS');
        if (this.rightBase.isDead)
            return this.endGame('LEFT WINS');
    }

    endGame(text) {
        this.isGameOver = true;
        this.add.text(500, 200, text, { fontSize: '48px' });
    }
}

export default MainScene;