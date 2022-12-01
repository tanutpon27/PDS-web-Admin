import { Route } from '@angular/router';
import { UserResolver } from './messages.resolvers';
import { MessagesComponent } from './messages.component';
import { AuthService } from 'app/core/auth/auth.service';

export const UserRoutes: Route[] = [

    {
        path: '',
        component: MessagesComponent,
        data: {AuthService : AuthService},
        resolve  : {
            DataUser: UserResolver
        }
       
    }
];
