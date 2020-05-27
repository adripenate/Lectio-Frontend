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

export class APIClubService {

    constructor(){
        headers.Authorization = localStorage.getItem("token");
        headersUpdate.Authorization = localStorage.getItem("token");
    }
    async createClub(club){
        const url = `${API_URL}/clubs`;
        return await axios.post(url, club, {
            headers: headers
        });
    }

    async getClubs() {
        const url = `${API_URL}/clubs`;
        return await axios.get(url, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async getMyClubs(idUser) {
        const url = `${API_URL}/clubs/`;
        return await axios.get(url+idUser, {
            headers: headers
        }).then((response) => response).catch( error => { console.log(error); });
    }

    async suscribe(idUser, idClub){
        const url = `${API_URL}/clubs/subscribe`;
        return await axios.post(url+"?user_id="+idUser+"&club_id="+idClub, "", {
            headers: headersUpdate
        });
    }

    async unsuscribe(idUser, idClub){
        const url = `${API_URL}/clubs/unsubscribe`;
        return await axios.delete(url+"?user_id="+idUser+"&club_id="+idClub, {
            headers: headersUpdate
        });
    }
}