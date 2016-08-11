import React, {Component, PropTypes} from 'react';

export default class Events extends Component {
  static propTypes = {
    posts: PropTypes.array,
    user: PropTypes.object,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="container-fluid">
        <section className="pageContent">
          <div className="container">
            <div className="row">
              Landing page here
            </div>
          </div>
        </section>
      </div>
    );
  }
}
