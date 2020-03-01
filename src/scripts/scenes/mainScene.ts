import ExampleObject from '../objects/exampleObject';
import {config} from '../game'
import {gameSettings} from '../game'
import { Input } from 'phaser';
import Beam from '../objects/beam'
import Explosion from '../objects/explosions';


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
  projectiles: Phaser.GameObjects.Group;
  enemies: Phaser.Physics.Arcade.Group;
  score: number;
  scoreLabel: Phaser.GameObjects.BitmapText;
  music: any;
  beamSound: Phaser.Sound.BaseSound;
  explosionSound: Phaser.Sound.BaseSound;
  pickupSound: Phaser.Sound.BaseSound;

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

      this.enemies =this.physics.add.group();
      this.enemies.add(this.ship1);
      this.enemies.add(this.ship2);
      this.enemies.add(this.ship3);
  
      this.ship1.setInteractive();
      this.ship2.setInteractive();
      this.ship3.setInteractive();
  
      this.input.on('gameobjectdown', this.destroyShip, this);
  
      // this.add.text(20, 20, "Playing game", {
      //   font: "25px Arial",
      //   fill: "yellow"
      // });
  
      
  
      this.physics.world.setBoundsCollision();
  
      this.powerUps = this.physics.add.group();
  
      var maxObjects = 4;
      for (var i = 0; i <= maxObjects; i++) {
        var powerUp = this.physics.add.sprite(16, 16, "power-up");
        this.powerUps.add(powerUp);
         powerUp.setRandomPosition(0, 0, this.width, this.height);
  
        // set random animation
        if (Math.random() > 0.5) {
          powerUp.play("red");
        } else {
          powerUp.play("gray");
        }
  
        // setVelocity
        powerUp.setVelocity(100, 100);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
  
      }

      this.player = this.physics.add.sprite(this.width / 2 - 8, this.height -64, "player");
      this.player.play("thrust");
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);

      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.projectiles = this.add.group();

      this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
        projectile.destroy();
      });

      this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, undefined, this);
      this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, undefined, this);
      this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, undefined, this);

      var graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 1);
      graphics.beginPath();
      graphics.moveTo(0, 0);
      graphics.lineTo(this.width, 0);
      graphics.lineTo(this.width, 20);
      graphics.lineTo(0, 20);
      graphics.lineTo(0, 0);
      graphics.closePath();
      graphics.fillPath();

      this.score = 0;

      //new text using bitmap font
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE ", 16);

      //format the score
      var scoreFormated = this.zeroPad(this.score, 6);
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated  , 16);

      this.beamSound = this.sound.add("audio_beam");
      this.explosionSound = this.sound.add("audio_explosion");
      this.pickupSound = this.sound.add("audio_pickup");

      //create music
      this.music = this.sound.add("music");

      var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }

      this.music.play(musicConfig);

    }
  
    update() {
  
      this.moveShip(this.ship1, 1);
      this.moveShip(this.ship2, 2);
      this.moveShip(this.ship3, 3);
  
      this.background.tilePositionY -= 0.5;

      this.movePlayerManager();

      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
        if(this.player.active){
          this.shootBeam();
      }
      }
      for(var i = 0; i < this.projectiles.getChildren().length; i++){
        var beam = this.projectiles.getChildren()[i];
        beam.update();
      }
  
    }

    pickPowerUp(player, powerUp){
      powerUp.disableBody(true, true);
      this.pickupSound.play();
    }

    hurtPlayer(player, enemy){
      this.resetShipPos(enemy);
      if(this.player.alpha < 1){
        return;
      }

      var explosion = new Explosion(this, player.x, player.y);
      player.disableBody(true, true);

      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
      });
    }

    resetPlayer(){
      var x = this.width / 2 - 8;
      var y = this.height + 64;
      this.player.enableBody(true, x, y, true, true);
  
      //make the player transparent to indicate invulnerability
      this.player.alpha = 0.5;

      //move the ship from outside the screen to its original position
      var tween = this.tweens.add({
        targets: this.player,
        y: this.height - 64,
        ease: 'Power1',
        duration: 1500,
        repeat:0,
        onComplete: this.onTweenComplete,
        callbackScope: this
      });
    }
  
    onTweenComplete(){
      this.player.alpha = 1;
    }

    hitEnemy(projectile, enemy){
      var explosion = new Explosion(this, enemy.x, enemy.y);
      
      this.explosionSound.play();

      projectile.destroy();
      this.resetShipPos(enemy);
      this.score += 15;

      var scoreFormated = this.zeroPad(this.score, 6);
      this.scoreLabel.text = "SCORE " + scoreFormated;
    }

    zeroPad(number, size){
      var stringNumber = String(number);
      while(stringNumber.length < (size || 2)){
        stringNumber = "0" + stringNumber;
      }
      return stringNumber;
    }

    shootBeam(){
      //var beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
      var beam = new Beam(this);
      this.beamSound.play();
    }

    movePlayerManager(){
      this.player.setVelocity(0);

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
