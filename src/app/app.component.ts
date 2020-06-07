import {Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {Club} from './objects/club';
import {UkraineLeague} from './objects/ukraine-league';
import {League} from './interfaces/league';
import {Goalkeeper} from './objects/persons/goalkeeper';
import {Defender} from './objects/persons/defender';
import {Halfback} from './objects/persons/halfback';
import {Forward} from './objects/persons/forward';
import {Market} from './objects/market';
import {SaleUnit} from './objects/sale-unit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'football';
  public league: League;
  public chosenClub: Club;
  allPlayers: Player[];
  allClubsJson: Club[];
  private sheetNumber = 0;
  public componentToDisplay = 'league';
  ngOnInit() {
    this.readInitFile();
  }

  readInitFile() {
    const url = 'assets/InitFile.xlsx';
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'arraybuffer';
    req.onload = (e) => {
      const data = new Uint8Array(req.response);
      const workbook = XLSX.read(data, {type: 'array'});
      const firstSheetName = workbook.SheetNames[this.sheetNumber];
      const worksheet = workbook.Sheets[firstSheetName];
      if (this.sheetNumber === 0) {
        this.allPlayers = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        this.allPlayers = this.allPlayers.map(player => (this.createPlayerWithRole(player)));
        this.sheetNumber++;
        this.readInitFile();
      } else if (this.sheetNumber === 1) {
        this.allClubsJson = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        this.sheetNumber++;
        this.readInitFile();
      } else {
        this.initLeague();
      }
    };
    req.send();
  }

  private initLeague() {
   const allClubInstances: Club[] = [];
   for (const clubJson of this.allClubsJson) {
      const clubInstance = this.createInstanceFromJson(clubJson);
      const playersOfClub = this.allPlayers.filter(player => player.club === clubInstance.name);
      clubInstance.players = playersOfClub;
      allClubInstances.push(clubInstance);
    }
   const playersForSale = this.allPlayers.filter(player => player.isPlayerForSale);
   const footballMarket = new Market(playersForSale);

   this.league = new UkraineLeague(allClubInstances, footballMarket);
   console.log(this.league);
  }


  private createPlayerWithRole(player: Player): Player {
    let playerWithRole;
    if (player.role === 'goalkeeper') {
      playerWithRole = new Goalkeeper();
    } else if (player.role === 'defender') {
      playerWithRole = new Defender();
    } else if (player.role === 'halfback') {
      playerWithRole = new Halfback();
    } else if (player.role === 'forward') {
      playerWithRole = new Forward();
    }
    playerWithRole.indNumber = player.indNumber;
    playerWithRole.name = player.name;
    playerWithRole.role = player.role;
    playerWithRole.skills = player.skills;
    playerWithRole.age = player.age;
    playerWithRole.weight = player.weight;
    playerWithRole.height = player.height;
    playerWithRole.country = player.country;
    playerWithRole.club = player.club;
    playerWithRole.salary = player.salary;
    playerWithRole.marketCost = player.marketCost;
    playerWithRole.isPlayerForSale = player.isPlayerForSale;
    return playerWithRole;
  }


  private createInstanceFromJson(clubJson: Club) {
    const clubInstance = new Club();
    clubInstance.name = clubJson.name;
    clubInstance.president = clubJson.president;
    clubInstance.coach = clubJson.coach;
    clubInstance.budget = clubJson.budget;
    clubInstance.stadium = clubJson.stadium;
    clubInstance.year = clubJson.year;
    clubInstance.image = clubJson.image;
    clubInstance.balance = 0;
    return clubInstance;
  }

  choseClubForDisplay($event: any) {
    this.chosenClub = $event;
    this.componentToDisplay = 'club';
  }

  displayLeague($event: any) {
    this.componentToDisplay = 'league';
  }
  displayMarket($event: any) {
    this.componentToDisplay = 'market';
  }

  salePlayer($event: SaleUnit) {
    const player = $event.soldPlayer;
    const buyerClub = $event.buyerClub;
    player.isPlayerForSale = false;
    this.league.footballMarket.deletePlayer(player);

    if (player.club === 'вільний агент') {
      buyerClub.addPlayer(player);
      this.league.resetClub(buyerClub);

    } else {
      const clubSeller = this.league.clubs.find(cl => cl.name === player.club);
      clubSeller.deletePlayer(player);
      this.league.resetClub(clubSeller);
      buyerClub.addPlayer(player);
      this.league.resetClub(buyerClub);
    }
    this.componentToDisplay = 'league';
  }
}
