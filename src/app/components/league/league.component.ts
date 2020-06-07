import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {League} from '../../interfaces/league';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Club} from '../../objects/club';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() league: League;
  @Output() choseClub = new EventEmitter();
  displayedColumns: string[] = ['number', 'name', 'cost', 'president', 'coach', 'budget', 'expenses', 'balance'];
  dataSource;
  chosenClub: Club;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.league.clubs);
    this.dataSource.sort = this.sort;
  }

  getRecord(club: Club) {
    this.chosenClub = club;
    this.choseClub.emit(this.chosenClub);
    console.log(this.chosenClub);
  }

  calculateAllPlayersCost(club: Club): number {
    return club.players.map(a => a.marketCost).reduce((a, b) => a + b);
  }
}
