import { RouteInfo } from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

    { path: 'dashboard', title: 'Dashboard', icon: 'bx bx-home-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    { path: 'staff', title: 'Staff', icon: 'bx bx-message-square-edit', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: 'user-management', title: 'Users', icon: 'bx bxs-group', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    { path: 'report-video', title: 'Reported Video', icon: 'bx bx-home-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

    {
        path: '', title: 'Transitions', icon: 'fadeIn animated bx bx-receipt', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: 'gif', title: 'Gif', icon: 'fadeIn animated bx bx-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'emoji', title: 'Emoji', icon: 'fadeIn animated bx bx-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'animation', title: 'Animation', icon: 'fadeIn animated bx bx-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'sounds', title: 'Sounds', icon: 'fadeIn animated bx bx-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'photo', title: 'Photo', icon: 'fadeIn animated bx bx-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: 'music', title: 'Music', icon: 'fadeIn animated bx bx-circle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },


        ]
    },



];