import React from 'react';
import Icon from './icon';
import STYLES from './toolBar.sass';

class ToolBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className={`list-inline ${STYLES.root}`}>
        <li className="list-inline-item">
          <Icon icon="icon-home" />
          <span>首页</span>
        </li>
        <li className="list-inline-item">
          <Icon icon="icon-deliver" />
          <span>物流</span>
        </li>
        <li className="list-inline-item">
          <Icon icon="icon-cart" />
          <span>购物车</span>
        </li>
        <li className="list-inline-item">
          <Icon icon="icon-profile" />
          <span>我的</span>
        </li>
      </ul>
    );
  }

}

export default ToolBar;