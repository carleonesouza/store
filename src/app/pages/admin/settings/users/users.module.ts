import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialAppModule } from 'material-app.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { UsersService } from './users.service';
import { AuthInterceptor } from 'app/core/auth/auth.interceptor';
import { HandleError } from 'app/utils/handleErrors';
import { UserResolver, UsersResolver } from './users.resolver';



@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialAppModule,
    CurrencyMaskModule
  ],
  providers:[
    UsersResolver,
    UsersService,
    UserResolver,
    HandleError,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class UsersModule { }
