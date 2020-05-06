<template>
<div class="hello">
    <b-container>
        <h1 class="title">Books</h1>
            <b-row class="mt-10 justify-content-md-center"> 
                <b-col class="book-element" v-for="book in items.books" :key="book" md="3">
                    <b-row class="mt-4 justify-content-md-center" v-on:click="goToBook(book.id)"> 
                        <b-col class="book-element" md="8">
                            <b-img class="book-cover" :src="'http://covers.openlibrary.org/b/isbn/'+ book.isbn + '-L.jpg'" fluid alt="Responsive image"></b-img>
                            <div class="book-info">
                                <strong>{{ book.bookName }}</strong><br>
                                <strong>{{ book.author }}</strong><br>
                                <strong>{{ book.genre }}</strong><br>
                            </div>
                        </b-col>
                    </b-row>
                    
                </b-col>
            </b-row>
            <b-row class="mt-12 justify-content-md-center">
                <b-col md="2">
                    <b-pagination class="book-pagination"
                        v-model="currentPage"
                        :total-rows="items.numBooks"
                        :per-page="items.size"
                        aria-controls="my-table"
                        size="md"
                        ></b-pagination>
                </b-col>
            </b-row>
    </b-container>
</div>
</template>

<script>
  //import {APIService} from '../APIService';
  export default {
    data() {
        return {
            currentPage: 1,
            items: {"numBooks" : 20, "page" : 1, "size" : 5, "books" : [{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"}]},
        }
    },

    mounted() {
      this.$emit("authenticated", true);
    },

    methods: {
        goToBook(id) {  
            this.$router.push({ name: 'book', params: { id: id } })
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