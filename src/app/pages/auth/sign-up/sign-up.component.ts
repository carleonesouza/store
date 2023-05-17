import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { Usuario } from 'app/models/usuario';
import { cpfValida } from 'app/utils/validaCpf';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            fullName: ['', Validators.required],
            cpfCnpj: ['', [Validators.required, this.validateCPF]],
                phone: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.email]],
                apikey: ['', [Validators.required]],
                password: ['', Validators.required],
                agreements: ['', Validators.required],
            }
        );

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    validateCPF(control: AbstractControl): { [key: string]: any } | null {
        if(control !== null){
          return cpfValida(control);
        }
      }

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        const user = new Usuario(this.signUpForm.value);

      // Disable the form
      this.signUpForm.disable();

      // Hide the alert
      this.showAlert = false;

      // Sign up
      this._authService.signUp(user)
          .subscribe(
              (response) => {

                  // Navigate to the confirmation required page
                  this._router.navigateByUrl('/inicio');
              },
              (response) => {
                console.log('Error ', response);

                  // Re-enable the form
                  this.signUpForm.enable();


                  // Set the alert
                  this.alert = {
                      type   : 'error',
                      message: 'Something went wrong, please try again.'
                  };

                  // Show the alert
                  this.showAlert = true;
              }
          );

    }
}
