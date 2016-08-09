import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, loadGroups as load} from 'redux/reducers/groupsReducer';
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store}) => {
    if (!isLoaded(store.getState())) {
      return store.dispatch(load());
    }
  }
}])
@connect(
  state => ({
    groups: state.groups.data,
    loading: state.groups.loading
  }),
  {load})

export default class Groups extends Component {
  static propTypes = {
    groups: PropTypes.array,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
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

