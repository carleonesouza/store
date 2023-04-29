import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { DocsComponent } from './docs.component';
import { docsRoutes } from './docs.routing';



@NgModule({
    declarations: [
        DocsComponent
    ],
    imports     : [
        RouterModule.forChild(docsRoutes),
        SharedModule
    ]
})
export class DocsModule
{
}
