import EventEmitter from 'events';
import * as PIXI from 'pixi.js';
import Reel from './reel';

class ReelsContainer extends EventEmitter {
  public readonly reels: Array<Reel> = [];
  public readonly container: PIXI.Container;

  constructor(app: PIXI.Application) {
    super();
    const REEL_OFFSET_LEFT = 70;
    const NUMBER_OF_REELS = 3;
    this.container = new PIXI.Container();

    for (let i = 0; i < NUMBER_OF_REELS; i++) {
      const reel = new Reel(app, i);
      this.reels.push(reel);
      this.container.addChild(reel.container);
    }

    this.container.x = REEL_OFFSET_LEFT;
  }

  public async spin(outcome: number[]) {
    this.emit('start');

    const reelsToSpin = [...this.reels];
    const spinningPromises = reelsToSpin.map((reel, idex) =>
      reel.spinOneTime(outcome[idex])
    );
    Promise.all(spinningPromises);
    setTimeout(() => this.emit('done'), 2000);

    return this.removeAllListeners();
  }
}

export default ReelsContainer;
