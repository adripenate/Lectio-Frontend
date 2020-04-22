import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const headers = {
    'Content-Type': 'application/json'
  }

export class APIService {

    constructor(){}

    async createUser(user){
        const url = `${API_URL}/users`;
        return await axios.post(url, user, {
            headers: headers
        });
    }

    getSomething() {
        const url = `${API_URL}/`;
        return axios.get(url).then(response => response.data);
    }

    async getUsers() {
        const url = `${API_URL}/users`;
        return await axios.get(url).then((response) => response.data).catch( error => { console.log(error); });
    }

    async deleteUser(id) {
        const url = `${API_URL}/users/`;
        return await axios.delete(url + id, {
            headers: headers
        }).catch( error => { console.log(error); });
    }




}