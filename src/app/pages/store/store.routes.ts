import { Route } from '@angular/router';
import { CaixaComponent } from './caixa/caixa.component';
import { VendasComponent } from './vendas/vendas.component';
import { LayoutComponent } from 'app/layout/layout.component';
import { CaixaDetailsComponent } from './caixa/details/details.component';
import { StoreResolver } from './store.resolve';
import { CanDeactivateCaixaDetails } from './store.guards';


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
                component: CaixaComponent,
                children:[
                    {
                        path: ':id',
                        component: CaixaDetailsComponent,
                        canDeactivate: [CanDeactivateCaixaDetails]
                    }
                ]

            },
            {
                path: 'vendas',
                component: VendasComponent

            },

        ]
    },
];
