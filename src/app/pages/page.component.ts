import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseVerticalNavigationAppearance, FuseVerticalNavigationMode, FuseNavigationItem, FuseVerticalNavigationPosition,
    FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject } from 'rxjs';
import { PagesService } from './pages.service';
import { Usuario } from 'app/models/usuario';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
})
export class PageComponent implements OnInit, OnDestroy {

    @Input() appearance: FuseVerticalNavigationAppearance;
    @Input() autoCollapse: boolean;
    @Input() inner: boolean;
    @Input() mode: FuseVerticalNavigationMode;
    @Input() name: string;
    @Input() navigation: FuseNavigationItem[];
    @Input() isScreenSmall: boolean;
    @Input() position: FuseVerticalNavigationPosition;
    @Input() transparentOverlay: boolean;
    user: Usuario;
    private navigationData: FuseNavigationItem[] = [
        {
            id: 'home',
            title: 'Início',
            type: 'basic',
            icon: 'heroicons_outline:home',
            link: '/inicio'
        },
        {
            id: 'loja',
            title: 'Loja',
            type: 'collapsable',
            icon: 'heroicons_outline:shopping-bag',
            link: '/loja',
            children: [
                {
                    id: 'caixa',
                    title: ' Caixa',
                    subtitle: 'Gestão do Caixa',
                    type: 'basic',
                    icon: 'mat_solid:account_balance_wallet',
                    link: 'loja/caixa'
                },
                {
                    id: 'vendas',
                    title: 'Vendas',
                    subtitle: 'Gestão de Vendas',
                    type: 'basic',
                    icon: 'mat_solid:add_shopping_cart',
                    link: 'loja/vendas'
                }
            ]
        },
        {
            id: 'admin',
            title: 'Administrativo',
            subtitle: '',
            type: 'collapsable',
            icon: 'mat_outline:settings',
            children: [

                {
                    id:'settings',
                    title: 'Configurações',
                    subtitle: '',
                    type:'collapsable',
                    icon:'mat_outline:settings',
                    children:[
                        // {
                        //     id: 'account',
                        //     title: 'Conta',
                        //     type: 'basic',
                        //     icon: 'mat_outline:manage_accounts',
                        //     link: 'admin/configuracoes/conta/lista'
                        // },
                        {
                            id: 'roles',
                            title: 'Perfis',
                            type: 'basic',
                            icon: 'mat_outline:supervisor_account',
                            link: 'admin/configuracoes/perfil/lista'
                        },

                    ]
                },
                {
                    id: 'products',
                    title: 'Produto',
                    type: 'basic',
                    icon: 'mat_outline:storefront',
                    link: 'admin/produtos/lista'
                },

            ]
        },

    ];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private isAuth!: boolean;


    /**
     * Constructor
     */
    constructor(private _fuseNavigationService: FuseNavigationService,
        private _authService: AuthService, private _router: Router, private _pagesService: PagesService) { }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {

        if (this._authService.check()) {
            this.isAuth = true;
            this._authService.user$.subscribe((user)=> {
                this.user = user;
            });
        } else {
            this._authService.signOut();
        }

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

        // Unsubscribe from all subscriptions
        //this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }


    getNavItem(itemId, navigationName): FuseNavigationItem | null {
        // Get the component -> navigation data -> item
        const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(navigationName);

        // Return if the navigation component does not exist
        if (!navComponent) {
            return null;
        }

        // Get the navigation item
        const navigation = navComponent.navigation;
        const item = this._fuseNavigationService.getItem(itemId, navigation);
        return item;
    }

    toAuth(): boolean {
        return this.isAuth;
    }

    updateUserStatus(status: string): void {

    }

    profile(): void{
        this._router.navigate(['/profile']);
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
