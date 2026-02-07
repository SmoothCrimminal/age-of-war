import BaseScene from "./BaseScene";

class BootScene extends BaseScene {
    constructor(config) {
        super('BootScene', config);
    }

    create() {
        this.scene.start('PreloadScene');
    }
}

export default BootScene;