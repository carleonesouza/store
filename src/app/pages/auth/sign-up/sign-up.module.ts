import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { SharedModule } from 'app/shared/shared.module';
import { AuthSignUpComponent } from 'app/pages/auth/sign-up/sign-up.component';
import { authSignupRoutes } from 'app/pages/auth/sign-up/sign-up.routing';
import { CpfValidatorDirective } from 'app/cpf-validator.directive';
import { IConfig, NgxMaskModule } from 'ngx-mask';

const maskConfig: Partial<IConfig> = { validation: false};

@NgModule({
    declarations: [
        AuthSignUpComponent,
        CpfValidatorDirective
    ],
    imports     : [
        RouterModule.forChild(authSignupRoutes),
        NgxMaskModule.forRoot(maskConfig),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        SharedModule
    ]
})
export class AuthSignUpModule
{
}