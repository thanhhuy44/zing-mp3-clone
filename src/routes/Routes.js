import Home from '~/pages/Home';
import Discover from '~/pages/Discover';
import DetailPlaylist from '~/pages/DetailPlaylist';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/discover',
        component: Discover,
    },
    {
        path: '/detailplaylist',
        component: DetailPlaylist,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
