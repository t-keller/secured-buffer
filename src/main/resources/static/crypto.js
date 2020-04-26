function generateKey() {
  return crypto.subtle.generateKey({
    "name": "AES-GCM",
    "length": 128
  }, true, ["encrypt","decrypt"]);
}

function generateInitialVector() {
  return crypto.getRandomValues(new Uint8Array(12));
}

function exportKey(key) {
  return crypto.subtle.exportKey("jwk", key);
}

async function encrypt(data, key) {
  // String to Uint8Array
  let encodedData = new TextEncoder().encode(data);
  let iv = generateInitialVector();
  // ArrayBuffer backed by Uint8Array
  let cipherText = await crypto.subtle.encrypt({"name": "AES-GCM","iv": iv}, key, encodedData);
  return {"content": cipherText, "iv": iv};
}

async function decrypt(cipherText, iv, key) {
  let decrypted = await crypto.subtle.decrypt({
    "name": "AES-GCM",
    "iv": iv
  }, key, cipherText);

  let decoded = new TextDecoder().decode(decrypted);
  return decoded;
}

function packageCipherText(cipher) {
  let cipherBytes = new Uint8Array(cipher.content);
  let binaryString = String.fromCharCode(...cipherBytes);
  let ivString = String.fromCharCode(...cipher.iv);

  let packagedCipher = {
    "content": btoa(binaryString),
    "iv": btoa(ivString)
  };

  return packagedCipher;
}

function binaryStringToUint8Array(str) {
  let bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

function unpackageCipherText(unpackagedCipherText) {
  let cipherString = atob(unpackagedCipherText.content);
  let ivString = atob(unpackagedCipherText.iv);

  const cipherBytes = binaryStringToUint8Array(cipherString);
  const ivBytes = binaryStringToUint8Array(ivString);

  unpackagedCipherText.content = cipherBytes.buffer;
  unpackagedCipherText.iv = ivBytes;

  return unpackagedCipherText;
}
