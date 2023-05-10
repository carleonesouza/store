/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { environment } from 'environments/environment';
import { Usuario } from 'app/models/usuario';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;
    private _user: ReplaySubject<Usuario> = new ReplaySubject<Usuario>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken');
    }

        /**
         * Setter & getter for user
         *
         * @param value
         */
        set user(value: Usuario)
        {
            // Store the value
            this._user.next(value);
        }

        get user$(): Observable<Usuario>
        {
            return this._user.asObservable();
        }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return of();
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return of();
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(environment.apiManager + 'users/login', credentials).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this.user = response.user;
                localStorage.setItem('user', JSON.stringify(response.user));

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        if (this.accessToken) {
            // Set the authenticated flag to true
            this._authenticated = true;
            // Return true
            return of(true);
        } else {
            this._authenticated = false;
            // Return true
            return of(false);

        }

    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        localStorage.removeItem('caixaId');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(false);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: Usuario): Observable<any> {
        return this._httpClient.post(environment.apiManager + 'users/register', user).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this.user = response.user;
                localStorage.setItem('user', JSON.stringify(response.user));

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    obterSignature(email) {
        return this._httpClient.post(environment.apiManager + 'signature', email).pipe(
            switchMap((response: any) => of(response))
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            this.signOut();
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            this.signOut();
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
