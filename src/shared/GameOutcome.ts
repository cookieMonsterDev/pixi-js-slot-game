
export interface GameOutcome {
  outCome: number[];
  winType: string;
  bonus: boolean;
}

export interface SpinParams {
  symbolsQuantity: number;
  bottomBorder: number;
  topBorder: number;
}
