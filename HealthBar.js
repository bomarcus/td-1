//HealthBar.js
class HealthBar {
  constructor(scene, x, y, maxHealth) {
    this.bar = scene.add.graphics();
    this.bar.setDepth(10);
    this.x = x;
    this.y = y;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.draw();
  }

  draw() {
    this.bar.clear();
    this.bar.fillStyle(0x6ec5b8, 1); // Green color for health bar

    const barWidth = 40;
    const barHeight = 5;

    // Draw health bar based on current health
    this.bar.fillRect(
      this.x - barWidth / 2,
      this.y - 30, // Adjust as necessary
      barWidth * (this.currentHealth / this.maxHealth),
      barHeight
    );
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.draw(); // Redraw at new position
  }

  updateHealth(currentHealth) {
    this.currentHealth = currentHealth;
    this.draw(); // Redraw with new health
  }

  destroy() {
    this.bar.destroy();
  }
}
