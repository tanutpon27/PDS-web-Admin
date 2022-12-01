import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { User } from '../user/user.types';
@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    get refreshToken(): string {
        return localStorage.getItem('refreshToken') ?? '';
    }

    set userData(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    get user(): User {
        const userStr = localStorage.getItem('user') ?? '';
        return userStr ? JSON.parse(userStr) : null;
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
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: {
        username: string;
        password: string;
    }): Observable<any> {
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
        // console.log(credentials);
        // Throw error, if the user is already logged in
        // if (this._authenticated) {
        //     //return throwError(() => new Error('User is already logged in.'));

        // }

        return this._httpClient
            .post(
                `${environment.apiBaseUrl}/Account/v1/authenticateWeb`,
                credentials
            )
            .pipe(
                switchMap((response: any) => {
                    // Store the access token in the local storage
                    this.accessToken = response.token;
                    this.refreshToken = response.refresh_token;
                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;
                    this.userData = response.user;
                    // Return a new observable with the response
                    return of(response);
                })
            );
    }

    /**
     * Sign in using the access token
     */
    tryRefreshToken(): Observable<boolean> {
        // Sign in using the token
        return this._httpClient
            .post(`${environment.apiBaseUrl}/Token/v1/refresh`, {
                accessToken: this.accessToken,
                refreshToken: this.refreshToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    if (typeof response == 'boolean') {
                        // ตกเคส Pipe catcherror
                        return of(false);
                    }
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.token) {
                        this.accessToken = response.token;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        this._httpClient
            .post(`${environment.apiBaseUrl}/Token/v1/revoke`, {})
            .subscribe((_res) => {
                this._authenticated = false;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                // Set the authenticated flag to false
            });

        return of(true);
        // Return the observable
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: {
        name: string;
        email: string;
        password: string;
        company: string;
    }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: {
        email: string;
        password: string;
    }): Observable<any> {
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
            return of(false);
        }

        // Check the access token expire date
        // if (AuthUtils.isTokenExpired(this.accessToken)) {
        //     return of(false);
        //     // return this.tryRefreshToken().pipe(
        //     //     switchMap((refreshSuccess: boolean) => of(refreshSuccess)));
        //     // console.log("Refresh From Service");
        //     // let isRefreshSuccess: boolean;
        //     // this.tryRefreshToken().subscribe((result) => {

        //     //     if (result === false) {
        //     //         localStorage.removeItem('accessToken');
        //     //         localStorage.removeItem('refreshToken');
        //     //         isRefreshSuccess = false;
        //     //     }
        //     //     else { isRefreshSuccess = true; }
        //     // },
        //     //     (_error) => {

        //     //         localStorage.removeItem('accessToken');
        //     //         localStorage.removeItem('refreshToken');
        //     //         isRefreshSuccess = false;
        //     //     });
        //     //    // console.log("Refresh token response:",isRefreshSuccess);
        //     // return of(isRefreshSuccess);

        //     // If the access token exists and it didn't expire, sign in using it
        //     // return this.refreshToken();
        // }

        return of(!AuthUtils.isTokenExpired(this.accessToken));
    }
}
