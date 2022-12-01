/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';



export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'mat_outline:auto_awesome_mosaic',
        link: '/dashboard'
    }, 
    {
        id: 'parcel',
        title:'Parcel',
        type: 'basic',
        icon: 'feather:box',
        link: '/parcel'
    }, {
        id: 'users',
        title: 'Users',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/users'
    },{
        id: 'messages',
        title: 'Messages',
        type: 'basic',
        icon: 'mat_outline:message',
        link: '/messages'
    }/*, {
        id: 'settings',
        title: 'Settings',
       
        type: 'group',
       
        children: [
            {
                id: 'main_settings',
                title: 'Main Settings',
                type: 'basic',
                icon: 'mat_outline:settings',
                link: '/settings'
            },
            {
                id: 'notifications',
                title: 'Notifications',
                type: 'basic',
                icon: 'mat_outline:notifications_none',
                link: '/notifications'
            },
        ]
    }*/
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
