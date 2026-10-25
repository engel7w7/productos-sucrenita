const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const targetDir = __dirname;
const keyPath = path.join(targetDir, 'private.key');
const certPath = path.join(targetDir, 'certificate.crt');
const fullchainPath = path.join(targetDir, 'fullchain.crt');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

fs.writeFileSync(keyPath, privateKey);
fs.writeFileSync(certPath, publicKey);
fs.writeFileSync(fullchainPath, publicKey);

console.log('Certificados SSL generados localmente:');
console.log('Key:', keyPath);
console.log('Cert:', certPath);
console.log('Fullchain:', fullchainPath);
