<template>
    <div>
        <b-container class = "mt-4">
            <b-row>
                <b-col md="4">
                    <b-list-group>
                        <b-list-group-item >
                            <b-list-group-item v-for="(list, idx) in lists" :key="idx" @click="listId = list.list_id;getBooks(list.list_name)" class="my-list">{{list.list_name}}</b-list-group-item>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>

                <b-col md="8">
                    <h5 class="title-list">{{list_name}}</h5>
                    <div> 
                        <b-table :items="items" :fields="fields" striped responsive="sm" @row-clicked="myRowClickHandler" v-if="!no_books" class="book-list">
                            <template v-slot:cell(options)="row">
                                <b-img class="book-cover-list" :src="'http://covers.openlibrary.org/b/isbn/'+ row.item.isbn + '-S.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>
                            </template>
                            <template v-slot:cell(progress)="row">
                                <b-button v-if="list_name != 'Finished'" variant="primary" pill size="sm" @click="showModal(row.item, $event.target)" class="mr-2" ref="btnShow" > 
                                    Save progress
                                </b-button> 
                                <b-button variant="primary" pill size="sm" @click="showModal(row.item, $event.target)" class="mr-2" ref="btnShow" disabled v-else>
                                    Save progress
                                </b-button>            
                            </template>
                            <template v-slot:cell(delete)="row">
                                <b-button variant="danger" pill size="sm" @click="deleteBook(row.item.id)" class="mr-2" ref="btnShow">
                                    <b-icon icon="trash"></b-icon> Delete book
                                </b-button>                            
                            </template>
                        </b-table>
                        <b-alert class="m-5" variant="danger" show v-if="no_books">There are no books yet</b-alert>
                        <b-alert class="m-5" variant="danger" show v-if="pages">Incorrect number of pages</b-alert>
                        <b-alert class="m-5" variant="success" show v-if="pagesOK">Progress saved</b-alert>
                    </div>   
                </b-col>
            </b-row>
        </b-container>
        <b-modal :id="infoModal.id" :title="infoModal.title" button-size="sm" size="sm" hide-footer>
          <b-form inline class="form-page" @submit="setNumberPages">
            <div class="page-container">
                <b-input
                id="inline-form-input-name"
                v-model="form.progress"
                type="number"
                min=0
                :max="max"
                class="input-page"
                placeholder=""
                ></b-input>

                <b-button type="submit" variant="primary">Save</b-button>
            </div>
        </b-form>         
        </b-modal>
    </div>
</template>

<script>
  import {APIListService} from '../APIListService';
  import Vue from 'vue'
  
  export default {
    data() {
      return {
        lists: [],
        listId : 0,
        bookID : 0,
        items: [],
        fields: ['options', 'title', 'author','progress','delete'],
        images: {
            sample: require('../assets/missingbook.png')
        },
        infoModal: {
          id: 'info-modal',
          title: 'Save progress'
        },
        form: {
          progress: 0
        },
        max : 0,
        no_books: false,
        list_name: "",
        pages : false,
        pagesOK : false
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
        showModal(row,button) {
            this.bookID = row.id;
            this.max = row.progress;
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
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
        setNumberPages() {
            
            var apiService = new APIListService();
            Vue.set(this.form, "list_id", this.listId);
            Vue.set(this.form, "book_id", this.bookID);
            apiService.progress(JSON.stringify(this.form)).then((response) => {
                if (response.status == 201) {
                    this.pages = false;
                    this.pagesOK = true;
                } else {
                    this.pages = true;
                    this.pagesOK = false;
                }}).catch(error => {console.log(error);this.pages = true});
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

.page-container {
    text-align: center;
}

.my-list {
    cursor: pointer;
}

.book-list td {
    cursor: pointer;
}
</style>