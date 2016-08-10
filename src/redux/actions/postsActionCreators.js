import actions from './';

function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

function loadPosts() {
  return {
    types: [actions.LOAD, actions.LOAD_SUCCESS, actions.LOAD_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: `{posts{id, title,body, createdAt,updatedAt }}`}} )
  };
}

function toggle() {
  return {type: actions.TOGGLE};
}

function createNewPost(title, body) {
  const newTitle = title.trim();
  const newBody = body.trim();
  if (!newTitle || !newBody) {
    return {type: ''};
  }
  const graphQlMutationQuery = `mutation CreatePost { createPost(title: \"${newTitle}\",body: \"${newBody}\") {id, title,body, createdAt,updatedAt }}`;

  return {
    types: [actions.NEW_POST, actions.NEW_POST_SUCCESS, actions.NEW_POST_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: graphQlMutationQuery}} )
  };
}

function deletePost(id) {
  return {
    types: [actions.DELETE_POST, actions.DELETE_POST_SUCCESS, actions.DELETE_POST_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: `mutation DeletePost { deletePost(id: ${id}){ id }}`}} )
  };
}

export {isLoaded, loadPosts, toggle, createNewPost, deletePost};

