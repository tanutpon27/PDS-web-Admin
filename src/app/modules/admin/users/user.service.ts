import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    private apiUrl = `${environment.apiBaseUrl}/Users/v1/`;

    constructor(private _httpClient: HttpClient)
    {
    }

    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    getData(user): Observable<any>
    {
        // Get the dat
        const param = {
            "company": user.company,
            "user_id": user.id
        };
        return this._httpClient.post(`${this.apiUrl}getUsersAll`,param).pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }
}