import BaseScene from "./BaseScene";

class PreloadScene extends BaseScene {
    constructor(config) {
        super('PreloadScene', config);
    }

    create() {
        this.scene.start('MainScene');
    }
}

export default PreloadScene;