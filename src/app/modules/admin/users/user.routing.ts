import { Route } from '@angular/router';
import { UserResolver } from './user.resolvers';
import { UserComponent } from './user.component';
import { AuthService } from 'app/core/auth/auth.service';

export const UserRoutes: Route[] = [

    {
        path: '',
        component: UserComponent,
        data: {AuthService : AuthService},
        resolve  : {
            DataUser: UserResolver
        }
       
    }
];
