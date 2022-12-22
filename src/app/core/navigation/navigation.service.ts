import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import {
    Navigation,
    PermissionConfig,
} from 'app/core/navigation/navigation.types';
import { environment } from 'environments/environment';
import { SettingsService } from '../settings/settings.sevice';
@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private apiUrl = `${environment.apiBaseUrl}/Menu`;
    private apiUrlRole = `${environment.apiBaseUrl}/Role`;
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private _permissionConfig$ = new ReplaySubject<PermissionConfig[]>(1);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,

        private _settingsService: SettingsService
    ) {}
    
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }
    permissionConfig(link: string, mode: string): string[] {
        let role =[''];
        this._permissionConfig$.subscribe((item) => {

            let config=item.find((obj) => obj.link === link).config_permissions.find(
                (obj) => obj.mode === mode
            );
            if(config.role){
          
                role= config.role.split(',');
            }
            
            
        });
        return role;
        // return this._permissionConfig$.asObservable();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        this._settingsService.getRole().subscribe();
        this._settingsService.getCompanyole().subscribe();
        this.getPermissionsConfic().subscribe();
 
        return this._httpClient
            .get<Navigation>(`${this.apiUrl}/GetMenuByPermission`)
            .pipe(
                tap((navigation) => {
                    this._navigation.next(navigation);
                })
            );
    }
    getPermissionsConfic() {
        return this._httpClient
            .get<PermissionConfig[]>(`${this.apiUrlRole}/PermissionsConfig`)
            .pipe(
                tap((s) => {
               

                    this._permissionConfig$.next(s);
                })
            );
    }
}
