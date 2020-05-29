<template>
    <div>
        <b-container class = "mt-4">
            <b-row>
                <b-col md="4">
                    <b-list-group>
                        <b-list-group-item >
                            <b-list-group-item v-for="list in lists" :key="list" @click="listId = list.list_id;getBooks(list.list_name)">{{list.list_name}}</b-list-group-item>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>

                <b-col md="8">
                    <h5 class="title-list">{{list_name}}</h5>
                    <div> 
                        <b-table :items="items" :fields="fields" striped responsive="sm" @row-clicked="myRowClickHandler" v-if="!no_books">
                            <template v-slot:cell(options)="row">
                                <b-img class="book-cover-list" :src="'http://covers.openlibrary.org/b/isbn/'+ row.item.isbn + '-S.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>
                            </template>
                            <template v-slot:cell(delete)="row">
                                <b-button variant="danger" pill size="sm" @click="deleteBook(row.item.id)" class="mr-2" ref="btnShow">
                                    <b-icon icon="trash"></b-icon> Delete book
                                </b-button>                            
                            </template>
                        </b-table>
                        <b-alert class="m-5" variant="danger" show v-if="no_books">There are no books yet</b-alert>
                    </div>   
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import {APIListService} from '../APIListService';
  
  export default {
    data() {
      return {
        lists: [],
        listId : 0,
        items: {},
        fields: ['options', 'title', 'author','delete'],
        images: {
            sample: require('../assets/missingbook.png')
        },
        no_books: false,
        list_name: ""
      }
    },
    mounted(){
      this.$emit("authenticated", true);
      this.getLists();
    },
    methods: {
        myRowClickHandler(record) {
            this.goToBook(record.id);
        },
        goToBook(id) {  
            this.$router.push({ name: 'book', params: { id: id } })
        },
        imageUrlAlt(event) {
            event.target.src = this.images.sample;
        },
        getBooks(name) {
            this.list_name = name;
            var apiService = new APIListService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            apiService.getBookOfList(idUser, name).then((response) => {
                if (response.status == 200) {
                    this.no_books = false;
                    this.items = response.data.books;
                } else {
                    this.no_books = true;
                }}).catch(error => {alert(error);});
        },
        getLists(){
            var apiService = new APIListService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            apiService.getList(idUser).then((response) => {
                if (response.status == 200) {
                    this.lists = response.data;
                    this.listId = this.lists[0].list_id;
                    this.getBooks(this.lists[0].list_name);
                } else {
                    alert("error");
                }}).catch(error => {alert(error);});
        },
        deleteBook(id) {
            var apiService = new APIListService();
            apiService.deleteBookFromList(this.listId, id).then((response) => {
                if (response.status == 200) {
                    this.getBooks(this.list_name);
                } }).catch(error => {alert(error);});
        },
    }
  }
</script>

<style>
.title-list{
    padding: 1vh;
}

.list-unstyled{
    text-align: left;
}

.list-unstyled li{
    padding: 3vh;
}

.book-cover-list {
    max-width: 36px;
}
</style>