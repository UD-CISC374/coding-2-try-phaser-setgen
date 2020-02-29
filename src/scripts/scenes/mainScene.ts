import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  config: Phaser.Types.Core.GameConfig;
  powerUps: any;

    constructor() {
      super({ key: 'MainScene' });
    }
  
    create() {
  
      this.background = this.add.tileSprite(0, 0, <number>this.config.width, <number>this.config.height, "../../assets/images/background.png");
      this.background.setOrigin(0, 0);
  
      this.ship1 = this.add.sprite(<number>this.config.width / 2 - 50, <number>this.config.height / 2, "../../assets/images/ship.png");
      this.ship2 = this.add.sprite(<number>this.config.width / 2, <number>this.config.height / 2, "../../assets/images/ship2.png");
      this.ship3 = this.add.sprite(<number>this.config.width / 2 + 50, <number>this.config.height / 2, "../../assets/images/ship3.png");
  
  
      this.anims.create({
        key: "ship1_anim",
        frames: this.anims.generateFrameNumbers("../../assets/images/ship.png", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "ship2_anim",
        frames: this.anims.generateFrameNumbers("../../assets/images/ship2.png", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "ship3_anim",
        frames: this.anims.generateFrameNumbers("../../assets/images/ship3.png", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });
  
      this.anims.create({
        key: "explode",
        frames: this.anims.generateFrameNumbers("../../assets/spritesheets/explosion.png", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: 0,
        hideOnComplete: true
      });
  
      this.ship1.play("ship1_anim");
      this.ship2.play("ship2_anim");
      this.ship3.play("ship3_anim");
  
      this.ship1.setInteractive();
      this.ship2.setInteractive();
      this.ship3.setInteractive();
  
      this.input.on('gameobjectdown', this.destroyShip, this);
  
      this.add.text(20, 20, "Playing game", {
        font: "25px Arial",
        fill: "yellow"
      });
  
      // POWER UPS
  
      //2.1 Two Animations for the power ups
      this.anims.create({
        key: "red",
        frames: this.anims.generateFrameNumbers("../../assets/spritesheets/power-up.png", {
          start: 0,
          end: 1
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "gray",
        frames: this.anims.generateFrameNumbers("../../assets/spritesheets/power-up.png", {
          start: 2,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      });
  
      // 3.1
      this.physics.world.setBoundsCollision();
  
      this.powerUps = this.physics.add.group();
  
      // 2.2 Add multiple objects
      var maxObjects = 4;
      for (var i = 0; i <= maxObjects; i++) {
        var powerUp = this.physics.add.sprite(16, 16, "../../assets/spritesheets/power-up.png");
        this.powerUps.add(powerUp);
         powerUp.setRandomPosition(0, 0, <number>this.game.config.width, <number>this.game.config.height);
  
        // set random animation
        if (Math.random() > 0.5) {
          powerUp.play("red");
        } else {
          powerUp.play("gray");
        }
  
        // setVelocity
        powerUp.setVelocity(100, 100);
        // 3.2
        powerUp.setCollideWorldBounds(true);
        // 3.3
       powerUp.setBounce(1);
  
      }
  
    }
  
    update() {
  
      this.moveShip(this.ship1, 1);
      this.moveShip(this.ship2, 2);
      this.moveShip(this.ship3, 3);
  
      this.background.tilePositionY -= 0.5;
  
    }
  
    moveShip(ship, speed) {
      ship.y += speed;
      if (ship.y > <number>this.config.height) {
        this.resetShipPos(ship);
      }
    }
  
    resetShipPos(ship) {
      ship.y = 0;
      var randomX = Phaser.Math.Between(0, <number>this.config.width);
      ship.x = randomX;
    }
  
    destroyShip(pointer, gameObject) {
      gameObject.setTexture("explosion");
      gameObject.play("explode");
    }
  
  
  }
//   private exampleObject: ExampleObject;

//   constructor() {
//     super({ key: 'MainScene' });
//   }

//   create() {
//     this.exampleObject = new ExampleObject(this, 0, 0);
//   }

//   update() {
//   }
// }
