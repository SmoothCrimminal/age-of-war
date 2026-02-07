import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import BootScene from "./scenes/BootScene";
import PreloadScene from "./scenes/PreloadScene";

const SHARED_CONFIG = {
  width: 1280,
  height: 720
};

const scenes = [BootScene, PreloadScene, MainScene]
const initScenes = () => scenes.map(Scene => new Scene(SHARED_CONFIG));

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  backgroundColor: '#1e1e1e',
  scene: initScenes()
};

new Phaser.Game(config);
