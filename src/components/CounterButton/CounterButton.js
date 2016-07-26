import React, {Component, PropTypes} from 'react';
import {connectMultireducer} from 'multireducer';
import {increment, decrement} from '../../redux/modules/counter';

@connectMultireducer(
  (key, state) => ({count: state.multireducer[key].count}),
  {increment, decrement}
)
export default class CounterButton extends Component {
  static propTypes = {
    count: PropTypes.number,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  props = {
    className: ''
  };

  render() {
    const {count, increment, decrement} = this.props; // eslint-disable-line no-shadow
    let {className} = this.props;
    className += ' btn btn-default';
    return (
      <div>
        <button className={className} onClick={decrement}>-</button>
        <span>{count} time{count === 1 ? '' : 's'}</span>
        <button className={className} onClick={increment}>+</button>
      </div>
    );
  }
}

