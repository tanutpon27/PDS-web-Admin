import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'environments/environment';
import { UserCreateRequest, UserList, UserUpdateRequest } from './user.types';
import { SettingsService } from 'app/core/settings/settings.sevice';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _data = new ReplaySubject<UserList[]>(1);
    private apiUrl = `${environment.apiBaseUrl}/User`;

    constructor(private _httpClient: HttpClient) {}

    get data$(): Observable<UserList[]> {
        return this._data.asObservable();
    }

    getData(): Observable<any> {
  
       
        return this._httpClient.get<any>(`${this.apiUrl}/getUsersAll`).pipe(
            tap((response: any) => {
                if (response != null) {
                    this._data.next(response);
                }
            })
        );
    }
    searchUsers(name: string): Observable<any> {
        return this._httpClient
          .get<any>(`${this.apiUrl}/getSearch/${name}`)
          .pipe(
            tap((users:any) => {
              this._data.next(users);
            })
          );
      }
    create(body: UserCreateRequest): Observable<any> {
        return this._httpClient.post(`${this.apiUrl}/CreateUser`, body);
    }
    update(body: UserUpdateRequest): Observable<any> {
        return this._httpClient.put(`${this.apiUrl}`,body);
    }
    delete(id: number): Observable<any> {
        return this._httpClient.delete(`${this.apiUrl}/Delete/${id}`);
    }
}
