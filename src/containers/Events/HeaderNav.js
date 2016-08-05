import React from 'react';
import Avatar from './Avatar';

function HeaderNav() {
  const logo = require( './images/logo.jpg' );
  const styles = require( './HeaderNav.scss' );

  return (
    <div className={styles.headernav}>
      <div className="container">
        <div className="row">
          <div className="col-lg-1 col-xs-3 col-sm-2 col-md-2 logo">
            <a href="index.html">
              <img src={logo} alt=""/>
            </a>
          </div>
          <div className={styles.search + ' col-lg-4 hidden-xs hidden-sm col-md-3'}>
            <div className={styles.wrap}>
              <form action="#" method="post" className="form">
                <div className={styles.txt + ' pull-left'}>
                  <input type="text" className="form-control" placeholder="Search Topics"/>
                </div>
                <div className="pull-right">
                  <button className="btn btn-default" type="button">
                    <i className="fa fa-search"/>
                  </button>
                </div>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
          <div className={styles.avt + ' col-lg-4 col-xs-12 col-sm-5 col-md-4'}>
            <div className="pull-left">
              <form action="03_new_topic.html" method="post" className="form">
                <button className="btn btn-primary">Start New Topic</button>
              </form>
            </div>
            <div className={styles.env + ' pull-left'}>
              <i className="fa fa-envelope"/>
            </div>
            <div className="pull-left">
              <Avatar />
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
