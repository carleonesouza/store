import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { FuseSplashScreenModule } from '@fuse/services/splash-screen';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialAppModule } from 'material-app.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StoreComponent } from './store.component';
import { VendasComponent } from './vendas/vendas.component';
import { CaixaComponent } from './caixa/caixa.component';




@NgModule({
  declarations: [
    StoreComponent,
    VendasComponent,
    CaixaComponent
  ],
  imports: [
    CommonModule,
    FuseNavigationModule,
    SharedModule,
    FuseSplashScreenModule,
    NgApexchartsModule,
    FuseFindByKeyPipeModule,
    MaterialAppModule,
    FuseNavigationModule,
    FuseFindByKeyPipeModule,
    FuseAlertModule
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
  }, ]
})
export class StoreModule { }