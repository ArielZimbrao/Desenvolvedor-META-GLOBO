import axios from 'axios'
import crypto from 'crypto-js'
import Store from "../views/store";

export class RequestService {

    IsAuthenticate() {
        let accessToken = Store.state.accessToken;

        if (!accessToken) {
            let userInfo = localStorage.getItem('user-info');
            userInfo = JSON.parse(userInfo);

            if (!userInfo) {
                return false;
            }

            Store.dispatch("SET_ACCESS_TOKEN", userInfo.accessToken);
            Store.dispatch("SET_USER_EMAIL", userInfo.email);
            Store.dispatch("SET_ROLE", userInfo.role);
            accessToken = userInfo.accessToken;
        }
        return accessToken !== null;
    }

    Logoff() {
        Store.dispatch("LOGOFF");
        localStorage.removeItem('user-info');
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
            localStorage.setItem('user-info', JSON.stringify({
                accessToken: data.accessToken,
                email: email,
                role: data.role,
            }));
            setTimeout(() => {
                this.Logoff();
            }, data.expiresIn);
            
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        }) 
    }

    GetCpuUsage() {
        return axios.get('http://localhost:3000/stats/cpu', {
            headers: {
                "Authorization": `Bearer ${Store.state.accessToken}`,
            }
        }).then((result) => {
            return result.data;
        }).catch((error) => {
            console.log(error);
            return false;
        })
    }

    GetMemoryUsage() {
        return axios.get('http://localhost:3000/stats/memory', {
            headers: {
                "Authorization": `Bearer ${Store.state.accessToken}`,
            }
        }).then((result) => {
            return result.data;
        }).catch((error) => {
            console.log(error);
            return false;
        })
    }

    GetClusterStatus() {
        return axios.get('http://localhost:3000/stats/cluster/status', {
            headers: {
                "Authorization": `Bearer ${Store.state.accessToken}`,
            }
        }).then((result) => {
            return result.data;
        }).catch((error) => {
            console.log(error);
            return false;
        })
    }

    GetAllUser() {
        return axios.get('http://localhost:3000/user', {
            headers: {
                "Authorization": `Bearer ${Store.state.accessToken}`,
            }
        }).then((result) => {
            return result.data;
        }).catch((error) => {
            console.log(error);
            return false;
        })
    }
}