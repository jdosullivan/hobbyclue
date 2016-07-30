import Promise from 'bluebird';
import fetch, { Request, Headers, Response } from 'node-fetch';
import { host, port } from '../../../config';

fetch.Promise = Promise;
Response.Promise = Promise;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${host}:${port}${url}`;
}

function localFetch(url, options) {
  var formattedurl = localUrl(url);
  console.log(`formattedurl is ${formattedurl}`);
  return fetch(formattedurl, options);
}

export { localFetch as default, Request, Headers, Response };
