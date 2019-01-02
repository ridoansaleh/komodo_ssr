import React from 'react';
import Loadable from 'react-loadable';

const NotFound = Loadable({
    loader: () => import('./components/NotFound' /* webpackChunkName: 'NotFound' */),
    loading() {
        return <div>Loading...</div>
    }
});

export default NotFound