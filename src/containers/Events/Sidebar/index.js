import React from 'react';

const Sidebar = () => {
  const styles = {}; //require( './Sidebar.scss' );

  return (
    <div className={styles.sidebar}>
      <div className={styles.block}>
        <h3>Categories</h3>
        <div className={styles.divline}></div>
        <div className={styles.blocktxt}>
          <ul className={styles.cats}>
            <li><a href="#">Trading for Money <span className="badge pull-right">20</span></a></li>
            <li><a href="#">Vault Keys Giveway <span className="badge pull-right">10</span></a></li>
            <li><a href="#">Misc Guns Locations <span className="badge pull-right">50</span></a></li>
            <li><a href="#">Looking for Players <span className="badge pull-right">36</span></a></li>
            <li><a href="#">Stupid Bugs &amp; Solves <span className="badge pull-right">41</span></a></li>
            <li><a href="#">Video &amp; Audio Drivers <span className="badge pull-right">11</span></a></li>
            <li><a href="#">2K Official Forums <span className="badge pull-right">5</span></a></li>
          </ul>
        </div>
      </div>
      <div className={styles.sidebarblock}>
        <h3>My Active Threads</h3>
        <div className={styles.divline}></div>
        <div className={styles.blocktxt}>
          <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
        </div>
        <div className={styles.divline}></div>
        <div className={styles.blocktxt}>
          <a href="#">Who Wins in the Battle for Power on the Internet?</a>
        </div>
        <div className={styles.divline}></div>
        <div className={styles.blocktxt}>
          <a href="#">Sony QX10: A Funky, Overpriced Lens Camera for Your Smartphone</a>
        </div>
        <div className={styles.divline}></div>
        <div className={styles.blocktxt}>
          <a href="#">FedEx Simplifies Shipping for Small Businesses</a>
        </div>
        <div className={styles.divline}></div>
        <div className={styles.blocktxt}>
          <a href="#">Loud and Brave: Saudi Women Set to Protest Driving Ban</a>
        </div>
      </div>
    </div>
  );
};
Sidebar.propTypes = {};

export default Sidebar;
