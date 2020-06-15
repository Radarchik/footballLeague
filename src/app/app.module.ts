import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClubComponent } from './components/club/club.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule, MatTooltipModule
} from '@angular/material';
import { LeagueComponent } from './components/league/league.component';
import { MarketComponent } from './components/market/market.component';
import {FormsModule} from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {DxDataGridModule, DxRangeSelectorModule} from 'devextreme-angular';


registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    ClubComponent,
    LeagueComponent,
    MarketComponent,
    DialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    DxRangeSelectorModule,
    DxDataGridModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }],
  entryComponents: [AppComponent, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
