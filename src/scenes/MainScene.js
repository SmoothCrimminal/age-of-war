import BaseScene from "./BaseScene";
import Unit from "../models/unit";
import Base from "../models/base";
import Economy from "../logic/Economy";
import Cooldown from "../logic/Cooldown";
import Hud from "../ui/Hud";

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
        this.createEconomy();
        this.createHud();
    }

    update(_, delta) {
        this.updateUnits(this.leftUnits, this.rightUnits, delta, this.rightBase);
        this.updateUnits(this.rightUnits, this.leftUnits, delta, this.leftBase);

        this.updateHud();
        this.updateCooldown(delta);

        this.cleanupDead();
        this.checkGameOver();
    }

    createEconomy() {
        this.economy = new Economy();
        this.spawnCost = 40;
        this.killReward = 15;
        this.spawnCooldown = new Cooldown(800);
    }

    createHud() {
        this.hud = new Hud(this);

        this.hud.onSpawnLeft = () => this.trySpawn('left', this.leftBaseX + 50);
        this.hud.onSpawnRight = () => this.trySpawn('right', this.rightBaseX - 50);
    }

    updateHud() {
        this.hud.setGold(this.economy.getGold());
        this.hud.setBaseHp(this.leftBase, this.rightBase);
    }

    updateCooldown(delta) {
        this.spawnCooldown.update(delta)
    }

    trySpawn(team, x) {
        if (!this.canSpawn())
            return;

        if (!this.economy.spend(this.spawnCost))
            return;

        this.spawnCooldown.trigger();
        this.spawnTestUnit(team, x);
    }

    canSpawn() {
        return this.spawnCooldown.isReady();
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
        units.forEach(unit => {
            const allyAhead = this.findAllyAhaed(unit, units)
            unit.update(delta, enemies, enemyBase, allyAhead)
        });
    }

    findAllyAhaed(unit, allies) {
        let best = null;
        let bestDx = Infinity;

        allies.forEach(a => {
            if (a === unit)
                return;

            if (a.isDead)
                return;

            const dx = (a.body.x - unit.body.x) * unit.direction;
            if (dx <= 0)
                return;

            if (dx < bestDx) {
                bestDx = dx;
                best = a;
            }
        });

        return best;
    }

    cleanupDead() {
        this.awardKillGold(this.leftUnits);
        this.awardKillGold(this.rightUnits);

        this.leftUnits = this.leftUnits.filter(u => !u.isDead);
        this.rightUnits = this.rightUnits.filter(u => !u.isDead);
    }

    awardKillGold(units) {
        units.forEach(u => {
            if (!u.isDead)
                return;

            const killerTeam = u.killedBy.team;
            if (!killerTeam)
                return;

            this.giveGoldToTeam(killerTeam, this.killReward);
        });
    }

    giveGoldToTeam(team, amount) {
        this.economy.addGold(amount);
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