import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { Error401Component } from 'app/shared/error/error-401/error-401.component';
import { Error500Component } from 'app/shared/error/error-500/error-500.component';


export const pagesRoutes: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'inicio',
                component: HomeComponent

            },
            {
                path: '',
                component: LayoutComponent,
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path:'', loadChildren: () => import('app/pages/admin/admin.module').then(admin => admin.AdminModule),
                    },
                    {
                        path:'', loadChildren: () => import('app/pages/store/store.module').then(store => store.StoreModule),
                    }
                ]
            },
            {
                path: '', loadChildren: () => import('app/pages/profile/profile.module').then(p => p.ProfileModule),
            },
             // Documents
             {path: 'docs', loadChildren: () => import('app/pages/docs/docs.module').then(m => m.DocsModule)},
               // 404 & Catch all
            { path: '401-unauthorized', component: Error401Component},
            { path: 'error-500', component: Error500Component},
        ]
    },
];
