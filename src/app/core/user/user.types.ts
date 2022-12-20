// export interface User
// {
//     id: string;
//     name: string;
//     email: string;
//     avatar?: string;
//     status?: string;
// }
import { UserRole } from './userrole.types';
/* eslint-disable @typescript-eslint/naming-convention */
export interface User
{
    id: number;
    user_id: string;
    name: string;
    email?: string;
    company?: string;
    mobile?: string;
    username?: string;
    description?: string;
    user_role?: UserRole;
    active: number;
    deleted_at: Date;
    deleted_by: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    user_role_id?:number;
    avatar?: string;
    //status?: string;
}
