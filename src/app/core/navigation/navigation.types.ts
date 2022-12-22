import { FuseNavigationItem } from '@fuse/components/navigation';

export interface Navigation
{
    compact: FuseNavigationItem[];
    appdefault: FuseNavigationItem[];
    futuristic: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}
export interface PermissionConfig {
    menuId: string | null;
    title: string | null;
    subtitle: string | null;
    type: string | null;
    icon: string | null;
    link: string | null;
    role: string | null;
    config_permissions: ConfigPermission[];
    main_menu_id: number;
    id: number;
    active: number;
}

export interface ConfigPermission {
    mode: string | null;
    role: string | null;
    sub_menu_id: number;
    id: number;
    active: number;
  
}
