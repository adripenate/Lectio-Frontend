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
        //const url = `${API_URL}/users`;
        var usersTemp = [
            {
                "id": 1,
                "firstName": "Jose",
                "lastName": "Maniue",
                "email": "a@a.com",
                "password": "123",
                "photo": "dlkasjd",
                "rol": "Student",
                "additional": "skjafdhsfk"
            },
            {
                "id": 2,
                "firstName": "222",
                "lastName": "Maniue",
                "email": "a@a.com",
                "password": "123rewrewr",
                "photo": "dlkasjd",
                "rol": "Student",
                "additional": "skjafdhsfk"
            },
            {
                "id": 3,
                "firstName": "Josfsdfdsfdsde",
                "lastName": "Manfdfsfdsdiue",
                "email": "aasdasdsad@affffasdasdsadasdd.com",
                "password": "$2a$10$5jViRYItTmey7ZhalqrQmuH7i3/2RbhAyTMbsA3l1Az4Mpq9UhVoq",
                "photo": null,
                "rol": "Student",
                "additional": null
            },
            {
                "id": 4,
                "firstName": "fsdfdsf",
                "lastName": "sdfdsf",
                "email": "dfdfj@j.coddddm",
                "password": "$2a$10$LQitIjyprLKLwtG4Rz8ODO07djXIES5PKFJx6fusuVi.pgoxlP9G2",
                "photo": "",
                "rol": null,
                "additional": "sdfsdf"
            }];
        //return axios.get(url).then(response => response).catch(function (error) {
        //    console.log(error);
        //  });

        return usersTemp;
    }

}