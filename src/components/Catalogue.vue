<template>
<div class="hello">
    <b-container>
        <h1 class="title">Books</h1>
            <b-row>
                <b-col md="8">
                    <b-form-input class="mr-sm-2" placeholder="Search" 
                        v-on:keypress="keyPressed"
                        v-model="book_name_search">
                    </b-form-input>
                </b-col>
                <b-col md="4">
                    <b-button variant="success" pill size="sm" @click="filters = !filters" class="mr-2" ref="btnShow">
                        Advanced filters
                    </b-button>
                </b-col>
            </b-row>
            <b-row v-if="filters" class="mt-3">
                <b-col md="8">
                    <b-form-input class="mr-sm-2" placeholder="Author name" 
                        v-on:keypress="keyPressed"
                        v-model="book_author_search">
                    </b-form-input>
                    <b-form-input class="mr-sm-2 mt-1" placeholder="Publisher name" 
                        v-on:keypress="keyPressed"
                        v-model="book_publisher_search">
                    </b-form-input>
                    <b-form-select
                        id="genre-field"
                        v-model="book_genres_search"
                        :options="genres_options"
                        v-on:change="keyPressed"
                        size=3
                        class="mt-1"
                    ></b-form-select>
                </b-col>
            </b-row>
            <b-row class="mt-10 justify-content-md-center"> 
                <b-col class="book-element" v-for="book in items.books" :key="book" md="3">
                    <b-row class="mt-4 justify-content-md-center" v-on:click="goToBook(book.id)"> 
                        <b-col class="book-element" md="8">
                            <b-img class="book-cover" :src="'http://covers.openlibrary.org/b/isbn/'+ book.isbn + '-L.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>
                            <div class="book-info">
                                <strong>{{ book.title }}</strong><br>
                                <strong>{{ book.author }}</strong><br>
                                <strong>{{ book.genre }}</strong><br>
                            </div>
                        </b-col>
                    </b-row>
                    
                </b-col>
                
                <b-alert class="m-5" variant="danger" show v-if="noBooks">There are no books on the catalogue!</b-alert>
            </b-row>
            <b-row class="mt-12 justify-content-md-center" v-if="this.items.numBooks > this.limit">
                <b-col md="2">
                    <b-pagination class="book-pagination"
                        v-model="currentPage"
                        :total-rows="items.numBooks"
                        :per-page="items.size"
                        aria-controls="my-table"
                        size="md"
                        @input="test"
                        ></b-pagination>
                </b-col>
            </b-row>
    </b-container>
</div>
</template>

<script>
  import {APIBookService} from '../APIBookService';
  export default {
    data() {
        return {
            limit : 4,
            noBooks : false,
            imageError : false,
            currentPage: 1,
            filters: false,
            items : {},
            images: {
                sample: require('../assets/missingbook.png')
            },
            book_name_search : "",
            book_author_search: "",
            book_publisher_search: "",
            book_genres_search: "",
            genres_options: [{ value: "", text: 'All genres' },'Action', "Fantasy", "Young adult", "Adventure", 
                "Fiction", "Paranormal", "Chick-lit", "Short story", "Poetry", "Science fiction", "Romance", "Comedy", 
                "Thriller", "Mystery", "Horror", "Non fiction", "Historical fiction"],
            datos : ""
        }
    },

    mounted() {
      this.$emit("authenticated", true);
      this.getBooks(this.limit,this.currentPage);
    },

    methods: {
        goToBook(id) {  
            this.$router.push({ name: 'book', params: { id: id } })
        },
        getBooks(limit,offset) {
            const apiService = new APIBookService();
            var data = apiService.getBooks(limit,offset-1);
            data.then(result => {
                if (result.status == 200) {
                    this.datos = JSON.stringify(result.data);
                    this.items = result.data;
                    this.noBooks = false;
                } else {
                    this.items = "";
                    this.noBooks = true;
                }}).catch(error => {console.log(error),this.noBooks = true;})
        },
        keyPressed() {
            this.searchBooks(this.limit,this.currentPage);
        },
        searchBooks(limit,offset){
            const apiService = new APIBookService();
            if(this.book_name_search == "" && this.book_author_search == ""
                && this.book_publisher_search == "" && this.book_genres_search == ""){
                this.getBooks(this.limit,this.currentPage);
            }else{
                var data = apiService.searchBook(limit,offset-1,this.book_name_search, this.book_author_search,
                                            this.book_publisher_search, this.book_genres_search);
                data.then(result => {
                if (result.status == 200) {
                    this.datos = JSON.stringify(result.data);
                    this.items.books = result.data;
                    this.noBooks = false;
                } else {
                    this.items = "";
                    this.noBooks = true;
                }}).catch(error => {console.log(error), this.noBooks = true;})
            }
        },
        imageUrlAlt(event) {
            event.target.src = this.images.sample;
        },
        test() {
            if(this.book_name_search == "" && this.book_author_search == ""
                && this.book_publisher_search == "" && this.book_genres_search == ""){
                this.getBooks(this.limit,this.currentPage);
            }else {
                this.searchBooks(this.limit,this.currentPage)
            }
        }     
    }
  }
</script>

<style>
.book-pagination {
    margin-top: 50px;
    color:  black
}

.title{
    padding: 5vh;
}
.book-element{
    margin-top: 3vh;
    padding: 0%;
    cursor: pointer;
}
.book-element .book-cover {
    -webkit-transition: opacity 0.5s ease-in-out;
    -moz-transition: opacity 0.5s ease-in-out;
    -o-transition: opacity 0.5s ease-in-out;
    transition: opacity 0.5s ease-in-out;
}
.book-element:hover .book-cover {
    opacity: 20%;
}
.book-info{
    display: none;
    width: 100%;
    left: 0;
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
    word-break: break-all;
    font-size: 25px;

}
.book-element:hover .book-info {
    display: block;
    opacity: 100% !important;
}
</style>