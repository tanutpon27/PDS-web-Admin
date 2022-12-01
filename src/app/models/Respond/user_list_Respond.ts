export interface User
{
    id: number;
    active: number;
    name?: string;
    email?: string;
    description?: string;
    company?: string;
    company_id?: number;
    user_roleid?: number;
    normalize_name?: string;
}


export interface UserPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}