declare module 'crypto-js' {
  namespace CryptoJS {
    namespace AES {
      function encrypt(
        message: string | CryptoJS.lib.WordArray,
        key: string | CryptoJS.lib.WordArray,
        options?: CryptoJS.lib.CipherOption
      ): CryptoJS.lib.CipherParams;
      function decrypt(
        ciphertext: string | CryptoJS.lib.CipherParams,
        key: string | CryptoJS.lib.WordArray,
        options?: CryptoJS.lib.CipherOption
      ): CryptoJS.lib.WordArray;
    }
    namespace enc {
      const Utf8: CryptoJS.enc.IEncoder;
    }
    namespace lib {
      interface WordArray {
        sigBytes: number;
        words: number[];
        toString(encoder?: CryptoJS.enc.IEncoder): string; // Add this line
      }
      interface CipherParams {
        toString(encoder?: CryptoJS.enc.IEncoder): string;
      }
      interface CipherOption {}
      interface IEncoder {
        parse(str: string): CryptoJS.lib.WordArray;
        stringify(wordArray: CryptoJS.lib.WordArray): string;
      }
    }
  }
  export = CryptoJS;
}
