import BaseScene from "./BaseScene";
import Unit from "../models/unit";

class MainScene extends BaseScene {
    constructor(config) {
        super('MainScene', config);
    }

    create() {
        this.initializeState();
        this.initializeTexts();
        this.spawnBases();
    }

    update(time, delta) {
        const dt = delta / 1000;

        this.goldText.setText(`Gold: ${this.state.gold}`);
        this.baseHpText.setText(`Base HP: ${this.state.bases.left.hp}`);

        this.state.units.forEach(unit => {
            const dir = unit.team === 'left' ? 1 : -1;
            unit.x += dir * unit.speed * dt;
        });

        this.unitGraphics.clear();
        this.unitGraphics.fillStyle(0xffffff, 1);
        
        this.state.units.forEach(unit => {
            this.unitGraphics.fillRect(unit.x, this.config.height - 30, 20, 20);
        });
    }

    initializeState() {
        this.state = {
            gold: 100,
            units: [],
            bases: {
                left: {x: 80, hp: 300},
                right: {x: this.config.width - 20, hp: 300}
            }
        };

        this.time.addEvent({
            delay: 10000,
            loop: true,
            callback: () => this.spawnUnit('right')
        });

        this.unitGraphics = this.add.graphics();
        this.unitGraphics.fillStyle(0xffffff, 1);
    }

    initializeTexts() {
        this.goldText = this.add.text(16, 16, `Gold: ${this.state.gold}`, {
            fontSize: '18px'
        });

        this.baseHpText = this.add.text(16, 30, `Base HP: ${this.state.bases.left.hp}`, {
            fontSize: '18px'
        });

        this.add.text(16, 80, 'Spawn [10g]', {
            fontSize: '18px'
        })
        .setInteractive()
        .on('pointerdown', () => this.spawnUnit('left'));
    }

    spawnUnit(team) {
        if (team === 'left' && this.state.gold < 10)
            return;

        if (team === 'left')
            this.state.gold -= 10;

        const x = team === "left" ? this.state.bases.left.x + 20 : this.state.bases.right.x - 100;
        this.state.units.push(new Unit(team, x, 40, 60, 18, 8));
    }

    spawnBases() {
        this.leftBaseRect = this.add.rectangle(this.state.bases.left.x, this.config.height - 10, 60, 120, 0xff0000).setOrigin(1);
        this.rightBaseRect = this.add.rectangle(this.state.bases.right.x, this.config.height - 10, 60, 120, 0xff0000).setOrigin(1);
    }
}

export default MainScene;