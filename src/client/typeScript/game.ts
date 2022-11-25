import * as PIXI from 'pixi.js';
import SpinButton from './SpinButton';
import Loader from './loader';
import WinAinmation from './winAnimation';
import ReelsContainer from './reelsContainer';
//////////////////////////////
import { spinRequest } from './requests';
import { GameOutcome } from '../../shared/GameOutcome';

const spinParams = {
  symbolsQuantity: 3,
  bottomBorder: 0,
  topBorder: 5,
};

export default class Game {
  public app: PIXI.Application;
  private spinBtn!: SpinButton;
  private winAinmation!: WinAinmation;
  private reelsContainer!: ReelsContainer;

  constructor() {
    this.app = new PIXI.Application({
      width: 960,
      height: 300,
      backgroundColor: 0x1099bb,
    });
    window.document.body.appendChild(this.app.view);
    new Loader(this.app, this.init.bind(this));
  }

  private init() {
    this.createSpinButton();
    this.createReels();
    this.createwinAinmation();
  }

  private createSpinButton() {
    this.spinBtn = new SpinButton(this.app, this.handleClick.bind(this));
    this.app.stage.addChild(this.spinBtn.sprite);
  }

  private createReels() {
    this.reelsContainer = new ReelsContainer(this.app);
    this.app.stage.addChild(this.reelsContainer.container);
  }

  private createwinAinmation() {
    this.winAinmation = new WinAinmation(this.app, '', '');
    this.app.stage.addChild(this.winAinmation.container);
  }

  private async handleClick() {
    this.spinBtn.setDisabled();
    const res = await spinRequest(spinParams);
    this.reelsContainer.spin(res.outCome);

    this.reelsContainer.on('start', () => {
      this.winAinmation.hide();
      this.spinBtn.setDisabled();
    });

    this.reelsContainer.on('done', () => this.handleBonus(res));
  }

  private handleBonus(res: GameOutcome) {
    this.winAinmation.show(res.winType, res.bonus);

    if (!res.bonus) {
      setTimeout(() => {
        this.winAinmation.hide();
        this.spinBtn.setDefault();
      }, 1500);
    } else {
      setTimeout(() => {
        this.handleClick();
      }, 1500);
    }
  }
}
