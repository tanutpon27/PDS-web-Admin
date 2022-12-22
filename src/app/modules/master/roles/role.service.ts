import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { PermissionsRole, RoleRequest } from './role.types';


@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private _permissionsRole$ = new ReplaySubject<PermissionsRole[]>(1);
    private apiUrl = `${environment.apiBaseUrl}/Role`;
    constructor(private _httpClient: HttpClient) {
    }

    get permissionsRole$(): Observable<PermissionsRole[]> {
        return this._permissionsRole$.asObservable();
    }
    getPermissionsRole() {
        return this._httpClient.get<PermissionsRole[]>(`${this.apiUrl}/PermissionsRole`).pipe(
            tap((p) => {
                
                this._permissionsRole$.next(p);
            })
        );
    }
    create(body: RoleRequest): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/CreateRole`, body);
    }

    update(body: RoleRequest): Observable<any> {
        return this._httpClient.put(`${this.apiUrl}/UpdatePermissions`,body);
    }
    delete(body: RoleRequest): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/Delete`,body);
    }
}
