import {Club} from './club';
import {League} from '../interfaces/league';
import {Market} from './market';


export class UkraineLeague implements League {
  name: string;
  clubs: Club[];
  footballMarket: Market;

  constructor(clubs: Club[], footballMarket: Market) {
    this.name = 'УКРАЇНСЬКА ПРЕМ`ЄР-ЛІГА';
    this.clubs = clubs;
    this.footballMarket = footballMarket;
  }

  addClub(club: Club) {
    this.clubs.push(club);
  }

  removeCLub(club: Club) {
      this.clubs = this.clubs.filter(x => x.name !== club.name);
  }

  resetClub(club: Club) {
    const clubToReset = this.clubs.find(cl => cl.name === club.name);
    const index = this.clubs.indexOf(clubToReset);
    this.clubs[index] = club;
  }


}
