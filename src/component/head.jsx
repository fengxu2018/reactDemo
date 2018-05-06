import React from 'react';
import STYLES from './head.sass';

class Head extends React.Component {
  render() {
    return (
      <div className={STYLES.root}>
        首页
      </div>
    );
  }  
}

export default Head;
