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
  deleting: false,
  editing: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.POST_LOAD:
      return {
        ...state,
        loading: true
      };
    case actions.POST_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result.data.posts,
        error: null
      };
    case actions.POST_LOAD_FAIL:
      console.log( `LOAD_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case actions.POST_NEW_TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case actions.POST_NEW:
      return {
        ...state,
        saving: true
      };
    case actions.POST_NEW_SUCCESS:
      return {
        ...state,
        data: [action.result.data.createPost, ...state.data],
        saving: false
      };
    case actions.POST_NEW_FAIL:
      console.log( `NEW_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        saving: false,
        error: action.error
      };
    case actions.POST_DELETE:
      return {
        ...state,
        deleting: true
      };
    case actions.POST_DELETE_SUCCESS:
      const newPostList = lodash.remove( state.data, (currentObj) => {
        return currentObj.id !== action.result.data.deletePost.id;
      } );
      return {
        ...state,
        data: newPostList,
        deleting: false
      };
    case actions.POST_DELETE_FAIL:
      console.log( `DELETE_POST_FAIL with error ${util.inspect( action.error )}` );
      return {
        ...state,
        deleting: false,
        error: action.error
      };
    case actions.POST_EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case actions.POST_EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    default:
      return state;
  }
};
