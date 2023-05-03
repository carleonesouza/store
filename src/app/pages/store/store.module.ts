import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseSplashScreenModule } from '@fuse/services/splash-screen';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialAppModule } from 'material-app.module';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StoreComponent } from './store.component';
import { VendasComponent } from './vendas/vendas.component';
import { CaixaComponent } from './caixa/caixa.component';
import { storeRoutes } from './store.routes';
import { FuseCardModule } from '@fuse/components/card';
import { ProductsService } from '../admin/products/products.service';
import { HandleError } from '../../utils/handleErrors';


export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [
    StoreComponent,
    VendasComponent,
    CaixaComponent
  ],
  imports: [
    CommonModule,
    FuseNavigationModule,
    RouterModule.forChild(storeRoutes),
    SharedModule,
    FuseCardModule,
    FuseSplashScreenModule,
    NgApexchartsModule,
    FuseFindByKeyPipeModule,
    MaterialAppModule,
    FuseNavigationModule,
    FuseFindByKeyPipeModule,
    FuseAlertModule,
    CurrencyMaskModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' },{
    provide: MAT_DATE_FORMATS,
    useValue: {
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      }
    }
  }, ProductsService, HandleError, CurrencyPipe,
  { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }]
})
export class StoreModule { }
