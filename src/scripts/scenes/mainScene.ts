import ExampleObject from '../objects/exampleObject';


export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  config: Phaser.Types.Core.GameConfig;
  powerUps: any;
  temp_width: number;
  temp_height: number;

    constructor() {
      super({ key: 'MainScene' });
      this.temp_width = 400;
      this.temp_height = 400;
    }
  
    create() {
  
      //this.background = this.add.tileSprite(0, 0, this.temp_width, this.temp_height, "background");
      this.background = this.add.tileSprite(0, 0, this.temp_width, this.temp_height, "background");
      this.background.setOrigin(0, 0);

      this.ship1 = this.add.sprite(this.temp_width / 2 - 50, this.temp_height / 2, "ship");
      this.ship2 = this.add.sprite(this.temp_width / 2, this.temp_height / 2, "ship2");
      this.ship3 = this.add.sprite(this.temp_width / 2 + 50, this.temp_height / 2, "ship3");
  
  
      // this.anims.create({
      //   key: "ship1_anim",
      //   frames: this.anims.generateFrameNumbers("ship", {
      //     start: 2,
      //     end: 3
      //   }),
      //   frameRate: 20,
      //   repeat: -1
      // });
      // this.anims.create({
      //   key: "ship2_anim",
      //   frames: this.anims.generateFrameNumbers("ship2", {
      //     start: 2,
      //     end: 3
      //   }),
      //   frameRate: 20,
      //   repeat: -1
      // });
      // this.anims.create({
      //   key: "ship3_anim",
      //   frames: this.anims.generateFrameNumbers("ship3", {
      //     start: 2,
      //     end: 3
      //   }),
      //   frameRate: 20,
      //   repeat: -1
      // });
  
      // this.anims.create({
      //   key: "explode",
      //   frames: this.anims.generateFrameNumbers("explosion", {
      //     start: 2,
      //     end: 3
      //   }),
      //   frameRate: 20,
      //   repeat: 0,
      //   hideOnComplete: true
      // });
  
      // this.ship1.play("ship1_anim");
      // this.ship2.play("ship2_anim");
      // this.ship3.play("ship3_anim");
  
      // this.ship1.setInteractive();
      // this.ship2.setInteractive();
      // this.ship3.setInteractive();
  
      // this.input.on('gameobjectdown', this.destroyShip, this);
  
      this.add.text(20, 20, "Playing game", {
        font: "25px Arial",
        fill: "yellow"
      });
  
      // POWER UPS
  
      //2.1 Two Animations for the power ups
      this.anims.create({
        key: "red",
        frames: this.anims.generateFrameNumbers("power-up", {
          start: 0,
          end: 1
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "gray",
        frames: this.anims.generateFrameNumbers("power-up", {
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
        var powerUp = this.physics.add.sprite(16, 16, "power-up");
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
      if (ship.y > this.temp_height) {
        this.resetShipPos(ship);
      }
    }
  
    resetShipPos(ship) {
      ship.y = 0;
      var randomX = Phaser.Math.Between(0, this.temp_width);
      ship.x = randomX;
    }
  
    destroyShip(pointer, gameObject) {
      gameObject.setTexture("explosion");
      gameObject.play("explode");
    }
  
  
  // }
  // private exampleObject: ExampleObject;

  // constructor() {
  //   super({ key: 'MainScene' });
  // }

  // create() {
  //   this.exampleObject = new ExampleObject(this, 0, 0);
  // }

  // update() {
  // }
}
