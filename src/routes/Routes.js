import Home from '~/pages/Home';
import DetailPlaylist from '~/pages/DetailPlaylist';
import DetailSong from '~/pages/DetailSong';
import Radio from '~/pages/Radio';
import Category from '~/pages/Category';
import Top100 from '~/pages/Top100';
import Chart from '~/pages/Chart';
import NewMusic from '~/pages/NewMusic';
import Search from '~/pages/Search';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/playlist/:name/:id',
        component: DetailPlaylist,
    },
    {
        path: '/bai-hat/:name/:id',
        component: DetailSong,
    },
    {
        path: '/album/:name/:id',
        component: DetailPlaylist,
    },
    {
        path: '/chart',
        component: Chart,
    },
    {
        path: '/radio',
        component: Radio,
    },
    {
        path: '/category',
        component: Category,
    },
    {
        path: '/top100',
        component: Top100,
    },
    {
        path: '/newmusic',
        component: NewMusic,
    },
    {
        path: '/search/:keyword',
        component: Search,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
