import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {toggleFilters} from '../../redux/reducers/filtersReducer';

@connect(
  (state) => ({
    showFilters: state.filters.showFilters
  }), {toggleFilters})

export default class Filters extends Component {
  static propTypes = {
    showFilters: PropTypes.bool,
    toggleFilters: PropTypes.func.isRequired
  };

  render() {
    const {showFilters, toggleFilters} = this.props; // eslint-disable-line no-shadow
    const linkText = showFilters ? 'Fewer Filters' : 'More Filters';

    return (
      <div>
        <div>I am a filter</div>
        <a
          onClick={toggleFilters}
          className="toggle-filters-link">
          {linkText}
        </a>
      </div>
    );
  }
}
