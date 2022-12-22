import { Route } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SettingsService } from 'app/core/settings/settings.sevice';
import { RoleComponent } from './roles/listing/role.component';
import { RoleResolver } from './roles/role.resolvers';
import { UserComponent } from './users/listing/user.component';

import { UserResolver } from './users/user.resolvers';

export const masterDataRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: 'users',
                component: UserComponent,
                resolve: {
                    DataUser: UserResolver,
                },
            },

            {
                path: 'roles',
                children: [
                    {
                        path: '',
                        component: RoleComponent,
                        resolve: {
                            DataUser: RoleResolver,
                        },
                    },
                ],
            },
        ],
    },
];
