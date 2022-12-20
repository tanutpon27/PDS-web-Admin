import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
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
    
        return this._userService.getData();
    }
}