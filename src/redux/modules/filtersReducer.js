import { TOGGLEFILTERS } from '../actions';

const initialState = {
  showFilters: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLEFILTERS:
      return {
        showFilters: !state.showFilters
      };
    default:
      return state;
  }
}

export function toggleFilters() {
  return {
    type: TOGGLEFILTERS
  };
}
