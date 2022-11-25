import * as PIXI from 'pixi.js';

export default class WinAinmation {
  public container: PIXI.Container;
  private overlay!: PIXI.Graphics;
  private winText: PIXI.Text;
  private winType: string;
  private bonus: PIXI.Text;
  private bonusText: string;

  constructor(app: PIXI.Application, winType: string, bonusText: string) {
    this.winType = winType;
    this.bonusText = bonusText;
    this.bonus = new PIXI.Text();
    this.winText = new PIXI.Text();
    this.container = new PIXI.Container();
    this.generate(app.screen.width, app.screen.height);
  }

  private generate(appWidth: number, appHeight: number) {
    this.container.visible = false;

    this.overlay = new PIXI.Graphics();
    this.overlay.beginFill(0xffffff, 0.001);
    this.overlay.drawRect(0, 0, appWidth, appHeight);
    this.overlay.endFill();
    this.overlay.interactive = true;
    this.overlay.buttonMode = true;
    this.overlay.cursor = 'default';

    const rect = new PIXI.Graphics();
    rect.beginFill(0x02474e, 0.8);
    rect.drawRect(0, 0, 717.5, 400);
    rect.x = 70;
    rect.y = (appHeight - rect.height) / 2;
    rect.endFill();

    const styleWin = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 96,
      fill: 'yellow',
    });

    const styleBonus = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 'yellow',
    });

    this.winText.style = styleWin;
    this.winText.text = this.winType;
    this.winText.x = rect.width / 2 - (this.winText.width + 100);
    this.winText.y = (appHeight - this.winText.height) / 2;

    this.bonus.style = styleBonus;
    this.bonus.text = this.bonusText;
    this.bonus.x = (rect.width - this.winText.width) / 2
    this.bonus.y = (appHeight - this.winText.height) + 20;

    this.container.addChild(rect, this.winText, this.overlay, this.bonus);
  }

  public show(winText: string, bonus: boolean) {
    this.container.visible = true;
    this.winText.text = winText;
    this.bonus.text = bonus ? 'You won bonus' : '';
  }

  public hide() {
    this.container.visible = false;
  }
}
