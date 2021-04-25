import axios from 'axios'
import crypto from 'crypto-js'
import Store from "../views/store";

export class RequestService {

    IsAuthenticate() {
        return Store.default.accessToken !== null;
    }

    Login(email, password) {
        password = crypto.AES.encrypt(password, 'secretkey').toString();
        return axios.post('http://localhost:3000/auth/signin', {
            email,
            password
        }).then((result) => {
            const data = result.data;

            Store.dispatch("SET_ACCESS_TOKEN", data.accessToken);
            Store.dispatch("SET_USER_EMAIL", email);
            Store.dispatch("SET_ROLE", data.role);
            setTimeout(() => {
                Store.dispatch("LOGOFF");
            }, data.expiresIn);
            
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        }) 
    }

    GetCpuUsage() {
        return axios.get('http://localhost:3000/stats/cpu', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access-token')}`,
            }
        }).then((result) => {
            return result.data;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }

    GetMemoryUsage() {
        return axios.get('http://localhost:3000/stats/memory', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access-token')}`,
            }
        }).then((result) => {
            return result.data;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }
}