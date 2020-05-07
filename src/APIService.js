import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const headerLogin = {
    'Content-Type': 'application/json'
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token")
}

const headersUpdate = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token"),
    'Access-Control-Allow-Origin' : 'http://localhost:8080',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'application/json'
}

export class APIService {

    constructor(){}

    async login(user){
        const url = `${API_URL}/login`;
        return await axios.post(url, user, {
            headers: headerLogin
        });
    }

    async createUser(user){
        const url = `${API_URL}/users`;
        return await axios.post(url, user, {
            headers: headers
        });
    }

    async updateUser(id,user){
        const url = `${API_URL}/users/`;
        console.log(headersUpdate);
        return await axios.put(url+id, user, {
            headers: headersUpdate
        });
    }

    getSomething() {
        const url = `${API_URL}/`;
        return axios.get(url).then(response => response.data);
    }

    async getUsers() {
        console.log(localStorage.getItem("token"));
        const url = `${API_URL}/users`;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response.data).catch( error => { console.log(error); });
    }

    async getUser(id) {
        const url = `${API_URL}/users/`;
        return await axios.get(url + id, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async deleteUser(id) {
        const url = `${API_URL}/users/`;
        return await axios.delete(url + id, {
            headers: headersUpdate
        }).catch( error => { console.log(error); });
    }




}