class Unit {
    constructor(scene, x, y, team) {
        this.scene = scene;
        this.team = team;
        this.direction = team === 'left' ? 1 : -1;

        this.speed = 60;
        this.range = 35;

        this.maxHp = 100;
        this.hp = 100;

        this.damage = 10;
        this.attackCooldownMs = 600;
        this.attackTimerMs = 0;

        this.target = null;
        this.isDead = false;

        this.createVisual(x, y);
    }

    update(delta, enemies) {
        if (this.isDead)
            return;

        this.findTarget(enemies);

        if (this.hasTarget()) {
            this.attack(delta);
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
        this.target = enemies.find(e => this.isValidTarget(e) && this.isInRange(e)) || null;
    }

    isValidTarget(enemy) {
        return enemy && !enemy.isDead;
    }

    isInRange(enemy) {
        const distance = Math.abs(enemy.body.x - this.body.x);
        return distance <= this.range;
    }

    hasTarget() {
        return this.target !== null;
    }

    attack(delta) {
        this.attackTimerMs += delta;

        if (!this.canAttack())
            return;

        this.resetAttackTimer();
        this.dealDamage();
    }

    canAttack() {
        return this.attackTimerMs >= this.attackCooldownMs;
    }

    resetAttackTimer() {
        this.attackTimerMs = 0;
    }

    dealDamage() {
        if (!this.isValidTarget(this.target))
            return;

        this.target.takeDamage(this.damage);
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.body.destroy();
    }
}

export default Unit;