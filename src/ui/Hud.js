class Hud {
    constructor(scene) {
        this.scene = scene;
        this.onSpawnLeft = null;

        this.createGoldText();
        this.createBaseHpTexts();
        this.createButtons();
    }

    createBaseHpTexts() {
        this.leftBaseText = this.scene.add.text(10, 10, '', {
            fontSize: '18px'
        });

        this.rightBaseText = this.scene.add.text(10, 40, '', {
            fontSize: '18px'
        });
    }

    setBaseHp(leftBase, rightBase) {
        this.leftBaseText.setText(
            `LEFT BASE: ${leftBase.hp}/${leftBase.maxHp}`
        );

        this.rightBaseText.setText(
            `RIGHT BASE: ${rightBase.hp}/${rightBase.maxHp}`
        );
    }

    createGoldText() {
        this.goldText = this.scene.add.text(10, 70, 'Gold: 0', {
        fontSize: '20px'
        });
    }

    createButtons() {
        this.swordsManButton = this.createButton(10, 110, 'Swordsman (40)', () => this.fireLeft('swordsman'));
        this.tankButton = this.createButton(10, 150, 'Tank (70)', () => this.fireLeft('tank'));
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

    fireLeft(typeKey) {
        if (this.onSpawnLeft) this.onSpawnLeft(typeKey);
    }
}

export default Hud;
