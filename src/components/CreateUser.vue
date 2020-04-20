<template>
<div class="hello">
    <b-container class="bv-row">
        <h1 class="title">Create a new user</h1>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" header='Create a new user'>
        <b-row>
            <b-col md="2" offset="2"><label for="name-field">Name:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="name-field"
                    v-model="form.name"
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
                    v-model="form.surname"
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
                    v-model="form.additionalData"
                    placeholder="Enter user additional data..."
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-col>
        </b-row>

        <b-row class="mt-2 justify-content-md-center" >
            <b-col md="4"><b-button type="submit" variant="primary">Submit</b-button><b-button type="reset" variant="danger">Reset</b-button></b-col>
        </b-row>
    
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
          name: '',
          surname: '',
          email: '',
          role: null,
          additionalData: ''
        },
        roles: [{ text: 'Select One', value: null }, 'Student', 'Librarian', 'Administrator'],
        show: true
      }
    },

    computed:{
        emailValidation() {
            var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(this.form.email);
        }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        const apiService = new APIService();
        apiService.createUser(JSON.stringify(this.form));
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.surname = ''
        this.form.email = ''
        this.form.role = null
        this.form.additionalData = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
</style>