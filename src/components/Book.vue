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
                        <b-badge class="genres" v-for="genre in book.genres" :key="genre">{{ genre }}</b-badge>
                    </div>
                    
                </b-col>
            </b-row>

            <b-row class="mt-10 justify-content-md-center"> 
                <b-col class="book-cover" md="4">
                    <div class="mt-4">
                        <b-button class="list-button" v-b-modal.modal>Add book to list</b-button>
                        <b-alert class="m-5" variant="danger" show v-if="error">The book is already in the list</b-alert>
                        <b-alert class="m-5" variant="success" show v-if="successAdded">Successfully added </b-alert>
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
    <b-modal
      id="modal"
      ref="modal"
      title="Add book to list"
      @show="getLists"
      @ok="handleOk"
      hide-footer
    >
        <b-list-group>
            <b-list-group-item class="list-items" v-for="list in lists" :key="list" @click="addBookToList(list.list_id)">{{list.list_name}}</b-list-group-item>
        </b-list-group>
    </b-modal>
</div>
</template>

<script>
  import {APIBookService} from '../APIBookService';
  import {APIListService} from '../APIListService';

  export default {
    data() {
      return {
            book: {},
            images: {
                sample: require('../assets/missingbook.png')
            },
            error : false,
            successAdded : false,
            lists: {},
            request_data: {
                list_id: "",
                book_id: ""
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
        
        addBookToList(listID) {
            var apiBookService = new APIListService();
            this.request_data.book_id = this.$route.params.id;
            this.request_data.list_id = listID;
            apiBookService.addBookTo(JSON.stringify(this.request_data)).then(result => {
                if (result.status == 201) {
                    this.successAdded = true;
                    this.error = false;
                }
                this.$refs['modal'].hide()
            }).catch(error => {console.log(error), this.error = true; this.successAdded = false; this.$refs['modal'].hide();})
        },
        getLists(){
            var apiService = new APIListService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            apiService.getList(idUser).then((response) => {
                if (response.status == 200) {
                    this.lists = response.data;
                } else {
                    alert("error");
                }}).catch(error => {alert(error);});
        }
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
    max-height: 500px;
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

.list-button {
    margin: 1vh;
}

.list-items {
    background-color: #24AFDC;
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    opacity: 0.6;
    transition: 0.3s;
    cursor: pointer;
}

.list-items:hover {
    opacity: 1
}

</style>