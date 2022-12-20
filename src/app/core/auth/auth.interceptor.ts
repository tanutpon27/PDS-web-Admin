import { Injectable, isDevMode } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import {
    BehaviorSubject,
    catchError,
    Observable,
    throwError,
    switchMap,
    filter,
    take,
} from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> =
        new BehaviorSubject<any>(null);
    constructor(private _authService: AuthService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();

        // Request
        //
        // If the access token didn't expire, add the Authorization header.
        // We won't add the Authorization header if the access token expired.
        // This will force the server to return a "401 Unauthorized" response
        // for the protected API routes which our response interceptor will
        // catch and delete the access token from the local storage while logging
        // the user out from the app.

        if (
            this._authService.accessToken &&
            !AuthUtils.isTokenExpired(this._authService.accessToken)
        ) {
            const currentUser = this._authService.user;
            newReq = req.clone({
                headers: req.headers
                    .set(
                        'Authorization',
                        'Bearer ' + this._authService.accessToken
                    )
                    .set('UserId', currentUser ? currentUser.user_id : '')
                    .set('UserName', currentUser ? currentUser.username : ''),
            });
        }

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Cannot connect to service
                if (error instanceof HttpErrorResponse && error.status === 0) {
                    const err = new Error('Cannot connect to service');
                    return throwError(() => err);
                }
                // Catch "401 Unauthorized" responses
                else if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401 &&
                    !newReq.url.includes('/sign-in')
                ) {
                    // Sign out
                    // this._authService.signOut();

                    // Reload the app
                    //  location.reload();
                    return this.handle401Error(newReq, next);
                } else if (
                    error instanceof HttpErrorResponse &&
                    error.status === 500
                ) {
                    let internalErr = new Error('Internal server error');
                    if (isDevMode()) {
                        internalErr = new Error(error.error.message);
                    }
                    return throwError(() => internalErr);
                }

                return throwError(() => 'Internal Error,Please check log');
            })
        );
    }

    private handle401Error(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const refreshToken = this._authService.refreshToken;
            if (refreshToken) {
                //console.log("Refresh From Interceptor");
                return this._authService.tryRefreshToken().pipe(
                    switchMap((token: any) => {
                        this.isRefreshing = false;
                        //this.tokenService.saveToken(token.accessToken);
                        this.refreshTokenSubject.next(token.accessToken);

                        return next.handle(
                            this.addTokenHeader(request, token.accessToken)
                        );
                    }),
                    catchError((err) => {
                        this.isRefreshing = false;

                        this._authService.signOut();
                        return throwError(err);
                    })
                );
            }
        }
        return this.refreshTokenSubject.pipe(
            filter((token) => token !== null),
            take(1),
            switchMap((token: string) =>
                next.handle(this.addTokenHeader(request, token))
            )
        );
    }
    private addTokenHeader(
        request: HttpRequest<any>,
        token: string
    ): HttpRequest<any> {
        /* for Spring Boot back-end */
        // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        /* for Node.js Express back-end */
        const currentUser = this._authService.user;
        return request.clone({
            headers: request.headers
                .set('Authorization', 'Bearer ' + token)
                .set('UserId', currentUser ? currentUser.user_id : '')
                .set('UserName', currentUser ? currentUser.username : ''),
        });
    }
}
