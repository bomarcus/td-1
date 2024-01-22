//TowerDefenseGame.js
class TowerDefenseGame extends Phaser.Scene {
  constructor() {
    super({ key: "TowerDefenseGame" });
    this.enemies = [];
    this.towers = [];
    this.bullets = []; // Array to hold bullets
  }

  preload() {
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("background", "assets/background.png");
    this.load.image("tower", "assets/tower.png");
    this.load.image("enemy", "assets/enemy.png");
  }

  create() {
    let background = this.add.image(400, 300, "background").setDepth(-1);

    // Create and use the path
    let path = new EnemyPath(this).path;

    // Create a tower for demonstration
    let tower1 = new Tower(this, 600, 220);
    let tower2 = new Tower(this, 300, 220);
    let tower3 = new Tower(this, 300, 420);
    this.towers.push(tower1, tower2, tower3);

    // Spawn enemies at intervals
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }

  spawnEnemy() {
    let path = new EnemyPath(this).path; // Assuming path is defined in EnemyPath
    let enemy = new Enemy(this, path);
    this.enemies.push(enemy);
  }

  update() {
    // Update each enemy
    this.enemies.forEach((enemy, index) => {
      if (enemy.active) {
        enemy.update();
      } else {
        this.enemies.splice(index, 1); // Remove destroyed enemies
      }
    });

    // Update each tower and pass bullets array
    this.towers.forEach((tower) => {
      tower.update(this.time.now, this.enemies, this.bullets);
    });

    // Collision detection between bullets and enemies
    this.physics.collide(this.bullets, this.enemies, (bullet, enemy) => {
      console.log("Enemy hit by bullet:", enemy);
      bullet.destroy(); // Destroy the bullet
      enemy.takeDamage(10); // Example: deal damage to the enemy
    });

    // Update bullets
    this.bullets.forEach((bullet, index) => {
      bullet.update(this.time.now); // Ensure bullet update is called
      if (!bullet.active) {
        this.bullets.splice(index, 1); // Remove inactive bullets
      }
    });
    if (this.physics.config.debug) {
      this.bullets.forEach((bullet) => {
        this.physics.world.debugGraphic.clear(); // Clear previous frames
        this.physics.world.debugGraphic.lineStyle(10, 0x00ff00); // Green outline
        this.physics.world.debugGraphic.strokeRectShape(bullet.body);
      });
    }
  }
}
