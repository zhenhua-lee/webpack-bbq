import React from 'react';

import styles from './index.css';

const WebContaner = (props) => (
  <div className={styles.js}>
    Web Contaner
    {props.children}
  </div>
);

export default WebContaner;
