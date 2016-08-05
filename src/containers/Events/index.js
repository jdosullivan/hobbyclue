import React, {Component} from 'react';
import Post from './Post';
import Sidebar from './Sidebar';
import HeaderNav from './HeaderNav';

const styles = require( './Events.scss' );
const posts = [
  {
    id: 1,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 2,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 3,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 20,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 4,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 5,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 21,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 6,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 7,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 22,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 8,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 9,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 24,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 10,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 11,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 23,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 12,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 13,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 25,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 14,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 15,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 26,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 16,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 17,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '27 min'
  },
  {
    id: 27,
    title: '10 Kids Unaware of Their Halloween Costume',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '1,569',
    time: '25 min'
  },
  {
    id: 18,
    title: 'What Instagram Ads Will Look Like',
    content: 'It\'s one thing to subject yourself to a Halloween costume mishap because, hey, that\'s your prerogative.',
    views: '2',
    time: '26 min'
  },
  {
    id: 19,
    title: 'The Future of Magazines Is on Tablets',
    content: 'Instagram offered a first glimpse at what its ads will look like in a blog post Thursday. The sample ad, which you can see below.',
    views: '3',
    time: '26 min'
  }
];

const PostsList = () => {
  return (
    <div className={styles.postsContainer}>
      { posts.map( (post) => {
        return (<Post {...post} key={post.id}>{post.content}</Post>);
      } ) }
    </div>
  );
};

export default class Events extends Component {
  render() {
    return (
      <div className="container-fluid">
        <HeaderNav />
        <section className="pageContent">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-8">
                <PostsList />
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
