export class Defender implements Player {
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
  isPlayerForSale: boolean;

  work() {
    return 'I defence area near my team`s gate';
  }
}
