/* eslint-disable @typescript-eslint/naming-convention */
export interface UserRole
{
    id: number;
    normalize_name: string;
    name: string;

    active: number;
    deleted_at: Date;
    deleted_by: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}
