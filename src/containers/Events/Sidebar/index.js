import React from 'react';

const Sidebar = () => {
  const styles = require( './Sidebar.scss' );

  return (
    <div className={styles.sidebar}>
      <div className={styles.block}>
        <h3>Categories</h3>
      </div>
    </div>
  );
};
Sidebar.propTypes = {};

export default Sidebar;
