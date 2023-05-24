import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Caixa } from 'app/models/caixa';
import { StoreService } from 'app/pages/store/store.service';
import { Observable } from 'rxjs';
import * as _moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

 
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  @ViewChild('reportTable', { read: MatSort }) reportTableTableMatSort: MatSort;

  caixas: Caixa[];
  caixa$: Observable<Caixa>;
  caixas$: Observable<Caixa[]>;
  caixaDay$: Observable<Caixa>;


  reportTableDataSource: MatTableDataSource<any> = new MatTableDataSource();
  reportTableTableColumns: string[] = ['pagamento', 'produto', 'usuario', 'total', 'data'];

  constructor(private _storeService: StoreService) { }

  ngOnInit(): void {

    this.caixas$ = this._storeService.getCaixas();
    const user = JSON.parse(localStorage.getItem('user'));
    const date = _moment().format('L');
    this.caixaDay$ = this._storeService.getCaixaToday(user?._id, date);
  }

     /**
      * Track by function for ngFor loops
      *
      * @param index
      * @param item
      */
     trackByFn(index: number, item: any): any {
      return item.id || index;
  }

}
