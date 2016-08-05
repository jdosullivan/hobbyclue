import React, {PropTypes} from 'react';

const Avatar = () => {
  const avatar = require( './images/avatar.jpg' );
  const styles = require( './Avatar.scss' );

  return (<div className={styles.avatar}>
      <img src={avatar} alt=""/>
      <div className={styles.status + ' ' + styles.green}>&nbsp;</div>
    </div>);
};
Avatar.propTypes = {
  img: PropTypes.string
};
export default Avatar;
