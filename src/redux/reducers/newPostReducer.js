import util from 'util';

const TOGGLE = 'yoorcity/posts/TOGGLE';
const NEW_POST = 'yoorcity/posts/NEW_POST';
const NEW_POST_SUCCESS = 'yoorcity/events/NEW_POST_SUCCESS';
const NEW_POST_FAIL = 'yoorcity/events/NEW_POST_FAIL';


const initialState = {
  showStatus: false,
  title: '',
  body: '',
  saving: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case NEW_POST:
      console.log(`NEW_POST`);
      return {
        ...state,
        saving: true
      };
    case NEW_POST_SUCCESS:
      console.log(`NEW_POST_SUCCESS with data ${util.inspect(action.result.data)}`);
      return {
        ...state,
        data: action.result.data,
        saving: false
      };
    case NEW_POST_FAIL:
      console.log(`NEW_POST_FAIL with error ${util.inspect(action.error)}`);
      return {
        ...state,
        data: null,
        saving: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function toggle() {
  return {type: TOGGLE};
}

export function createNewPost(title, body) {
  const newTitle = title.trim();
  const newBody = body.trim();
  if (!newTitle || !newBody) {
    return {type: ''};
  }
  const graphQlMutationQuery = `mutation CreatePost { createPost(title: \"${newTitle}\",body: \"${newBody}\") {id, title,body, createdAt,updateAt }}`;

  return {
    types: [NEW_POST, NEW_POST_SUCCESS, NEW_POST_FAIL],
    promise: (client) => client.post('/graphql', {data: { query: graphQlMutationQuery }})
  };
}
