class Hud {
    constructor(scene) {
        this.scene = scene;
        this.onSpawnLeft = null;
        this.onSpawnRight = null;

        this.createGoldText();
        this.createButtons();
    }

    createGoldText() {
        this.goldText = this.scene.add.text(10, 70, 'Gold: 0', {
        fontSize: '20px'
        });
    }

    createButtons() {
        this.leftBtn = this.createButton(10, 110, 'Spawn LEFT', () => this.fireLeft());
        this.rightBtn = this.createButton(10, 150, 'Spawn RIGHT', () => this.fireRight());
    }

    createButton(x, y, label, onClick) {
        const t = this.scene.add.text(x, y, label, { fontSize: '20px' });
        t.setInteractive({ useHandCursor: true });
        t.on('pointerdown', onClick);
        return t;
    }

    setGold(value) {
        this.goldText.setText(`Gold: ${value}`);
    }

    fireLeft() {
        if (this.onSpawnLeft) this.onSpawnLeft();
    }

    fireRight() {
        if (this.onSpawnRight) this.onSpawnRight();
    }
}

export default Hud;
