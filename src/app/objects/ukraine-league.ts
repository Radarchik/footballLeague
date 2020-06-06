import {Club} from './club';

export class UkraineLeague implements League {
  name: 'УКРАЇНЬСКА ПРЕМ`ЄР-ЛІГА';
  private clubs: Club[];


  constructor() {
    this.clubs = [];
  }

  addClub(club: Club) {
    this.clubs.push(club);
  }


}
