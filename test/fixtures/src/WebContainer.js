import React from 'react';

import styles from './index.css';

const WebContaner = (props) => (
  <div className={styles.js}>
    <div className={styles.css}>Web Contaner</div>
    {props.children}
  </div>
);

export default WebContaner;
