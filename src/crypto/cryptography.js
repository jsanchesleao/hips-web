import NodeRSA from 'node-rsa';

export function getRsaKeys(masterPassword) {
  const hipsData = JSON.parse(window.localStorage.hips);

  return deriveKey(masterPassword, hipsData.salt)
    .then(key => {
      let iv = Uint8Array.from(atob(hipsData.iv), c => c.charCodeAt(0));
      let encoded = Uint8Array.from(atob(hipsData.keys), c => c.charCodeAt(0));
      return window.crypto.subtle.decrypt({
        name: 'AES-CBC',
        iv: iv
      }, key, encoded)
    })
    .then(buffer => {
      const decodedString = new TextDecoder().decode(buffer);
      const keys = JSON.parse(decodedString);
      validateKeys(keys);
      return keys;
    });
}

export function rsaDecrypt(privateKey, data) {
  const key = new NodeRSA();
  key.importKey(privateKey);

  const result = new TextDecoder().decode(key.decrypt(data));
  return JSON.parse(result);
}
  

function deriveKey(passString, saltString) {
  let pass = Uint8Array.from(passString, c => c.charCodeAt(0));
  let salt = Uint8Array.from(atob(saltString), c => c.charCodeAt(0));
  return window.crypto.subtle.importKey(
      "raw",
      pass,
      {
          name: "PBKDF2",
      },
      false,
      ["deriveKey", "deriveBits"]
  ).then(key => window.crypto.subtle.deriveKey(
    {
        "name": "PBKDF2",
        salt: salt,
        iterations: 10000,
        hash: {name: "SHA-256"},
    },
    key,
    { 
        name: "AES-CBC", 
        length: 256,
    },
    false, 
    ["encrypt", "decrypt"]
  ));
}

function validateKeys(keys) {
  if(!keys.privateKey || !keys.publicKey) {
    throw new Error('Invalid decrypted data');
  }
}