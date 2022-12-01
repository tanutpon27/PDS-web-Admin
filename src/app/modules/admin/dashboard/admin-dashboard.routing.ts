import { Route } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { ParcelResolver,UserResolver } from './admin-dashboard.resolvers';
import { AuthService } from 'app/core/auth/auth.service';

export const projectRoutes: Route[] = [
    {
        path     : '',
        component: AdminDashboardComponent,
        data: {AuthService : AuthService},
        resolve  : {
            data: ParcelResolver,
            DataUser: UserResolver
        }
    }
];
