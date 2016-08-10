import actions from '../actions';

const initialState = {
  loaded: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CITY_LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.CITY_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.city,
        error: null
      };
    case actions.CITY_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
};
