import {President} from './persons/president';
import {Coach} from './persons/coach';

export class Club {
  name: string;
  president: President;
  coach: Coach;
  stadium: string;
  year: number;
  players: Player[] = [];
  budget: number;
  image: string;
  balance: number;



  addPlayer(player: Player) {
    this.players.push(player);
    this.changeBalance(-player.marketCost);
  }

  deletePlayer(player: Player) {
    this.players = this.players.filter(x => x.indNumber !== player.indNumber);
    this.changeBalance(player.marketCost);
  }

  get expenses(): number {
    let yearExpenses = 0;
    this.players.forEach(player => yearExpenses = yearExpenses + player.salary);
    return yearExpenses;
  }

  private changeBalance(playerCost: number) {
    this.balance = this.balance + playerCost;
  }
}
