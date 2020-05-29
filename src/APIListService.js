import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
/*const headerLogin = {
    'Content-Type': 'application/json'
}*/

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

export class APIListService {

    constructor(){
        headers.Authorization = localStorage.getItem("token");
        headersUpdate.Authorization = localStorage.getItem("token");
    }

    async createList(list, userID){
        const url = `${API_URL}/users/`;
        return await axios.post(url + userID + "/list", list, {
            headers: headersUpdate
        });
    }

    async getBookOfList(idUser,name) {
        const url = `${API_URL}/users/`;
        return await axios.get(url + idUser + "/list/"+name, {
            headers: headersUpdate
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async getList(idUser) {
        const url = `${API_URL}/users/`;
        return await axios.get(url + idUser + "/list", {
            headers: headersUpdate
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async addBookTo(data){
        const url = `${API_URL}/lists`;
        return await axios.post(url, data, {
            headers: headersUpdate
        });
    }

    async deleteBookFromList(list_id,book_id) {
        const url = `${API_URL}/lists/`;
        return await axios.delete(url + list_id + "?bookId=" + book_id, {
            headers: headersUpdate
        }).catch( error => { console.log(error); });
    }
}