import Public from './../Public/Public';
import Found from './../found/Found';
import Profile from './../Profile/Profile';

export default [
    {
        name: 'Public',
        path: '/',
        menu: true,
        component: Public,
    },
    {
        name: 'Found',
        path: '/found',
        menu: true,
        component: Found,
    },
    {
        name: 'Profile',
        path: '/profile/lost',
        menu: true,
        component: Profile,
    },
    {
        name: 'Found',
        path: '/profile/found',
        menu: true,
        component: Found,
    },
    {
        name: 'Not Found',
        path: '*',
        menu: true,
        component: Public,
    },
];
