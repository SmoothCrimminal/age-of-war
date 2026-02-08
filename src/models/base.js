class Base {
    constructor(scene, x, y, team) {
        this.scene = scene;
        this.team = team;

        this.maxHp = 500;
        this.hp = 500;
        this.isDead = false;

        this.createVisual(x, y);
    }

    createVisual(x, y) {
        const color = this.team === 'left' ? 0xff4444 : 0x4444ff;
        this.body = this.scene.add.rectangle(x, y, 50, 50, color);
    }

     takeDamage(amount) {
        this.hp -= amount;

        if (this.hp < 0) {
            this.hp = 0;
            this.isDead = true;
        }
    }
}

export default Base;