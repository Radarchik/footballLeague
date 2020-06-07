export class Market {
  name = 'ТРАНСФЕРНИЙ РИНОК ФУТБОЛІСТІВ';
  private _playersOnMarket: Player[];

  constructor(playersOnMarker: Player[]) {
    this._playersOnMarket = playersOnMarker;
  }

  addPlayer(player: Player) {
    this._playersOnMarket.push(player);
  };

  deletePlayer(player: Player) {
    this._playersOnMarket = this._playersOnMarket.filter(x => x.indNumber !== player.indNumber);
  }


  get playersOnMarket(): Player[] {
    return this._playersOnMarket;
  }
}
