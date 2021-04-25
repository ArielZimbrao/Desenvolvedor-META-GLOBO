import axios from 'axios'
import crypto from 'crypto-js'

export class RequestService {
    email = '';
    password = '';
    accessToken = null;

    RefreshToken() {
        return this.Login(this.email, this.password);
    }

    Login(email, password) {
        password = crypto.AES.encrypt(password, 'secretkey').toString();
        return axios.post('http://localhost:3000/auth/signin', {
            email,
            password
        }).then((result) => {
            const data = result.data;
            this.accessToken = data.accessToken;
            this.email = email;
            this.password = password;

            setTimeout(() => {
                this.accessToken = null;
            }, data.expiresIn);
            
            return true;
        }).catch((error) => {
            console.error(error.data);
            return false;
        }) 
    }
}