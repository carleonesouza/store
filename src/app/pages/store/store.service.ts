import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, first, map, of, take, tap } from 'rxjs';
import { Caixa } from 'app/models/caixa';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HandleError } from 'app/utils/handleErrors';
import { environment } from 'environments/environment';
import { Venda } from 'app/models/vendas';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _caixas: BehaviorSubject<any[] | null> = new BehaviorSubject(null);
  private _caixa: BehaviorSubject<any | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient, private error: HandleError, public _snackBar: MatSnackBar) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get caixas$(): Observable<Caixa[]> {
    return this._caixas.asObservable();
  }

  get caixa$(): Observable<Caixa> {
    return this._caixa.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  getCaixas(page = 0, size = 10): Observable<Caixa[]> {
    return this._httpClient.get<Caixa[]>(environment.apiManager + 'cashies', { params: { page, size } })
      .pipe(
        take(1),
        tap((result) => {
          this._caixas.next(result);
        }),
        catchError(this.error.handleError<Caixa[]>('getCaixas'))
      );
  }

  getCaixaToday(id): Observable<Caixa> {
    return this._httpClient.get<Caixa>(environment.apiManager + 'cashies/user/' + id)
      .pipe(catchError(this.error.handleError<Caixa>('getCaixas')));
  }

  getCaixaById(id) {
    return this._httpClient.get<Caixa>(environment.apiManager + 'cashies/' + id)
      .pipe(
        first(),
        tap((caixa) => {
          this._caixa.next(caixa);
        }),
        catchError(this.error.handleError<Caixa>('getCaixaById'))
      );
  }


  addCaixaDay(caixa): Observable<Caixa> {
    return this._httpClient.post<Caixa>(environment.apiManager + 'cashies', caixa)
      .pipe(
        tap((result) => {
          localStorage.setItem('caixaId', result?._id);
          this._caixa.next(result);
        }),
        catchError(this.error.handleError<Caixa>('addCaixa'))
      );
  }

  addVendaCaixa(caixa: any) {
    if (!localStorage.getItem('caixaId')) {
      this._snackBar.open('Não existe caixa aberto, Favor abrir caixa antes de realizar a venda!');
      catchError(this.error.handleError<Caixa>('AddVendaCaixa'));
    } else {
      return this._httpClient.put<Caixa>(environment.apiManager + 'cashies/' + localStorage.getItem('caixaId'), caixa)
        .pipe(
          tap((result) => {
            console.log(result);
            this._caixa.next(result);
          }),
          catchError(this.error.handleError<Caixa>('addVendaCaixa'))
        );
    }
  }

  createVenda(venda: any){
    if (!localStorage.getItem('caixaId')) {
      this._snackBar.open('Não existe caixa aberto, Favor abrir caixa antes de realizar a venda!');
      catchError(this.error.handleError<Venda>('createVenda'));
    } else {
      return this._httpClient.post<Venda>(environment.apiManager + 'orders', venda)
        .pipe(
          tap((result) => {
            console.log(result);
            this._caixa.next(result);
          }),
          catchError(this.error.handleError<Venda>('createVenda'))
        );
    }
  }
}
