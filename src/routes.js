import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/not_found';
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