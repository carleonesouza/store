import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
  OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductsService } from 'app/pages/admin/products/products.service';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  pgtoCtrl = new FormControl('');
  filteredPag: Observable<string[]>;
  formas: string[] = [];
  allFormas: string[] = ['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX'];
  slider: KeenSliderInstance = null;
  products: any[];
  products$: Observable<any[]>;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,  private _productsService: ProductsService) {
    this.filteredPag = this.pgtoCtrl.valueChanges.pipe(
      startWith(null),
      map((formas: string | null) => (formas ? this._filter(formas) : this.allFormas.slice())),
    );
  }


  ngOnInit(): void {
    this.products$ = this._productsService.getAllProducts();
  }

  ngAfterViewInit() {
    this.products$.subscribe(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement);
    });

  }

  ngOnDestroy() {
    if (this.slider) {this.slider.destroy();}
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
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
    this.pagamentoInput.nativeElement.value = '';
    this.pgtoCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFormas.filter(forma => forma.toLowerCase().includes(filterValue));
  }

}
