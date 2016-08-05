import React, {PropTypes} from 'react';
import Avatar from './Avatar';

const Post = (props) => {
  const icon1 = require( './images/icon1.jpg' );
  const icon4 = require( './images/icon4.jpg' );
  const styles = require( './Post.scss' );

  return (
    <div className={styles.post}>
      <div className={styles.wrapUT + ' pull-left'}>
        <div className={styles.userinfo + ' pull-left'}>
          <Avatar />

          <div className={styles.icons}>
            <img src={icon1} alt=""/>
            <img src={icon4} alt=""/>
          </div>
        </div>
        <div className={styles.posttext + ' pull-left'}>
          <h2>
            <a href="$"> {props.title}</a></h2>
          <p>{props.children}</p>
        </div>
        <div className="clearfix"></div>
      </div>
      <div className={styles.postinfo + ' pull-left'}>
        <div className={styles.comments}>
          <div className={styles.commentbg}>
            560
            <div className={styles.mark}></div>
          </div>

        </div>
        <div className={styles.views}><i className="fa fa-eye"></i> {props.views}</div>
        <div className={styles.time}><i className="fa fa-clock-o"></i> {props.time}</div>
      </div>
      <div className="clearfix"></div>
    </div>
  );
};
Post.propTypes = {
  children: PropTypes.string,
  title: PropTypes.string,
  views: PropTypes.string,
  time: PropTypes.string
};

export default Post;
