import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import styles from '../../../general/css/App.css';
import minion from '../../../static/minion.gif';

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Komodo SSR - Home</title>
          <meta name="description" content="Komodo SSR adalah sebuah template projek untuk para programmer yang ingin menerapkan fitur Server Side Rendering pada React.Js." />
        </Helmet>
        <div className={styles.wrapper}>
          <p>Komodo SSR</p>
          <img src={minion} alt='Icon' height='100' width='100' />
        </div>
        <p>
          <Link to='about'>Lihat About</Link>
        </p>
      </div>
    );
  }
}

export default Home
