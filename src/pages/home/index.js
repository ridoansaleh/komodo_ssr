import React from 'react';
import Loadable from 'react-loadable';

const Home = Loadable({
  loader: () => import('./components/Home' /* webpackChunkName: 'Home' */),
  loading() {
    return <div>Loading...</div>
  }
});

export default Home
