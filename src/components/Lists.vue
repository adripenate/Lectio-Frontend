<template>
    <div>
        <b-container class = "mt-4">
            <b-row>
                <b-col md="4">
                    <b-list-group>
                        <b-list-group-item >
                            <b-list-group-item v-for="list in lists" :key="list" @click="getBooks(list.list_name)">{{list.list_name}}</b-list-group-item>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>

                <b-col md="8">
                    <div> 
                        <b-table :items="items.books" :fields="fields" striped responsive="sm" @row-clicked="myRowClickHandler" v-if="!no_books">
                            <template v-slot:cell(options)="row">
                                <b-img class="book-cover-list" :src="'http://covers.openlibrary.org/b/isbn/'+ row.item.isbn + '-S.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>
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
        items: {},
        fields: ['options', 'title', 'author'],
        images: {
            sample: require('../assets/missingbook.png')
        },
        no_books: false
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
            var apiService = new APIListService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            apiService.getBookOfList(idUser, name).then((response) => {
                if (response.status == 200) {
                    this.no_books = false;
                    this.items.books = response.data.books;
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