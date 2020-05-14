<template>
<div class="hello">
    <b-container class="bv-row">
        <h1 class="title">Add a new list</h1>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" header='Add a new book'>
        <b-row>
            <b-col md="2" offset="2"><label for="name-field">Name:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="name-field"
                    v-model="form.list_name"
                    required
                    placeholder="Enter list name"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col md="2" offset="2"><label for="description-field">Description:</label></b-col>
            <b-col md="6">
                <b-form-textarea
                    id="description-field"
                    v-model="form.list_description"
                    placeholder="Enter list description..."
                    rows="3"
                    required
                    max-rows="6"
                ></b-form-textarea>
            </b-col>
        </b-row>

        <b-row class="mt-4 justify-content-md-center" >
            <b-col md="4"><b-button type="submit" variant="primary">Submit</b-button><b-button type="reset" variant="danger">Reset</b-button></b-col>
        </b-row>

        <b-alert class="m-5" variant="success" show v-if="successNewList">New list successful created!</b-alert>
        <b-alert class="m-5" variant="danger" show v-if="error">List information incorrect or the list may already exists!</b-alert>
    </b-form>
    {{datos}}
</b-container>
</div>
</template>

<script>
  import {APIListService} from '../APIListService';
  import Vue from 'vue'

  export default {
    data() {
      return {
        form: {
          list_name: "",
          list_description: ""
        },
        datos: "",
        successNewList : false,
        error : false,
        show: true
      }
    },

    mounted(){
        this.$emit("authenticated", true);
    },

    methods: {
      onSubmit(e) {
        e.preventDefault();
        var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
        const apiService = new APIListService();
        Vue.set(this.form, "user_id", idUser);
        var data = apiService.createList(JSON.stringify(this.form), idUser);
        data.then(result => {
            if (result.status == 201) {
                this.successNewList = true;
                this.onReset();
                this.error = false;
            } else {
                this.successNewList = false;
                this.error = true;
            }}).catch(error => {console.log(error),this.error = true; this.successNewList = false;})
      },

      onReset() {
        // Reset our form values
        this.form.list_name = "",
        this.form.list_description = "",
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