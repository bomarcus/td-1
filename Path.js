//Path.js
class EnemyPath {
  constructor(scene) {
    this.scene = scene;
    this.path = this.createPath();
    this.graphics = this.scene.add.graphics();
    this.drawPath();
  }

  createPath() {
    let path = new Phaser.Curves.Path(100, -50);
    path.lineTo(100, 300);
    path.lineTo(700, 300);
    path.lineTo(700, 500);

    return path;
  }

  drawPath() {
    this.graphics.lineStyle(10, 0x000000, 1);
    this.path.draw(this.graphics);
  }
}
