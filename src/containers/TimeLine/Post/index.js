import React, {PropTypes} from 'react';
import Avatar from '../Avatar';
import PostForm from '../../../components/PostForm/PostForm';

const Post = (props) => {
  const icon1 = require( './images/icon1.jpg' );
  const icon4 = require( './images/icon4.jpg' );
  const styles = require( './Post.scss' );
  return (
    <li className={styles.post}>
        { props.editing &&
        <div>
          <PostForm formKey={String(props.id)} key={String(props.id)} initialValues={props} submitHandler={props.editPost} />
          <a href="#" onClick={(event) => { event.preventDefault(); props.editPostStop(props.id); }}>Cancel</a>
        </div>
        }
        { !props.editing &&
        <div>
          <div>
            <a href="#" onClick={(event) => { event.preventDefault(); props.deletePost(props.id); }}>Delete</a>
            <a href="#" onClick={(event) => { event.preventDefault(); props.editPostStart(props.id); }}>Edit</a>
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
          <div className={styles.postminfo + ' pull-left'}>
            <div className={styles.coments}>
              <div className={styles.commentbg}>
                560
                <div className={styles.mark}></div>
              </div>

            </div>
            <div className={styles.views}><i className="fa fa-eye"></i> 25</div>
            <div className={styles.time}><i className="fa fa-clock-o"></i> {props.createdAt}</div>
          </div>
          <div>
            { props.images && props.images.split(',').map( (imgSrc) => {
              return (<img key={imgSrc} src={imgSrc} height="100px" width="100px" />);
            })}
          </div>
        </div>
        }
        <div className="clearfix"></div>
    </li>
  );
};
Post.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  images: PropTypes.string,
  createdAt: PropTypes.string,
  editing: PropTypes.bool,
  deletePost: PropTypes.func.isRequired,
  editPostStart: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  editPostStop: PropTypes.func.isRequired
};

export default Post;
