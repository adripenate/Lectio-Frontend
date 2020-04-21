import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const headers = {
    'Content-Type': 'application/json'
  }

export class APIService {

    constructor(){}

    createUser(user){
        const url = `${API_URL}/users`;
        return axios.post(url, user, {
            headers: headers
        });
    }

    getSomething() {
        const url = `${API_URL}/`;
        return axios.get(url).then(response => response.data);
    }

    getUsers() {
        const url = `${API_URL}/users`;
        return axios.get(url).then(response => response).catch(function (error) {
            console.log(error);
          });
    }

}