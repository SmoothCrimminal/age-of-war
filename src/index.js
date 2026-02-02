
import Phaser from "phaser";
import MainScene from "./scenes/MainScene";

const SHARED_CONFIG = {
  width: 800,
  height: 600
};

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  backgroundColor: '#222',
  scene: new MainScene(SHARED_CONFIG)
};

new Phaser.Game(config);
