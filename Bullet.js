//Bullet.js
class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene = scene;
    this.scene.physics.add.existing(this); // Add bullet to physics
    this.body.setCollideWorldBounds(true);
    this.speed = 100; // Increased speed for testing
    this.setScale(0.05); // Increased scale for visibility
    this.setDepth(10);
    this.setActive(false);
    this.setVisible(false);
    console.log("Bullet created");
  }

  fire(x, y, target) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);

    this.scene.physics.moveToObject(this, target, this.speed);
    console.log(
      "Bullet fired from",
      x,
      y,
      "towards target at",
      target.x,
      target.y
    );
  }

  update(time, delta) {
    if (this.active) {
      console.log("Bullet position:", this.x, this.y);
      if (this.isOutOfBounds()) {
        this.setActive(false);
        this.setVisible(false);
        this.destroy();
      }
    }
  }

  isOutOfBounds() {
    return (
      this.y < 0 ||
      this.y > this.scene.sys.game.config.height ||
      this.x < 0 ||
      this.x > this.scene.sys.game.config.width
    );
  }
}
