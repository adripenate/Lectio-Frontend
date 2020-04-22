<template>
<div class="hello">
    <b-container class="bv-row">
        <h1 class="title">Edit user</h1>
        <b-form @submit="onSubmit" v-if="show" header='Create a new user'>
        <b-row>
            <b-col md="2" offset="2"><label for="name-field">Name:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="name-field"
                    v-model="form.firstName"
                    required
                    placeholder="Enter name"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col md="2" offset="2"><label for="surname-field">Surname:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="surname-field"
                    v-model="form.lastName"
                    required
                    placeholder="Enter surname"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="email-field">Email address:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="email-field"
                    v-model="form.email"
                    :state="emailValidation"
                    type="email"
                    required
                    placeholder="Enter email"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row>
            <b-col md="6" offset="2">
                <b-form-invalid-feedback :state="emailValidation">
                    Please enter a valid email
                </b-form-invalid-feedback>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="roles-field">Role:</label></b-col>
            <b-col md="6">
                <b-form-select
                    id="role-field"
                    v-model="form.role"
                    :options="roles"
                    required
                ></b-form-select>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col md="2" offset="2"><label for="additional-data-field">Additional data:</label></b-col>
            <b-col md="6">
                <b-form-textarea
                    id="additional-data-field"
                    v-model="form.additional"
                    placeholder="Enter user additional data..."
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="photo-field">Photo:</label></b-col>
            <b-col md="6">
                <b-form-file
                    id="photo-field"
                    v-model="form.photo"
                    type="file"
                ></b-form-file>
            </b-col>
        </b-row>

        <b-row class="mt-2 justify-content-md-center" >
            <b-col md="4"><b-button type="submit" variant="primary">Submit</b-button></b-col>
        </b-row>

        <b-alert class="m-5" variant="success" show v-if="successUptatedUser">Successful updated!</b-alert>
        <b-alert class="m-5" variant="danger" show v-if="error">An error has ocurred!</b-alert>
    </b-form>
</b-container>
</div>
</template>

<script>
  import {APIService} from '../APIService';
  export default {
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          photo: '',
          role: [],
          additional: ''
        },
        successUptatedUser : false,
        error : false,
        roles: [{ text: 'Select One', value: null }, 'Student', 'Librarian', 'Administrator'],
        show: true
      }
    },

    computed:{
        emailValidation() {
            if(this.form.email != ''){
                var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(this.form.email);
            }
            return null;
        }
    },

    mounted(){
        this.getUserData();
    },
    methods: {
        onSubmit() {
            const apiService = new APIService();
            var data = apiService.updateUser(this.$route.params.id,JSON.stringify(this.form));
            data.then(result => {
                if (result.status == 202) {
                    this.successUptatedUser = true;
                } else {
                    this.error = true;
                }}).catch(error => alert(error))
            
        },
        getUserData(){
            var apiService = new APIService();
            apiService.getUser(this.$route.params.id).then(result => {
                if (result.status == 200) {
                    this.setData(result.data);
                } else {
                    this.error = true;
                }
            })
        },
        setData(data) {
            this.form.firstName = data.firstName
            this.form.lastName = data.lastName
            this.form.email = data.email
            this.form.password = data.password,
            this.form.photo = data.photo,
            this.form.role = data.role
            this.form.additional = data.additional
        }
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}

.alert-margin {
    margin-top: 20vh;
}

</style>