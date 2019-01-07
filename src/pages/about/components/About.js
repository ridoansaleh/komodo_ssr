import React from 'react';
import { Helmet } from "react-helmet";

const About = () => (
  <div>
    <Helmet>
      <title>Komodo SSR - About</title>
      <meta name="description" content="Komodo SSR adalah sebuah template projek untuk para programmer yang ingin menerapkan fitur Server Side Rendering pada React.Js." />
    </Helmet>
    <p>About Page</p>
  </div>
);

export default About
