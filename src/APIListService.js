import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
/*const headerLogin = {
    'Content-Type': 'application/json'
}*/

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token")
}

/*const headersUpdate = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token"),
    'Access-Control-Allow-Origin' : 'http://localhost:8080',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'application/json'
}*/

export class APIListService {

    constructor(){}

    async createBook(book){
        const url = `${API_URL}/books`;
        return await axios.post(url, book, {
            headers: headers
        });
    }

    async getBooks(limit, offset) {
        const url = `${API_URL}/books/?limit=`+limit+'&offset='+offset;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async getBook(id) {
        const url = `${API_URL}/books/`;
        return await axios.get(url + id, {
            headers: headersUpdate
        }).then((response) => response).catch( error => { console.log(error); });
    }
}