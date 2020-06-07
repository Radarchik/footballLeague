import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {League} from '../../interfaces/league';
import {Club} from '../../objects/club';
import {Market} from '../../objects/market';
import {DialogComponent} from '../dialog/dialog.component';
import {SaleUnit} from '../../objects/sale-unit';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input()   public footballMarket: Market;
  @Input()   public clubWantedToBuy: Club;
  @Output() backEvent = new EventEmitter();
  @Output() saleEvent = new EventEmitter();
  playersForSale: Player[];
  displayedColumns: string[] = ['name', 'club', 'role', 'skills', 'age', 'weight', 'height', 'country', 'salary', 'marketCost', 'sale'];
  dataSource;
  filterValues = {};
  filterSelectObj = [];


  constructor(public dialog: MatDialog) {
    this.filterSelectObj = [
      {
        name: 'ІМ`Я',
        columnProp: 'name',
        options: [],
        modelValue: undefined
      }, {
        name: 'АМПЛУА',
        columnProp: 'role',
        options: [],
        modelValue: undefined
      }, {
        name: 'НАВИЧКИ',
        columnProp: 'skills',
        options: [],
        modelValue: undefined
      },
      {
        name: 'ВІК',
        columnProp: 'age',
        options: [],
        modelValue: undefined
      },
      {
        name: 'ВАГА',
        columnProp: 'weight',
        options: []
      },
      {
        name: 'ЗРІСТ',
        columnProp: 'height',
        options: []
      }, {
        name: 'КРАЇНА',
        columnProp: 'country',
        options: [],
        modelValue: undefined
      },
      {
        name: 'ЗАРПЛАТА',
        columnProp: 'salary',
        options: [],
        modelValue: undefined
      },
      {
        name: 'Ринкова вартість',
        columnProp: 'marketCost',
        options: [],
        modelValue: undefined
      }
    ];
  }

  ngOnInit() {
    this.playersForSale = this.footballMarket.playersOnMarket.filter(player => player.club !== this.clubWantedToBuy.name);
    this.dataSource = new MatTableDataSource(this.playersForSale );
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();

    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.playersForSale, o.columnProp);
    });
  }

  // Get Uniq values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }


  // Called on Filter change
  filterChange(filterData, event) {
    this.filterValues[filterData.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }




  createFilter() {
    const filterFunction = (player: any, filterData: string): boolean => {
      const searchTerms = JSON.parse(filterData);
      for (const col in searchTerms) {
        if (searchTerms[col].toString().toLowerCase() !== player[col].toString().toLowerCase() && searchTerms[col] !== '') {
          return false;
        }
      }
      return true;

    };
    return filterFunction;
  }

  // Reset table filters
  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
  }

  goToLeague() {
    this.backEvent.emit('');
  }

  buyPlayer(player: Player) {
    let isPlayerSold;
    let dataForDialog = '';
    const allPlayersSalary = this.clubWantedToBuy.players.map(a => a.salary).reduce((a, b) => a + b);
    if (player.marketCost + player.salary > this.clubWantedToBuy.budget - allPlayersSalary) {
      isPlayerSold = false;
      dataForDialog = 'Клуб не має достатньо коштів для купівлі гравця або виплати йому заробітної плати';
    } else {
      isPlayerSold = true;
      dataForDialog = 'Вітаємо! Ваш клуб успішно купив даного гравця.';
    }

    let confirmDialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      panelClass: 'custom-mat-dialog',
      data: dataForDialog
    });
    confirmDialogRef.afterClosed().subscribe(result => {
      if (isPlayerSold) {
        confirmDialogRef = null;
        this.saleEvent.emit(new SaleUnit(player, this.clubWantedToBuy));
      }
    });
  }

}
