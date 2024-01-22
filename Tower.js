//Tower.js
class Tower extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "tower");
    this.scene = scene;
    this.scene.add.existing(this);
    this.setInteractive();
    this.setScale(0.1);

    this.fireRate = 1000; // Fire rate in milliseconds
    this.lastShot = 0;
  }

  // Additional methods for tower behavior (e.g., shooting) can be added here
  update(time, enemies) {
    if (time > this.lastShot + this.fireRate) {
      this.shoot(enemies);
      this.lastShot = time;
    }
  }

  shoot(enemies) {
    if (enemies && enemies.length > 0) {
      let target = enemies[0]; // Target the first enemy
      let bullet = new Bullet(this.scene, this.x, this.y);
      bullet.setDepth(20);
      bullet.fire(this.x, this.y, target);
      this.scene.bullets.push(bullet); // Add bullet to the game scene's bullets array
    }
  }
}
