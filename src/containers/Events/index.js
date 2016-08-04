import React, {Component, PropTypes} from 'react';

const Post = (props) => {
  const avatar = require( './images/avatar.jpg' );
  const icon1 = require( './images/icon1.jpg' );
  const icon4 = require( './images/icon4.jpg' );
  const styles = require( './Events.scss' );

  return (
    <div className={styles.post}>
      <div className={styles.wrapUT + ' pull-left'}>
        <div className={styles.userinfo + ' pull-left'}>
          <div className={styles.avatar}>
            <img src={avatar} alt=""/>
            <div className={styles.status + ' ' + styles.green}>&nbsp;</div>
          </div>

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
  children: PropTypes.object.isRequired,
  title: PropTypes.string,
  views: PropTypes.string,
  time: PropTypes.string
};


const Sidebar = () => {
  const styles = require( './Events.scss' );

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarblock}>
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

class Events extends Component {
  render() {
    const logo = require( './images/logo.jpg' );
    const avatar = require( './images/avatar.jpg' );
    const styles = require( './Events.scss' );

    return (
      <div className="container-fluid">
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
                      <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
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
                  <i className="fa fa-envelope"></i>
                </div>

                <div className={styles.avatar + ' pull-left'}>
                  <a href="#">
                    <img src={avatar} alt=""/>
                  </a>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <Post title="10 Kids Unaware of Their Halloween Costume" views="1,569" time="25 min">It's one thing to
                  subject yourself to a Halloween costume mishap because, hey, that's your
                  prerogative.</Post>
                <Post title="What Instagram Ads Will Look Like" views="1,569" time="25 min">It's one thing to subject
                  yourself to a Halloween costume mishap because, hey, that's your</Post>
                <Post title="The Future of Magazines Is on Tablets" views="1,569" time="25 min">Instagram offered a
                  first glimpse at what its ads will look like in a blog post Thursday. The
                  sample ad, which you can see below.</Post>
              </div>
              <div className="col-lg-4 col-md-4">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Events;
