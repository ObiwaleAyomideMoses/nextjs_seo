'use client';
import { jwtDecode } from 'jwt-decode';
import * as jose from 'jose';
import { secp256k1 } from 'ethereum-cryptography/secp256k1';
import { keccak256 } from 'ethereum-cryptography/keccak';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';
// import { openDB } from 'idb';
import { Buffer } from 'buffer';
import sss from 'shamirs-secret-sharing';
import Web3 from 'web3';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

// const secret = '4865616c2324476f7425546865572472';
// const initVector = '6824616c74682553';
export const validateIDToken = async (idToken: string) => {
  try {
    // Decode the ID token
    const decodedToken: any = jwtDecode(idToken);

    // Verify the token's signature and expiration
    const { iss, aud, exp } = decodedToken;
    const isExpired = exp < Date.now() / 1000;

    if (isExpired) throw new Error('Token expired');

    // Fetch the public key from the identity provider
    const JWKS = await jose.createRemoteJWKSet(
      new URL(`https://www.googleapis.com/oauth2/v3/certs`)
    );

    // Validate the token signature
    const { payload } = await jose.jwtVerify(idToken, JWKS, {
      issuer: iss,
      audience: aud,
    });

    // ID Token is valid, proceed with the flow
    // console.log('Token is valid:', payload);

    return payload;
  } catch (error) {
    console.error('Invalid ID token:', error);
  }
};

const secretKey = 'my-secret-key-12345';

export const handleEncrypt = (share: string) => {
  const plaintext = share;

  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  console.log('Encrypted text:', ciphertext);
  return ciphertext;
};

export const handleDecrypt = (share_enc: string) => {
  const bytes = CryptoJS.AES.decrypt(share_enc, secretKey);
  const plainText = bytes.toString(CryptoJS.enc.Utf8);
  return plainText;
};

export const storeDeviceShare = async (share: string) => {
  const encryptedShare = handleEncrypt(share);
  localStorage.setItem('share', encryptedShare);
  return;
  // try {
  //   const db = await openDB('device-share', 1, {
  //     upgrade(db) {
  //       db.createObjectStore('shares', {
  //         keyPath: 'id',
  //         autoIncrement: true,
  //       });
  //     },
  //   });
  //   // Store device share
  //   return await db
  //     .put('shares', { id: 'deviceShare', share: encryptedShare })
  //     .then((res) => {
  //       console.log('========== stored device share ========');
  //       console.log(res);
  //       return true;
  //     })
  //     .catch((err) => {
  //       console.log('====== Failed to store device share =======');
  //       console.log(err);
  //       return false;
  //     });
  // } catch (err) {
  //   console.log('====== Failed to store device share =======');
  //   console.log(err);
  //   return false;
  // }
};

export const getDeviceShare = async () => {
  const share = localStorage.getItem('share');

  if (share) {
    const decryptedShare = handleDecrypt(share);

    return decryptedShare as string;
  } else return null;
  // const db = await initDB();
  // const storedShare = await db.get('shares', 'deviceShare');
  // if (storedShare) {
  //   const decryptedShare = handleDecrypt(storedShare.share);
  //   return decryptedShare as string;
  // } else return null;
};

// const initDB = async () => {
//   const db = await openDB('device-share', 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains('shares')) {
//         db.createObjectStore('shares', { keyPath: 'id' });
//       }
//     },
//   });
//   return db;
// };

export const getUserPublicKey = async (sub: string) => {
  // const serverResponse =
};
export const saveShareToProvider = async (share: string, sub: string) => {
  const encryptedShare = handleEncrypt(share);
  return await axios
    .post('http://localhost:3001/save-share', {
      sub,
      share_e: encryptedShare,
    })
    .then((res) => {
      if (res.data.status === 'success') {
        return true;
      } else return false;
    })
    .catch((err) => {
      console.log('========= Failed to save share to provider ========');
      console.log(err);
      return false;
    });
};

export const generateWallet = async (sub: string) => {
  // check if db has a share
  const storedShare = await getDeviceShare();
  if (storedShare) {
    // get user wallet address
    console.log('Stored share:', storedShare);
    // reconstruct the private key
    const shares = [storedShare];
    const priv = combineSecret(shares);
    console.log('========= private key before sharing ==========');
    console.log(priv);
    const publicKeyUncomp = secp256k1.getPublicKey(priv, false);
    const address = keccak256(publicKeyUncomp.slice(1)).slice(-20);
    const addressHex = '0x' + toHex(address);
    return {
      privateKey: priv,
      shares: shares,
      address: addressHex,
    };
  }
  // return;
  console.log('========= Generating wallet ==========');
  const keyShare = keccak256(utf8ToBytes(sub));
  console.log('========= key sub ==========');
  // console.log(keyShare);
  console.log(Buffer);

  const randomKeyShare = secp256k1.utils.randomPrivateKey();
  const combinedKey = Buffer.from(keyShare).map(
    (byte, index) => byte ^ randomKeyShare[index]
  );
  const privateKeyHex = toHex(combinedKey);
  const publicKeyComp = secp256k1.getPublicKey(combinedKey, true);
  // Derive the uncompressed public key from the private key
  const publicKeyUncomp = secp256k1.getPublicKey(combinedKey, false);
  const address = keccak256(publicKeyUncomp.slice(1)).slice(-20);
  const addressHex = '0x' + toHex(address);
  console.log('========= private key before sharing ==========');
  console.log(privateKeyHex);
  try {
    const shares = splitSecret(privateKeyHex, 1, 1);

    const [deviceShare] = await Promise.all([
      // saveShareToProvider(shares[0], sub),
      storeDeviceShare(shares[0]),
    ]);
    // console.log('========= provider share saved ==========');
    // console.log(providerShare);
    console.log('========= device share saved ==========');
    console.log(deviceShare);

    console.log('========== shares ==========');
    console.log(shares);
    const priv = combineSecret(shares);
    console.log('========= private key after combining ==========');
    console.log(priv);
    return {
      privateKey: privateKeyHex,
      shares: shares,
      address: addressHex,
    };
  } catch (err) {
    console.log(err);
  }
};

const combineSecret = (sharesHex: any) => {
  // Convert hex shares back to Buffers
  const shares = sharesHex.map((shareHex: any) => Buffer.from(shareHex, 'hex'));

  // Combine the shares to reconstruct the secret
  const secretBuffer = sss.combine(shares);

  // Convert the Buffer back to a hex string
  return secretBuffer.toString('hex');
};

const splitSecret = (
  secretHex: string,
  totalShares: number,
  threshold: number
) => {
  // Convert the secret to a Buffer
  const secretBuffer = Buffer.from(secretHex, 'hex');

  // Split the secret into shares
  const shares = sss.split(secretBuffer as any, {
    shares: totalShares,
    threshold: threshold,
  });

  // Convert shares to hex for storage or transmission
  const sharesHex = shares.map((share: any) => share.toString('hex'));
  return sharesHex;
};

export const getUsdcBalance = async (address: string) => {
  const web3_instance = new Web3(
    'https://sepolia.infura.io/v3/60b469b5df9544f99339f0a5d2bdb70d'
  );
  const abiErc20 = [
    {
      constant: true,
      inputs: [{ name: 'who', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const usdcContract = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
  const usdtContractInstance = new web3_instance.eth.Contract(
    abiErc20,
    usdcContract
  );

  const balance = await usdtContractInstance.methods.balanceOf(address).call();
  return Number(balance) / 10 ** 6;
};
