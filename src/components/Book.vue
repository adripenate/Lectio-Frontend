<template>
<div class="hello">
    <b-container>
        <h1 class="title">{{ book.bookName }}</h1>
            <b-row class="mt-10 justify-content-md-center"> 
                <b-col class="book-cover"  md="6">
                    <b-img class="book-cover-info" :src="'http://covers.openlibrary.org/b/isbn/'+ book.isbn + '-L.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>
                </b-col>

                <b-col class="book-information" md="6">
                    <div >
                        <p><strong>Title: </strong><br>{{ book.title }}</p>
                        <p><strong>Author: </strong><br>{{ book.author }}</p>
                        <p><strong>Synopsis: </strong><br>{{ book.synopsis }}</p>
                        <b-badge class="genres" variant="success" v-for="genre in book.genres" :key="genre">{{ genre }}</b-badge>
                    </div>
                </b-col>
            </b-row>

            <b-row class="mt-4 book-details">
                <b-col md="12">
                    <div class="card border-light">
                        <div class="card-header"><h5>Details</h5></div>
                        <div class="card-body">
                            <p><strong><b-icon icon="house-door-fill" class="book-icons"></b-icon>Publisher: </strong>{{ book.publisher }}</p>
                            <p><strong><b-icon icon="tag-fill" class="book-icons"></b-icon>ISBN: </strong>{{ book.isbn }}</p>
                            <p><strong><b-icon icon="book" class="book-icons"></b-icon>Pages: </strong>{{ book.pages }}</p>
                        </div>
                    </div>
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
            book: {},
            images: {
                sample: require('../assets/missingbook.png')
            },
        }
    },

    mounted() {
      this.$emit("authenticated", true);
      this.getBookData(this.$route.params.id);
    },

    methods: {
        getBookData(id){
            var apiBookService = new APIBookService();
            apiBookService.getBook(id).then(result => {
                if (result.status == 200) {
                    this.book = result.data;
                } else {
                    alert("An error has ocurred");
                    console.log("Component Book - An error has ocurred");
                }
            })
        },
        imageUrlAlt(event) {
            event.target.src = this.images.sample;
        },
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
.book-element{
    margin-top: 3vh;
    padding: 0%;
}

.book-cover-info{
    height: 70vh;
}

.book-information {
    text-align: left;
    font-size: 18px;
}

.book-details {
    text-align: left;
    margin-bottom: 50px;
}

.genres, .book-icons {
    margin: 1vh;
}

</style>