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
    private apiUrl = `${environment.apiBaseUrl}/Parcel/v1/`;
    private imageUrl = `${environment.fileUrl}/`;

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
            "id": user.id,
            "company": user.company
        };
        return this._httpClient.post(`${this.apiUrl}selectParcels`,param).pipe(
            tap((response: any) => {
                response.parcel.forEach(element => {
                    try{
                        element.parcelDetail.users_Picture = this.imageUrl+JSON.parse(element.parcelDetail.users_Picture)
                    }
                    catch(e){
                        element.parcelDetail.users_Picture = ""
                    }
                });
                this._data.next(response.parcel);
            })
        );
    }
    

    updateStatus(status,id): Observable<any>
    {
        // Get the dat
        const param = {
            "id": id,
            "status": status,
            "update_by": "-",
            "users_picture": "-",
            "description": "-",
            "type_id": "-",
            "date_time": "2022-11-27T12:36:42.581Z",
            "description_log": "-",
            "user_role": "ADMIN",
            "option_parcel": "-"
        };
        return this._httpClient.put(`${this.apiUrl}updateStatus`,param).pipe(
            tap((response: any) => {
               console.log('four',response)
            })
        );
    }
}