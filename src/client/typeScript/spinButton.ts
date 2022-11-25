import * as PIXI from 'pixi.js';

export default class SpinButton {
  public readonly sprite: PIXI.Sprite;
  private readonly onClick: () => void;
  private readonly defaultTexture: PIXI.Texture;
  private readonly activeTexture: PIXI.Texture;
  private readonly disabledTexture: PIXI.Texture;
  private readonly hoverTexture: PIXI.Texture;

  constructor(app: PIXI.Application, onClick: () => void) {
    this.onClick = onClick;
    this.defaultTexture = PIXI.Texture.from('spinButton');
    this.activeTexture = PIXI.Texture.from('spinButtonDown');
    this.disabledTexture = PIXI.Texture.from('spinButtonDisabled');
    this.hoverTexture = PIXI.Texture.from('spinButtonHover');

    this.sprite = new PIXI.Sprite(this.defaultTexture);
    this.init(app.screen.width, app.screen.height);
  }

  // Button states
  setDefault() {
    this.sprite.texture = this.defaultTexture;
    this.sprite.interactive = true;
  }

  setActive() {
    this.sprite.texture = this.activeTexture;
    this.sprite.interactive = true;
  }

  setDisabled() {
    this.sprite.texture = this.disabledTexture;
    this.sprite.interactive = false;
  }

  setHover() {
    this.sprite.texture = this.hoverTexture;
    this.sprite.interactive = true;
  }

  private init(appWidth: number, appHeight: number) {
    this.sprite.x = appWidth - (this.sprite.width + 37.25);
    this.sprite.y = (appHeight - this.sprite.height) / 2;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;

    // Mouse events
    this.sprite.on('pointerdown', () => {
      this.setActive();
    });
    this.sprite.on('pointerup', () => {
      this.setDefault();
      this.onClick();
    });
    this.sprite.on('mouseover', () => {
      this.setHover();
    });
    this.sprite.on('mouseout', () => {
      this.setDefault();
    });
  }
}
