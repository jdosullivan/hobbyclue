import fetch from '../graphql/fetch';

function getJson(query) {
  return new Promise((resolve, reject) => {
    fetch('/graphql', {
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
          return reject(response.statusText);
        }
        return response.json();
      })
      .then(json => {
        resolve(json.data);
      });
  });
}

const graphQLClient = {
  get: getJson
};

export default graphQLClient;
