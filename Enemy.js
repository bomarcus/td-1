//Enemy.js
class Enemy extends Phaser.GameObjects.PathFollower {
  constructor(scene, path, maxHealth = 100) {
    super(scene, path, 0, 0, "enemy");
    this.path = path;
    scene.add.existing(this);
    scene.sys.updateList.add(this);
    this.startOnPath();

    this.setScale(0.1);

    // Health properties
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;

    // Create health bar as a part of the enemy
    this.healthBar = new HealthBar(scene, this.x, this.y, maxHealth);
  }

  startOnPath() {
    this.setPath(this.path, {
      duration: 10000,
      startAt: 0,
    });
    this.startFollow({
      positionOnPath: true,
      duration: 10000,
      yoyo: false,
      repeat: 0,
      rotateToPath: true,
    });
  }

  update(time, delta) {
    super.update(time, delta);
    this.healthBar.setPosition(this.x, this.y); // Update health bar position
  }

  takeDamage(amount) {
    this.currentHealth -= amount;
    this.currentHealth = Math.max(this.currentHealth, 0);
    this.healthBar.updateHealth(this.currentHealth);

    if (this.currentHealth <= 0) {
      this.healthBar.destroy();
      this.destroy(); // Or any other logic for when the enemy dies
    }
  }
}
