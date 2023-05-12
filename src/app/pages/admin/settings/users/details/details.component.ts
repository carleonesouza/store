/* eslint-disable @typescript-eslint/member-ordering */
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { Usuario } from 'app/models/usuario';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListItemsComponent } from 'app/shared/list-items/list-items.component';
import { DialogMessage } from 'app/utils/dialog-message ';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Perfil } from 'app/models/perfil';
import { RolesService } from '../../roles/roles.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy{
  @Input() userForm: FormGroup;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  displayedColumns: string[] = ['position', 'name'];
  editMode: boolean = false;
  title: string;
  user: any;
  regex = /(?=.*[a-z]).*(?=[0-9]).*(?=[A-Z]).*(?=[!?*])[a-zA-Z0-9!?*#]{8,}/g;
  creating: boolean = false;
  loading: boolean = false;
  hide = true;
  user$: Observable<any>;
  roles$: Observable<any[]>;
  rotas$: Observable<any[]>;
  isLoadingPerfis: boolean = false;
  rotas: any[];
  perfis$: Observable<Perfil[]>;
  saving: boolean;
  useDefault = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private _listItemsComponent: ListItemsComponent,
    private _formBuilder: FormBuilder,
    public _snackBar: MatSnackBar,
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _perfilService: RolesService,
    private _router: Router,
    public _dialog: DialogMessage,
    public dialog: MatDialog) {
      this.perfis$ = this._perfilService.getAllRoles();
     }

  ngOnInit(): void {
    // Open the drawer
    this._listItemsComponent.matDrawer.open();
    this._changeDetectorRef.markForCheck();

    if (this._route.snapshot.url[0].path === 'add') {
      this.creating = true;
      this.title = 'Novo Usuário';
      this.createUserForm();
    }

    if (this._route.snapshot.paramMap.get('id') !== 'add') {

      this.loading = true;
      this.user$ = this._usersService.user$;


      this._usersService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: any) => {

          // Open the drawer in case it is closed
          this._listItemsComponent.matDrawer.open();
          this.createUserForm();
          this.userForm.reset();

          // Get the Lista
          this.user = user;

          if (this.user) {
            this.userForm.patchValue({
              email: this.user?.email,
              fullName: this.user?.firstName,
            });






            this.loading = false;
          }

          // Toggle the edit mode off
          this.toggleEditMode(false);

          // Mark for check
          this._changeDetectorRef.markForCheck();
        });


    }
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


  createUserForm() {
    this.userForm = this._formBuilder.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      cpfCnpj: new FormControl(''),
      apiKey: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      address: new FormControl(''),
      profile: new FormControl(''),
      status: new FormControl('')
    });
  }

  get userControls() {
    return this.userForm.controls;
  }

  get rolesControls() {
    return (this.userForm.get('roles') as FormArray).controls;
  }

  get rolesFormArray(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.role === c2 : c2 === c1.role;
  }

  createFormRoles() {
    return new FormGroup({
      role: new FormControl('', Validators.required)
    });
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._listItemsComponent.matDrawer.close();
  }

  /**
   * Toggle edit mode
   *
   * @param editMode
   */
  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    }
    else {
      this.editMode = editMode;
      this.title = 'Editar Usuário';
    }
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  cancelEdit() {
    if (this.creating) {
      this.closeDrawer();
      this._router.navigate(['/admin/configuracoes/conta/lista']);
    }
    this.editMode = false;
  }



  onSubmit() {
    if (this.userForm.valid) {
      const userSystem = new Usuario();
      this.saving = true;
      userSystem.email = this.userForm.value.email;
      userSystem.fullName = this.userForm.value.fullName;
      userSystem.password = this.userForm.value.password;
      const userRoles = [];
      const roles = this.userForm.get('roles').value;
      roles.map((role) => {
        userRoles.push(role.role.roleName);
      });

      if (userSystem && userRoles.length >= 1) {
        this._usersService
          .addUser(userSystem)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(
            () => {
              this.saving = false;
              this.toggleEditMode(false);
              this.closeDrawer().then(() => true);
              this._router.navigate(['/admin/configuracoes/conta/lista']);
              this.userForm.reset();
            },
          );
      }
    }
  }
}
