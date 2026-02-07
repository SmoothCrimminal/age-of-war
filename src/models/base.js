class Base {
    constructor(scene, x, y, team) {
        this.scene = scene;
        this.team = team;

        this.maxHp = 500;
        this.hp = 500;
        this.isDead = false;

        this.createVisual(x, y);
        this.createLabel();
    }

    createVisual(x, y) {
        const color = this.team === 'left' ? 0xff4444 : 0x4444ff;
        this.body = this.scene.add.rectangle(x, y, 50, 50, color);
    }

    createLabel() {
        this.label = this.scene.add.text(10, this.team === 'left' ? 10 : 40, '', {
            fontSize: '20px'
        });
        this.updateLabel();
    }

     takeDamage(amount) {
        this.hp -= amount;

        if (this.hp < 0) {
            this.hp = 0;
            this.isDead = true;
        }

        this.updateLabel();
    }

    updateLabel() {
        this.label.setText(`${this.team} base: ${this.hp}/${this.maxHp}`);
    }
}

export default Base;