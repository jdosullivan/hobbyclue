import util from 'util';
import lodash from 'lodash';
import actions from '../actions';


const initialState = {
  loaded: false,
  data: [],
  showStatus: false,
  newPost: {
    title: '',
    body: ''
  },
  saving: false,
  deleting: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.posts,
        error: null
      };
    case actions.LOAD_FAIL:
      console.log( `LOAD_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case actions.TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case actions.NEW_POST:
      return {
        ...state,
        saving: true
      };
    case actions.NEW_POST_SUCCESS:
      return {
        ...state,
        data: [action.result.data.createPost, ...state.data],
        saving: false
      };
    case actions.NEW_POST_FAIL:
      console.log( `NEW_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    case actions.DELETE_POST:
      return {
        ...state,
        deleting: true
      };
    case actions.DELETE_POST_SUCCESS:
      const newPostList = lodash.remove(state.data, (currentObj) => {
        return currentObj.id !== action.result.data.deletePost.id;
      });
      return {
        ...state,
        data: newPostList,
        deleting: false
      };
    case actions.DELETE_POST_FAIL:
      console.log( `DELETE_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        deleting: false,
        error: action.error
      };
    default:
      return state;
  }
};
