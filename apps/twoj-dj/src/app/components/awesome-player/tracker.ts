import { Player } from './player';
import { Scene } from './scene';

export class Tracker {
  innerDelta = 20;
  lineWidth = 7;
  private scene: Scene;
  private context: CanvasRenderingContext2D;
  r: number;

  player: Player;

  init(scene: Scene): void {
    this.scene = scene;
    this.context = scene.context;
    this.draw();
  }

  draw(): void {
    this.drawArc();
  }

  drawArc(): void {
    this.context.save();
    this.context.strokeStyle = 'rgba(254, 67, 101, 0.8)';
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;

    this.r = this.scene.radius - (this.innerDelta + this.lineWidth / 2);
    this.context.stroke();
    this.context.restore();
  }
}
