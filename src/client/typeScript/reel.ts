import * as PIXI from 'pixi.js';

export default class Reel {
  public readonly container: PIXI.Container;
  public readonly textures!: Array<PIXI.Texture>;
  public sprite!: PIXI.Sprite;
  private readonly appHeight: number;
  private readonly ticker: PIXI.Ticker;

  constructor(app: PIXI.Application, position: number) {
    this.appHeight = app.screen.height;
    this.ticker = app.ticker;
    this.container = new PIXI.Container();
    this.textures = [
      PIXI.Texture.from('SYM0'),
      PIXI.Texture.from('SYM1'),
      PIXI.Texture.from('SYM2'),
      PIXI.Texture.from('SYM3'),
      PIXI.Texture.from('SYM4'),
      PIXI.Texture.from('SYM5'),
    ];
    this.generate(position);
  }

  private generate(position: number) {
    const REEL_WIDTH = 230;
    const REEL_OFFSET_BETWEEN = 10;
    this.container.x = position * REEL_WIDTH;

    const symbol = new PIXI.Sprite(
      this.textures[Math.floor(Math.random() * this.textures.length)]
    );
    symbol.scale.set(0.8);
    const widthDiff = REEL_WIDTH - symbol.width;
    symbol.x = position * REEL_OFFSET_BETWEEN + widthDiff / 2;
    symbol.y = (this.appHeight - symbol.height) / 2;
    this.sprite = symbol;
    this.container.addChild(symbol);
  }

  public spinOneTime(position: number) {
    const tick = () => {
      this.sprite.texture =
        this.textures[Math.floor(Math.random() * this.textures.length)];
    };

    const setOutcome = setTimeout(() => {
      this.sprite.texture = this.textures[position];
      this.ticker.remove(tick);
    }, 1300);

    this.ticker.add(tick);

    return () => {
      clearTimeout(setOutcome);
    };
  }
}
