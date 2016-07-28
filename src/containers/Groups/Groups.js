import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load as loadGraphQL} from 'redux/modules/graphql';
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store}) => {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadGraphQL());
    }
  }
}])
@connect(
  state => ({
    groups: state.widgets.data.groups
  }),
  {loadGraphQL})

export default class Groups extends Component {
  static propTypes = {
    groups: PropTypes.object,
    loadGraphQL: PropTypes.func.isRequired
  };

  render() {
    const {groups} = this.props;
    return (
      <div>
        {groups && groups.length &&
        groups.map((group) =>
          <div key={group.id}>
            <span>Id: {group.id}</span>
          </div>)
        }
      </div>
    );
  }
}

