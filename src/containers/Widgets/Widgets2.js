import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, loadGraphQL as loadGraphQL} from 'redux/modules/widgets';
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store, helpers}) => {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadGraphQL());
    }
  }
}])
@connect(
  state => ({
    widgets: state.widgets.data
  }),
  {loadGraphQL})

export default class Widgets2 extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    loadGraphQL: PropTypes.func.isRequired
  };

  render() {
    const {widgets} = this.props;
    return (
      <div>
        {widgets && widgets.groups && widgets.groups.length &&
          widgets.groups.map((widget) =>
          <div key={widget.id}>
            <span>{widget.id}</span>
          </div>)
        }
      </div>
    );
  }
}

