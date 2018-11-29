import React, { Component } from 'react';
import styles from './App.css';
import minion from './minion.gif';

export default class App extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <p>Hello world!</p>
        <img src={minion} alt='Icon' height='100' width='100' />
      </div>
    );
  }
}