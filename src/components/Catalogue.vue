<template>
<div class="hello">
    <b-container>
        <h1 class="title">Books</h1>
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
            <b-row class="mt-12 justify-content-md-center" v-if="this.items.length != 0">
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
            limit : 8,
            noBooks : false,
            imageError : false,
            currentPage: 1,
            items : {},
            images: {
                sample: require('../assets/missingbook.png')
            },
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
        imageUrlAlt(event) {
            event.target.src = this.images.sample;
        },
        test() {
            this.getBooks(this.limit,this.currentPage);
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