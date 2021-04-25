import axios from 'axios'

export class AuthService {


    Login(email, password) {
        console.log(this.request)
        return axios.post('http://backend:3000/auth/signin', {
            email,
            password
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        }) 
    }
}