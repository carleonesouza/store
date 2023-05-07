import { Route } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';

export const settingsRoutes: Route[] = [
    {
        path     : '',
        component: SettingsComponent,
        children:[
            {
                path:'perfil', loadChildren: () => import('app/pages/admin/settings/roles/roles.module').then(roles => roles.RolesModule),
            },
        ]
    }
];
