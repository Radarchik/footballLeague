import {Club} from './club';

export class SaleUnit {
  soldPlayer: Player;
  buyerClub: Club;


  constructor(soldPlayer: Player, buyerClub: Club) {
    this.soldPlayer = soldPlayer;
    this.buyerClub = buyerClub;
  }
}
