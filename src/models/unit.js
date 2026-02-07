class Unit {
    constructor(scene, x, y, team) {
        this.scene = scene;
        this.team = team;
        this.direction = team === 'left' ? 1 : -1;

        this.speed = 60;
        this.range = 35;
        this.target = null;

        this.createVisual(x, y);
    }

    update(delta, enemies) {
        this.findTarget(enemies);

        if (this.hasTarget()) {
            return;
        }
        
        this.move(delta);
    }

    createVisual(x, y) {
        const color = this.team === 'left' ? 0xffffff : 0xaaaaaa;
        this.body = this.scene.add.rectangle(x, y, 30, 30, color);
    }

    move(delta) {
        const dx = this.direction * this.speed * (delta / 1000);
        this.body.x += dx;
    }

    findTarget(enemies) {
        this.target = enemies.find(e => this.isInRange(e)) || null;
    }

    isInRange(enemy) {
        const distance = Math.abs(enemy.body.x - this.body.x);
        return distance <= this.range;
    }

    hasTarget() {
        return this.target !== null;
    }
}

export default Unit;