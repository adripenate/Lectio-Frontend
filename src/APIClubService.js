import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
/*const headerLogin = {
    'Content-Type': 'application/json'
}*/

const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token")
}
/*
const headersUpdate = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("token"),
    'Access-Control-Allow-Origin' : 'http://localhost:8080',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':'application/json'
}*/

export class APIClubService {

    constructor(){}

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
}