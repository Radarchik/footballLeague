import {Player} from './player';

export class Goalkeeper implements Player {
  indNumber: number;
  name: string;
  role: string;
  skills: number;
  age: number;
  weight: number;
  height: number;
  country: string;
  club: string;
  salary: number;
  marketCost: number;

  work() {
    console.log('I defence team`s gate');
  }
}
