import actions from './';
import util from 'util';

function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

function loadPosts() {
  return {
    types: [actions.POST_LOAD, actions.POST_LOAD_SUCCESS, actions.POST_LOAD_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: `{posts{id, title, body, images, createdAt,updatedAt }}`}} )
  };
}

function toggle() {
  return {type: actions.POST_NEW_TOGGLE};
}

function createNewPost(post, {images}) {
  const newTitle = post.title.trim();
  const newBody = post.body.trim();
  if (!newTitle || !newBody) {
    return {type: ''};
  }
  const newPostImages = images.join(', ');
  const graphQlMutationQuery = `mutation CreatePost { createPost(title: \"${newTitle}\",body: \"${newBody}\",images: \"${newPostImages}\") {id, title,body, images, createdAt,updatedAt }}`;

  return {
    types: [actions.POST_NEW, actions.POST_NEW_SUCCESS, actions.POST_NEW_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: graphQlMutationQuery}} )
  };
}

function deletePost(id) {
  return {
    types: [actions.POST_DELETE, actions.POST_DELETE_SUCCESS, actions.POST_DELETE_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: `mutation DeletePost { deletePost(id: ${id}){ id }}`}} )
  };
}

function editPostStart(id) {
  return { type: actions.POST_EDIT_START, id };
}

function editPostStop(id) {
  return { type: actions.POST_EDIT_STOP, id };
}

function editPost(post) {
  console.log(`post is ${util.inspect(post)}`);
  return {
    types: [actions.POST_UPDATE, actions.POST_UPDATE_SUCCESS, actions.POST_UPDATE_FAIL],
    promise: (client) => client.post( '/graphql', {data: {query: `mutation UpdatePost { updatePost(id: ${post.id}, title: \"${post.title}\", body: \"${post.body}\" ){ id, title, body, createdAt, updatedAt }}`}} )
  };
}


function saveFile(file) {
  console.log(`saving file with name ${file.name}`);
  return {
    types: [actions.SAVE_FILE, actions.SAVE_FILE_SUCCESS, actions.SAVE_FILE_FAIL],
    promise: (client) => client.post( '/file/save', {attach: [file]})
  };
}

export {isLoaded, loadPosts, toggle, createNewPost, deletePost, editPost, editPostStart, editPostStop, saveFile};

