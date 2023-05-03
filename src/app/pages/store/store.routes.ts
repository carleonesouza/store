import { Route } from '@angular/router';
import { StoreComponent } from './store.component';
import { CaixaComponent } from './caixa/caixa.component';
import { VendasComponent } from './vendas/vendas.component';
import { LayoutComponent } from 'app/layout/layout.component';


export const storeRoutes: Route[] = [
    {
        path: 'loja',
        component: LayoutComponent,
        data:{
            layout: 'empty'
        },
        children: [
            {
                path: 'caixa',
                component: CaixaComponent

            },
            {
                path: 'vendas',
                component: VendasComponent

            },

        ]
    },
];
