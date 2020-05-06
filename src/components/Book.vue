<template>
<div class="hello">
    <b-container>
        <h1 class="title">{{ book.bookName }}</h1>
            <b-row class="mt-10 justify-content-md-center"> 
                <b-col class="book-cover"  md="6">
                    <b-img class="book-cover-image" :src="'http://covers.openlibrary.org/b/isbn/'+ book.isbn + '-L.jpg'" fluid alt="Responsive image"></b-img>
                                
                </b-col>

                <b-col class="book-information" md="6">
                    <div >
                        <p><strong>Title: </strong><br>{{ book.bookName }}</p>
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
  //import {APIService} from '../APIService';
  export default {
    data() {
      return {
        book: {"id" : 5, "bookName":"REINA ROJA","author":"JUAN GOMEZ-JURADO","publisher":"S.A. EDICIONES B","pages":"1233","isbn":"9788448005009","genres": ["Science fiction", "Fantasy"],"synopsis":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id nibh luctus, gravida purus sed, sagittis massa. Vestibulum ut nisi pharetra, feugiat ex lacinia, molestie magna. Nunc varius ex eget ligula fringilla pellentesque. In lorem lacus, ultricies eget purus ut, dapibus sagittis diam. Nulla ornare dolor eget urna consectetur venenatis. Curabitur efficitur in est a tempor. Phasellus velit dolor, sodales vitae massa quis, varius blandit nulla. Integer eu placerat massa. Donec blandit fringilla eros, at facilisis nunc. Nunc convallis massa nisi, vel porttitor ante vulputate eu. Duis eu enim id risus feugiat consequat. Donec a mattis erat."}, 
        }
    },

    mounted() {
      this.$emit("authenticated", true);
    },

    methods: {

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