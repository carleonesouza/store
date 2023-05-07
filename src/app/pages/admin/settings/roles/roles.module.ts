import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { ListRolesComponent } from './list-roles/list-roles.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RolesService } from './roles.service';
import { RoleIdResolver, RolesResolver } from './roles.resolver';
import { SharedModule } from 'app/shared/shared.module';
import { MaterialAppModule } from 'material-app.module';
import { HandleError } from 'app/utils/handleErrors';


@NgModule({
  declarations: [
    RolesComponent,
    ListRolesComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialAppModule,
    SharedModule,
  ],
  providers:[RolesService, RolesResolver, RoleIdResolver, HandleError]
})
export class RolesModule { }
