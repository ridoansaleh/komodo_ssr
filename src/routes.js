import Home from './components/Home';
import About from './components/About';

const routes = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/about",
        component: About,
        exact: true
    }
];

export default routes