import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/App.css';
import minion from '../static/minion.gif';

class Home extends Component {
  render() {
    return (
      <div>
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