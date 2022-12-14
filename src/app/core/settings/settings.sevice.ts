import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Companyole,  Role } from './settings.types';

import { Observable, ReplaySubject, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user.types';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private apiUrl = `${environment.apiBaseUrl}/User`;
    private apiUrlRole = `${environment.apiBaseUrl}/Role`;
    private apiUrlCompany = `${environment.apiBaseUrl}/Organization`;
    private _role$ = new ReplaySubject<Role[]>(1);
    private _companyole$ = new ReplaySubject<Companyole[]>(1);
   
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,public _authService: AuthService,) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    get role$(): Observable<Role[]> {
        return this._role$.asObservable();
    } 
   
    get companyole$(): Observable<Companyole[]> {
        return this._companyole$.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods (Use for manage on master page)
    // -----------------------------------------------------------------------------------------------------
 
    getRole() {
        return this._httpClient.get<Role[]>(`${this.apiUrlRole}`).pipe(
            tap((s) => {
                this._role$.next(s);
            })
        );
    }
    getCompanyole() {
       
        return this._httpClient.get<Companyole[]>(`${this.apiUrlCompany}/Company`).pipe(
            tap((s) => {
                this._companyole$.next(s);
            })
        );
    }
   
   
}
