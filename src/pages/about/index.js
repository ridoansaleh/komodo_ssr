import React from 'react';
import Loadable from 'react-loadable';

const About = Loadable({
    loader: () => import('./components/About' /* webpackChunkName: 'About' */),
    loading() {
        return <div>Loading...</div>
    }
});

export default About
