import BaseScene from "./BaseScene";
import Unit from "../models/unit";

class MainScene extends BaseScene {
    constructor(config) {
        super('MainScene', config);

        this.leftBaseX = 100;
        this.rightBaseX = 1180;
        this.laneY = 400;
        
        this.leftUnits = [];
        this.rightUnits = [];
    }

    create() {
        this.drawLane();
        this.drawBases();

        this.spawnTestUnit('left', this.leftBaseX + 50);
        this.spawnTestUnit('right', this.rightBaseX - 50);
    }

    update(_, delta) {
        this.updateUnits(this.leftUnits, this.rightUnits, delta);
        this.updateUnits(this.rightUnits, this.leftUnits, delta);
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

    updateUnits(units, enemies, delta) {
        units.forEach(unit => unit.update(delta, enemies));
    }

    drawLane() {
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xffffff);
        graphics.lineBetween(0, this.laneY, this.config.width, this.laneY);
    }

    drawBases() {
        this.drawBase(this.leftBaseX, 0xff4444);
        this.drawBase(this.rightBaseX, 0x4444ff);
    }

    drawBase(x, color) {
        const size = 40;
        this.add.rectangle(x, this.laneY, size, size, color);
    }
}

export default MainScene;