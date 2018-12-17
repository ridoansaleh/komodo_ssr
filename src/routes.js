import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';
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