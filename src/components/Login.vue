<template>
<div class="hello">
    <b-container class="bv-row">
        <h1 class="title">Login</h1>
        <b-form @submit="onSubmit" @reset="onReset" header='Login'>

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
            <b-col md="2" offset="2"><label for="password-field">Password:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="password-field"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Enter password"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-4 justify-content-md-center" >
            <b-col md="4"><b-button type="submit" variant="primary">Login</b-button></b-col>
        </b-row>

        <b-alert class="m-5" variant="danger" show v-if="error">Incorrect email or password !</b-alert>
    </b-form>
</b-container>
</div>
</template>

<script>
  import {APIService} from '../APIService';
  export default {
    data() {
      return {
        email : "a@abc.com",
        pass : "123456",
        error : false,
        form: {
          email: "",
          password: "",
        }
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

    methods: {
      onSubmit(e) {
        e.preventDefault();
        var apiService = new APIService();
        var data = apiService.login(JSON.stringify(this.form));
        data.then((result) => {
            if (result.status == 200) {
                localStorage.setItem("token", result.headers.authorization);
                apiService = new APIService();
                apiService.getUser(this.form.email).then((response) => {
                    if (response.status == 200) {
                        localStorage.setItem("userInfo", JSON.stringify(response.data));
                        this.error = false;
                        this.$emit("login", true);
                    } else {
                        alert("error");
                        localStorage.removeItem("token");
                        this.error = true;
                    }}).catch(error => {alert(error);
                        localStorage.removeItem("token");});
            } else {
                this.error = true;
            }}).catch( error => {this.error = true;console.log(error)});

        
      },
      onReset() {
        this.form.email = ""
        this.form.password = '',
        this.$nextTick(() => {
          this.show = true
        })
      },
      getUserInfo(){
          return this.userData;
      }
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
</style>