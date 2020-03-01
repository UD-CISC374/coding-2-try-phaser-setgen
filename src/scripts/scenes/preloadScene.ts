export default class PreloadScene extends Phaser.Scene {
    constructor() {
    super({ key: 'PreloadScene' });
  }

  preload(){
    this.load.image("background", "./assets/images/background.png");

    this.load.spritesheet("ship", "./assets/spritesheets/ship.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("ship2", "./assets/spritesheets/ship2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("ship3", "./assets/spritesheets/ship3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "./assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    // 2.1 load the spritesheet
    this.load.spritesheet("power-up", "./assets/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "./assets/spritesheets/player.png",{
      frameWidth: 16,
      frameHeight: 24
    });

  }

  create() {
    this.add.text(20,20, "Loading...", {fill: "black"});

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 4
      }),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    // POWER UPS
  
      //2.1 Two Animations for the power ups
      this.anims.create({
        key: "red",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 0,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "gray",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 0,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });

      this.anims.create({
        key: "thurst",
        frames: this.anims.generateFrameNumbers("player", {
          start: 0,
          end: 1
        }),
        frameRate: 20,
        repeat: -1,
      });
      
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
