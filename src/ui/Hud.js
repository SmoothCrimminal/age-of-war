class Hud {
    constructor(scene) {
        this.scene = scene;
        this.onSpawnLeft = null;
        this.onRestart = null;
        this.isLocked = false;

        this.createGoldText();
        this.createBaseHpTexts();
        this.createButtons();
        this.createGameOverOverlay();
    }

    createGameOverOverlay() {
        this.overlayBg = this.scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.6);
        this.overlayText = this.scene.add.text(520, 300, '', { fontSize: '48px' });
        this.restartBtn = this.createButton(560, 380, 'Restart', () => this.fireRestart(), true);

        this.hideGameOver();
    }

    showGameOver(text) {
        this.overlayText.setText(text);

        this.overlayBg.setVisible(true);
        this.overlayText.setVisible(true);
        this.restartBtn.setVisible(true);

        this.isLocked = true;
    }

    hideGameOver() {
        this.overlayBg.setVisible(false);
        this.overlayText.setVisible(false);
        this.restartBtn.setVisible(false);

        this.isLocked = false;
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

    createButton(x, y, label, onClick, ignoreLock = false) {
        const t = this.scene.add.text(x, y, label, { fontSize: '20px' });
        t.setInteractive({ useHandCursor: true });
        t.on('pointerdown', () => {
            if (this.isLocked && !ignoreLock)
                return;

            onClick();
        });

        return t;
    }

    setGold(value) {
        this.goldText.setText(`Gold: ${value}`);
    }

    fireLeft(typeKey) {
        if (this.onSpawnLeft) 
            this.onSpawnLeft(typeKey);
    }

    fireRestart() {
        if (this.onRestart)
            this.onRestart();
    }
}

export default Hud;
