import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { Caixa } from 'app/models/caixa';
import { CaixaComponent } from '../caixa.component';
import { Venda } from 'app/models/vendas';



@Component({
    selector       : 'contacts-details',
    templateUrl    : './details.component.html',
    styleUrls      : ['./details.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaixaDetailsComponent implements OnInit, OnDestroy
{

    editMode: boolean = false;
    tagsEditMode: boolean = false;
    caixa: Caixa;
    caixaForm: FormGroup;
    caixas: Caixa[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _caixaComponent: CaixaComponent,
        private _formBuilder: FormBuilder)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this._caixaComponent.matDrawer.open();


        // Create the caixa form
        this.caixaForm = this._formBuilder.group({
            id: new FormControl(''),
            user: new FormControl(''),
            vendas: new FormControl(Array<Venda>()),
            valorAbertura: new FormControl('',Validators.required),
            valorFechamento: new FormControl(''),
            criadoEm: new FormControl(''),
            fechadoEm: new FormControl(''),
            status: new FormControl(true)
        });



    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
     closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._caixaComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void
    {
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
