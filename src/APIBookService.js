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

export class APIBookService {

    constructor(){
        headers.Authorization = localStorage.getItem("token");
        headersUpdate.Authorization = localStorage.getItem("token");
    }

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

    async createReview(review){
        const url = `${API_URL}/reviews`;
        return await axios.post(url, review, {
            headers: headers
        });
    }

    async hasUserReview(idUser, idBook) {
        const url = `${API_URL}/reviews?user_id=` + idUser + `&book_id=` + idBook;
        return await axios.get(url, {
            headers: headersUpdate
        }).then((response) => response).catch( error => { console.log(error); });
    }

    ///api/books/search?title={title}&author={author}&genre={genre}&publisher={publisher}
    async searchBook(limit, offset, title, author, publisher, genre) {
        const url = `${API_URL}/books/search?limit=` + limit + `&offset=` + offset + `&title=` + title + '&author=' + author
                    + '&genre=' + genre + '&publisher=' + publisher;
        return await axios.get(url, {
            headers: headersUpdate
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async getReviewsOfBook(limit, offset, bookID) {
        const url = `${API_URL}/reviews/` + bookID + `?limit=`+limit+'&offset='+offset;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }
}