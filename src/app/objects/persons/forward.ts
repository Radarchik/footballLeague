export class Forward implements Player {
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
    console.log('I attack the opponent’s gate and score goals');
  }
}
