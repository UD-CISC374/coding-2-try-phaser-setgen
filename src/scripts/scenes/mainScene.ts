import ExampleObject from '../objects/exampleObject';
import {config} from '../game'
import {gameSettings} from '../game'
import { Input } from 'phaser';


export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  config: Phaser.Types.Core.GameConfig;
  powerUps: any;
  width: number;
  height: number;
  mainCam: Phaser.Cameras.Scene2D.Camera;
  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  game: Phaser.Game;

    constructor() {
      super({ key: 'MainScene' });
      this.width = this.width;
      this.width = Number(config.scale?.width);
      this.height = Number(config.scale?.height)
      
    }
  
    create() {
  
      //this.background = this.add.tileSprite(0, 0, this.width, this.height, "background");
      this.background = this.add.tileSprite(0, 0, this.width, this.height, "background");
      this.background.setOrigin(0, 0);
      this.background.setScrollFactor(0);

      // this.mainCam = this.cameras.main.startFollow(this.player);
      // this.background.tilePositionX = this.mainCam.scrollX * .3;

      this.ship1 = this.add.sprite(this.width / 2 - 50, this.height / 2, "ship");
      this.ship2 = this.add.sprite(this.width / 2, this.height / 2, "ship2");
      this.ship3 = this.add.sprite(this.width / 2 + 50, this.height / 2, "ship3");
  
  
      
  
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

      this.player = this.physics.add.sprite(this.width / 2 - 8, this.height -64, "player");
      this.player.play("thrust");
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);

      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
    }
  
    update() {
  
      this.moveShip(this.ship1, 1);
      this.moveShip(this.ship2, 2);
      this.moveShip(this.ship3, 3);
  
      this.background.tilePositionY -= 0.5;

      this.movePlayerManager();

      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        console.log("Fire!");
      }
  
    }

    movePlayerManager(){
      if(this.cursorKeys.left?.isDown){
        this.player.setVelocityX(-gameSettings.playerSpeed);
      }
      else if(this.cursorKeys.right?.isDown){
        this.player.setVelocityX(gameSettings.playerSpeed);
      }
      
      if(this.cursorKeys.up?.isDown){
        this.player.setVelocityY(-gameSettings.playerSpeed);
      }
      else if(this.cursorKeys.down?.isDown){
        this.player.setVelocityY(gameSettings.playerSpeed);
      }
    }
  
    moveShip(ship, speed) {
      ship.y += speed;
      if (ship.y > this.height) {
        this.resetShipPos(ship);
      }
    }
  
    resetShipPos(ship) {
      ship.y = 0;
      var randomX = Phaser.Math.Between(0, this.width);
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
