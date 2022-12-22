import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable } from 'rxjs';
import {RoleService} from './role.service';

@Injectable({
    providedIn: 'root'
})
export class RoleResolver implements Resolve<any>
{
    constructor(private _roleService: RoleService)
    {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {    
    
        return this._roleService.getPermissionsRole();
    }
}