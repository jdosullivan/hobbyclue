// import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
// import {isLoaded, loadGraphQL as loadGraphQL} from 'redux/modules/widgets';
// import {toggleFilters} from '../../redux/modules/filters';
// import {asyncConnect} from 'redux-async-connect';
//
// @asyncConnect([{
//   deferred: true,
//   promise: ({store}) => {
//     if (!isLoaded(store.getState())) {
//       return store.dispatch(loadGraphQL());
//     }
//   }
// }])
// @connect(
//   (state) => ({
//     showFilters: state.filters.showFilters,
//     widgets: state.widgets.data
//   }), {toggleFilters, loadGraphQL})
//
// export default class Filters extends Component {
//   static propTypes = {
//     showFilters: PropTypes.bool,
//     widgets: PropTypes.object,
//     toggleFilters: PropTypes.func.isRequired,
//     loadGraphQL: PropTypes.func.isRequired
//   };
//
//   render() {
//     const {showFilters, toggleFilters,widgets} = this.props; // eslint-disable-line no-shadow
//     const linkText = showFilters ? 'Fewer Filters' : 'More Filters';
//
//     return (
//       <div>
//         <div>I am a filter</div>
//         <div>
//           {widgets && widgets.groups && widgets.groups.length &&
//           widgets.groups.map((widget) =>
//             <div key={widget.id}>
//               <span>{widget.id}</span>
//             </div>)
//           }
//         </div>
//         <a
//           onClick={toggleFilters}
//           className="toggle-filters-link">
//           {linkText}
//         </a>
//       </div>
//     );
//   }
// }
//

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isLoaded, loadGraphQL as loadGraphQL} from 'redux/modules/widgets';
import {asyncConnect} from 'redux-async-connect';
import {toggleFilters} from '../../redux/modules/filters';

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
    showFilters: state.filters.showFilters,
    widgets: state.widgets.data
  }),
  {toggleFilters, loadGraphQL})

export default class Widgets extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    loadGraphQL: PropTypes.func.isRequired,
    showFilters: PropTypes.bool,
    toggleFilters: PropTypes.func.isRequired
  };

  render() {
    const {showFilters, toggleFilters, widgets} = this.props;
    const linkText = showFilters ? 'Fewer Filters' : 'More Filters';
    return (
      <div>
        <a onClick={toggleFilters}
          className="toggle-filters-link">
          {linkText}
        </a>
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


