var bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");

export class cryptoUtils {

  public static decryptoPassword(password: string) {
    return CryptoJS.AES.decrypt(password, 'secretkey').toString(CryptoJS.enc.Utf8);
  }

  public static compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(this.decryptoPassword(password), hash);
  }
  public static hash(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }
}
