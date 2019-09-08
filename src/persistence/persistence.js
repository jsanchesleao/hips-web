import {getRsaKeys, rsaDecrypt} from '../crypto/cryptography';

export function getData(masterKey, username) {
  let privateKey;
  return getRsaKeys(masterKey).then((keys) => {
    privateKey = keys.privateKey;
    return getRawData(username);
  }).then(rawData => rsaDecrypt(privateKey, rawData));
}

function getRawData(username) {
    return getGistId(username)
    .then(id => fetch(`https://api.github.com/gists/${id}`))
    .then(result => result.json())
    .then(gist => {
      return gist.files['hips_passwords'].content;
    });
}

function getGistId(username) {
  if (window.localStorage.gistId) {
    return Promise.resolve(window.localStorage.gistId);
  }
  return fetch(`https://api.github.com/users/${username}/gists`)
  .then(result => result.json())
  .then(gists => gists.find(gist => gist.description.match(/^hips.storage$/)))
  .then(gist => {
    window.localStorage.gistId = gist.id;
    return gist.id;
  });
}