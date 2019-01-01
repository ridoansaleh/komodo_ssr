import React from 'react';
import Loadable from 'react-loadable';

const Home = Loadable({
    loader: () => import('./components/Home'),
    loading() {
        return <div>Loading...</div>
    }
});
const About = Loadable({
    loader: () => import('./components/About'),
    loading() {
        return <div>Loading...</div>
    }
});
const NotFound = Loadable({
    loader: () => import('./components/NotFound'),
    loading() {
        return <div>Loading...</div>
    }
});
import { fetchPeople } from './reducers/people';

const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
        loadData: () => fetchPeople()
    },
    {
        path: "/about",
        component: About,
        exact: true
    },
    {
        component: NotFound
    }
];

export default routes