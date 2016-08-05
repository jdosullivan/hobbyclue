import React from 'react';

const styles = require( './SearchBox.scss' );

const SearchBox = () => {
  return (
    <div className={styles.search}>
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
    </div>);
};


export default SearchBox;
