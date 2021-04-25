var bcrypt = require('bcryptjs');

export class cryptoUtils {


  public static compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
  public static hash(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }
}
