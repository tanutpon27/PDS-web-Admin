export interface UserList {
    id:number;
    name: string;
    email: string;
    company: string;
    mobile: string;
    username: string;
    user_role: string;
    user_status: number;
}
export interface UserCreateRequest {
    name: string;
    email: string;
    mobile: string;
    username: string;
    company: string;
    user_role_id: number;
}
export interface UserUpdateRequest {
  
    id:number;
    name: string;
    email: string;
    company: string;
    mobile: string;
    user_role_id: number;
    active: number;
}
export interface Role {
    id: number;
    normalize_name?: string;
    name?: string;
    active?: number;
}
export interface Companyole {
    id: number;
    address?: string;
    name?: string;
    phone_number?: string;
    picture?: string;
    active?: number;
}