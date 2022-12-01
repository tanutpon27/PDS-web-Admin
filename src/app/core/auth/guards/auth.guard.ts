import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._check('/');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string): Observable<boolean> {
        // Check the authentication status
        return this._authService.check()
            .pipe(
                catchError(() =>

                    // Return false
                    of(false)
                ),
                switchMap((authenticated) => {
 
                    // If the user is not authenticated...
                    if (!authenticated) {

                        // const isRefreshTOkenSuccess = this._authService.tryRefreshToken();

                        //return isRefreshTOkenSuccess;

                        const isRefreshSuccess = this._authService.tryRefreshToken().pipe(
                            switchMap((success: boolean) => {
                                if (success === false) {
                                    this._router.navigate(['sign-in'], { queryParams: { redirectURL } });
                                }
                                return of(success);
                            }),
                            catchError(() => {
                                this._router.navigate(['sign-in'], { queryParams: { redirectURL } });
                                return of(false);
                            })
                        );

                        //console.log("AAA:", typeof isRefreshSuccess);
                        return isRefreshSuccess;
                        //  console.log("isRefreshTOkenSuccess:", isRefreshTOkenSuccess);

                        // if (isRefreshTOkenSuccess === false) {
                        //     // Redirect to the sign-in page
                        //     this._router.navigate(['sign-in'], { queryParams: { redirectURL } });
                        //     // Prevent the access
                        //     return of(false);
                        // }
                        // else {
                        //     return of(true);
                        // }


                    }

                    // Allow the access
                    return of(true);
                })
            );
    }
}
