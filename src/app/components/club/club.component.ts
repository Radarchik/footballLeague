import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Club} from '../../objects/club';
import {MatSort, MatTableDataSource} from '@angular/material';
import {of} from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() club: Club;
  @Output() backEvent = new EventEmitter();
  @Output() marketEvent = new EventEmitter();
  displayedColumns: string[] = ['name', 'role', 'skills', 'age', 'weight', 'height', 'country', 'salary', 'marketCost'];
  dataSource;
  filterValues = {};
  filterSelectObj = [];


  constructor() {
    // Object to create Filter for
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
    this.dataSource = new MatTableDataSource(this.club.players);
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();

    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.club.players, o.columnProp);
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

  goToMarket() {
    this.marketEvent.emit(this.club);
  }
}
