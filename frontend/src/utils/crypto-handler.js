import crypto from 'crypto-js'

export class CryptoHandler {
    static encrypt(text) {
        return crypto.AES.encrypt(text, 'secretkey').toString();
    }
}