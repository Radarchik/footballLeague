import {Club} from '../objects/club';
import {Market} from '../objects/market';

export interface League {
  name: string;
  clubs: Club[];
  footballMarket: Market;
  addClub(club: Club);
  removeCLub(club: Club);
  resetClub(club: Club);
}
