import * as PIXI from 'pixi.js';
/////////SPIN BUTTON ASSETS///////////////
import spinButton from '../../../public/images/spinButton.png';
import spinButtonDisabled from '../../../public/images/spinButtonDisabled.png';
import spinButtonDown from '../../../public/images/spinButtonDown.png';
import spinButtonHover from '../../../public/images/spinButtonHover.png';
/////////SYMBOLS ASSETS//////////////////
import SYM0 from '../../../public/images/SYM0.png';
import SYM1 from '../../../public/images/SYM1.png';
import SYM2 from '../../../public/images/SYM2.png';
import SYM3 from '../../../public/images/SYM3.png';
import SYM4 from '../../../public/images/SYM4.png';
import SYM5 from '../../../public/images/SYM5.png';

export default class Loader {
    public loader: PIXI.Loader;
  
    constructor(app: PIXI.Application, onAssetsLoaded: () => void) {
        this.loader = app.loader;
        this.loadAssets();
        this.loader.load(() => {
            onAssetsLoaded();
        });
    }

    private loadAssets() {
        this.loader
          .add('spinButton', spinButton)
          .add('spinButtonDisabled', spinButtonDisabled)
          .add('spinButtonDown', spinButtonDown)
          .add('spinButtonHover', spinButtonHover)
          .add('SYM0', SYM0)
          .add('SYM1', SYM1)
          .add('SYM2', SYM2)
          .add('SYM3', SYM3)
          .add('SYM4', SYM4)
          .add('SYM5', SYM5);
    }
}