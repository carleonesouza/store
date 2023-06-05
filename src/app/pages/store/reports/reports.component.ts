import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Caixa } from 'app/models/caixa';
import { StoreService } from 'app/pages/store/store.service';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Caixa>;
  dataSource: MatTableDataSource<Caixa>;
  displayedColumns: string[] = ['pagamento', 'produto', 'usuario', 'total', 'data'];
 
 
  caixas: Caixa[] = [];
  data: Caixa;
  loading = true;
  caixa$: Observable<Caixa>;
  caixas$: Observable<Caixa[]>;
  caixaDay$: Observable<Caixa>;

 
  constructor(private _storeService: StoreService) { }
 

  ngOnInit(): void {
    this.loading = true;
   
  }


  ngAfterViewInit(): void {
    this.caixas$ = this._storeService.getCaixas();
    const user = JSON.parse(localStorage.getItem('user'));
    const date = _moment().format('L');
    this.caixaDay$ = this._storeService.getCaixaToday(user?._id, date);

    this.caixaDay$.subscribe((data: Caixa) =>{
      console.log(data)
      this.caixas.push(data)
      this.dataSource = new MatTableDataSource<Caixa>([data])
      this.loading = false;
   
    })

   
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
