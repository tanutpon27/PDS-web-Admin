export interface RoleRequest {
    id?: number;
    active?: number;
    normalize_name?: string;
    name?: string;
    permissions?: PermissionsRole[];
}

export interface PermissionsRole {
    id: number;
    active: number;
    menuId: string | null;
    title: string | null;
    subtitle: string | null;
    type: string | null;
    icon: string | null;
    link: string | null;
    role: string | null;
    childrens?: PermissionsRole[];
    config_permissions?: ConfigPermission[];
}

export interface ConfigPermission {
    id: number;
    active: number;
    mode: string | null;
    role: string | null;
}

export interface Page {
    id: number;
    active: number;
    menuId: string | null;
    title: string | null;
    subtitle: string | null;
    type: string | null;
    icon: string | null;
    link: string | null;
    role: string | null;
    confic?: any[];
    page?: Page[];
}

export interface SubPage {
    name: string;
    confic?: any[];
}

export interface Confic {
    mode?: string;
    confic?: boolean;
}
