import util from 'util';

const TOGGLE = 'yoorcity/posts/TOGGLE';
const NEW_POST = 'yoorcity/posts/NEW_POST';

const initialState = {
  showStatus: false,
  title: '',
  body: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        showStatus: !state.showStatus
      };
    case NEW_POST:
      const newState = {
        ...state,
        title: '',
        body: ''
      };
      console.log( `current state of things ${util.inspect( newState )}` );
      return newState;
    default:
      return state;
  }
}

export function toggle() {
  console.log( `new post toggle triggered` );
  return {type: TOGGLE};
}

export function createNewPost(title, body) {
  const newTitle = title.trim();
  const newBody = body.trim();
  if (!newTitle || !newBody) {
    return {type: ''};
  }
  return {type: NEW_POST, newTitle, newBody};
}
