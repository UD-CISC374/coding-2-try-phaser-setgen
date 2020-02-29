export default class PreloadScene extends Phaser.Scene {
    constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.image("background", "../assets/images/background.png");

    this.load.spritesheet("ship", "../../assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "../../assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "../../assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "../../assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    // 2.1 load the spritesheet
    this.load.spritesheet("power-up", "../../assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });

  }

  create() {
    this.add.text(20,20, "Loading...", {fill: "black"});
    this.scene.start('MainScene');
  }

  // constructor() {
  //   super({ key: 'PreloadScene' });
  // }

  // preload() {
  // }

  // create() {
  //   this.add.text(20,20, "Loading...", {fill: "black"});
  //   //this.scene.start('MainScene');
  // }
}
