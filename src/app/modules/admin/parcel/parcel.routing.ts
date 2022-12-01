import { Route } from '@angular/router';
import { ParcelResolver } from './parcel.resolvers';
import { ParcelComponent } from './parcel.component';
import { AuthService } from 'app/core/auth/auth.service';

export const UserRoutes: Route[] = [

    {
        path: '',
        component: ParcelComponent,
        data: {AuthService : AuthService},
        resolve  : {
            DataUser: ParcelResolver
        }
       
    }
];
