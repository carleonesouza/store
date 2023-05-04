import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  Input,
  OnDestroy, OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Produto } from 'app/models/produto.model';
import { Venda } from 'app/models/vendas';
import { ProductsService } from 'app/pages/admin/products/products.service';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { random } from 'lodash';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['../../../../../node_modules/keen-slider/keen-slider.min.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendasComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;
  @ViewChild('pagamentoInput') pagamentoInput: ElementRef<HTMLInputElement>;
  @Input() vendaForm: FormGroup;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pgtoCtrl = new FormControl('');
  filteredPag: Observable<string[]>;
  formas: string[] = [];
  selectedProducts: Produto[] = [];
  allFormas: string[] = ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX'];
  slider: KeenSliderInstance = null;
  products: any[];
  products$: Observable<any[]>;
  isLinear = true;
  venda: Venda;
  today: number = Date.now();

  constructor(private _formBuilder: FormBuilder, private _productsService: ProductsService) {
    this.createVendasForm();
    this.filteredPag = this.pgtoCtrl.valueChanges.pipe(
      startWith(null),
      map((formas: string | null) => (formas ? this._filter(formas) : this.allFormas.slice())),
    );

    this.vendaForm.get('valorPago').valueChanges.subscribe((value) =>{
      if(this.selectedProducts.length > 0){
        this.vendaForm.get('troco').patchValue(this._calcVendaTroco(this.selectedProducts, value));
      }
    });

    this.vendaForm.get('nvenda').setValue('NV' + Math.floor(100000 + Math.random() * 900000));

  }

  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
  };

  ngOnInit(): void {
    this.products$ = this._productsService.getAllProducts();
  }

  ngAfterViewInit() {
    this.products$.subscribe(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement);
    });

  }

  ngOnDestroy() {
    if (this.slider) { this.slider.destroy(); }
  }

  createVendasForm() {
    this.vendaForm = this._formBuilder.group({
      id: new FormControl(''),
      nvenda: new FormControl(),
      produtos: new FormControl([], Validators.required),
      total: new FormControl(),
      formaPagamento: new FormControl(''),
      valorPago: new FormControl(),
      troco: new FormControl(),
      user: new FormControl(),
      status: new FormControl(true),
    });
  }

  boughtsProducts(product) {
    if (product) {
      this.selectedProducts.push(product);
      this.vendaForm.patchValue({
        produtos: this.selectedProducts,
        total: this._calcVendaValue(this.selectedProducts),
        user: JSON.parse(localStorage.getItem('user'))
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.formas.push(value);
    }

    // Clear the input value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    event.chipInput!.clear();

    this.pgtoCtrl.setValue(null);
  }

  remove(forma: string): void {
    const index = this.formas.indexOf(forma);

    if (index >= 0) {
      this.formas.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.formas.push(event.option.viewValue);
    this.pgtoCtrl.valueChanges.subscribe(() => {
      if (event.option.viewValue.localeCompare('Dinheiro') === 0) {
        this.vendaForm.controls['valorPago'].enable();
        this.vendaForm.controls['troco'].enable();
      } else {
        this.vendaForm.controls['valorPago'].disable();
        this.vendaForm.controls['troco'].disable();
      }
    });

    this.pagamentoInput.nativeElement.value = '';
    this.pgtoCtrl.setValue(null);

  }


  createInvoice(formGroup: FormGroup){

    this.venda = new Venda(formGroup.value);
    this.venda.formaPagamnto = this.formas[0];
    console.log(this.formas);
  }

  fecharVenda() {
    if (this.formas.length > 0) {

        this.vendaForm.get('formaPagamento').patchValue(this.formas[0]);

      console.log(this.vendaForm.value);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allFormas.filter(forma => forma.toLowerCase().includes(filterValue));
  }

  private _calcVendaValue(products: Array<Produto>): number {
    return products.reduce((a, b) => a + b.price, 0);
  }

  private _calcVendaTroco(products: Array<Produto>, valorPago: number): number {

    const total = this._calcVendaValue(products);
    const valor = valorPago > total ? valorPago - total : 0;
    return valor;

  }



}
