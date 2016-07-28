import fetch from '../data/fetch';

function getJson(query) {
  return fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query
    }),
    credentials: 'include'
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      var result = response.json();
      return result;
    })
    .then(json => {
      return json.data;
    });
}

const graphQLClient = {
  get: getJson
};

export default graphQLClient;