<template>
<div class="hello">
    <b-container class="bv-row">
        <h1 class="title">Add a new book</h1>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" header='Add a new book'>
        <b-row>
            <b-col md="2" offset="2"><label for="name-field">Name:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="name-field"
                    v-model="form.title"
                    required
                    placeholder="Enter book name"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col md="2" offset="2"><label for="author-field">Author:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="author-field"
                    v-model="form.author"
                    required
                    placeholder="Enter author name"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="publisher-field">Publisher:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="publisher-field"
                    v-model="form.publisher"
                    required
                    placeholder="Enter publisher name"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="pages-field">Number of pages:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="pages-field"
                    v-model="form.pages"
                    min=1
                    type="number"
                    required
                    placeholder="Enter number of pages"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="isbn-field">ISBN:</label></b-col>
            <b-col md="6">
                <b-form-input
                    id="isbn-field"
                    v-model="form.isbn"
                    type="number"
                    min=0
                    required
                    placeholder="Enter ISBN"
                ></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mt-2"> 
            <b-col md="2" offset="2"><label for="genre-field">Genres:</label></b-col>
            <b-col md="6">
                <b-form-select
                    id="genre-field"
                    v-model="form.genres"
                    :options="genres_options"
                    required
                    multiple
                    size=3
                ></b-form-select>
            </b-col>
        </b-row>

        <b-row class="mt-2">
            <b-col md="2" offset="2"><label for="synopsis-field">Synopsis:</label></b-col>
            <b-col md="6">
                <b-form-textarea
                    id="synopsis-field"
                    v-model="form.synopsis"
                    placeholder="Enter book synopsis..."
                    rows="3"
                    required
                    max-rows="6"
                ></b-form-textarea>
            </b-col>
        </b-row>

        <b-row class="mt-4 justify-content-md-center" >
            <b-col md="4"><b-button type="submit" variant="primary">Submit</b-button><b-button type="reset" variant="danger">Reset</b-button></b-col>
        </b-row>

        <b-alert class="m-5" variant="success" show v-if="successNewBook">New book successful created!</b-alert>
        <b-alert class="m-5" variant="danger" show v-if="error">Book information incorrect or the book may already exists!</b-alert>
    </b-form>
    {{datos}}
</b-container>
</div>
</template>

<script>
  import {APIBookService} from '../APIBookService';
  export default {
    data() {
      return {
        form: {
          title: "",
          author: "",
          publisher: "",
          pages: "",
          isbn: "",
          genres: null,
          synopsis: ""
        },
        datos: "",
        successNewBook : false,
        error : false,
        genres_options: ['Action', "Fantasy", "Young adult", "Adventure", 
                "Fiction", "Paranormal", "Chick-lit", "Short story", "Poetry", "Science fiction", "Romance", "Comedy", 
                "Thriller", "Mystery", "Horror", "Non fiction", "Historical fiction"],
        show: true
      }
    },

    mounted(){
        this.$emit("authenticated", true);
        this.$emit("role", "Librarian");
    },

    methods: {
      onSubmit(e) {
        e.preventDefault();
        const apiService = new APIBookService();
        var data = apiService.createBook(JSON.stringify(this.form));
        //this.datos = JSON.stringify(this.form);
        data.then(result => {
            if (result.status == 201) {
                this.successNewBook = true;
                this.onReset();
                this.error = false;
            } else {
                this.successNewBook = false;
                this.error = true;
            }}).catch(error => {console.log(error),this.error = true; this.successNewBook = false;})
      },


      onReset() {
        // Reset our form values
        this.form.title = "",
        this.form.author = "",
        this.form.publisher = "",
        this.form.pages = "",
        this.form.isbn = "",
        this.form.genres = null,
        this.form.synopsis = ""
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