import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any>
{
    constructor(private _userService: UserService)
    {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {    
        var _AuthService = new route.data.AuthService;
        return this._userService.getData(_AuthService.user);
    }
}