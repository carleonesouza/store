import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialAppModule } from 'material-app.module';
import { pagesRoutes } from './pages.routes';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';

import { HomeComponent } from './home/home.component';
import { DashboardAtendimentosComponent } from './dashboard/atendimentos/atendimentos.component';
import { DashboardNpsComponent } from './dashboard/nps/nps.component';
import { DashboardEquipesComponent } from './dashboard/equipes/equipes.component';
import { PageComponent } from './page.component';
import { PagesService } from './pages.service';
import { FuseSplashScreenModule } from '@fuse/services/splash-screen';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PacienteComponent } from './paciente/paciente.component';
import { SharedModule } from 'app/shared/shared.module';

import { AuthInterceptor } from 'app/core/auth/auth.interceptor';

registerLocaleData(localePt, 'pt-BR');



export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
const maskConfig: Partial<IConfig> = { validation: false};




@NgModule({
  declarations: [
    HomeComponent,
    DashboardAtendimentosComponent,
    DashboardNpsComponent,
    DashboardEquipesComponent,
    PageComponent,
    PacienteComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(pagesRoutes),
    NgxMaskModule.forRoot(maskConfig),
    FuseNavigationModule,
    FuseLoadingBarModule,
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
  }, PagesService,  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class PagesModule { }
