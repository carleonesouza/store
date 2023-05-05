import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
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
import { StoreService } from './store.service';
import { CaixaDetailsComponent } from './caixa/details/details.component';
import { StoreResolver } from './store.resolve';
import { HttpClientModule } from '@angular/common/http';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';


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
    CaixaComponent,
    CaixaDetailsComponent
  ],
  imports: [
    CommonModule,
    FuseNavigationModule,
    HttpClientModule,
    RouterModule.forChild(storeRoutes),
    SharedModule,
    FuseDrawerModule,
    FuseCardModule,
    FuseSplashScreenModule,
    NgApexchartsModule,
    FuseFindByKeyPipeModule,
    MaterialAppModule,
    FuseNavigationModule,
    FuseFindByKeyPipeModule,
    FuseAlertModule,
    CurrencyMaskModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    FuseFindByKeyPipeModule,
    SharedModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-br' }, ProductsService, HandleError, CurrencyPipe, StoreService,
  { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }, {provide: StoreResolver}]
})
export class StoreModule { }
