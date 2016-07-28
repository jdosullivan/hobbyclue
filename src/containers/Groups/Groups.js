import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, load} from 'redux/modules/graphql';
import {asyncConnect} from 'redux-async-connect';
const graphQLGroupsQuery = `{groups{id,name,coverImage,created}}`;

@asyncConnect([{
  deferred: true,
  promise: ({store}) => {
    if (!isLoaded(store.getState())) {
      return store.dispatch(load(graphQLGroupsQuery));
    }
  }
}])
@connect(
  state => ({
    groups: state.graphql.data.groups
  }),
  {load})

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

