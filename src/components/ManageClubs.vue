<template>
<div class="hello">
    <b-container>
        <h1 class="title">Clubs</h1>
        <div> 
            <b-table id="my-table"
                    :items="items"
                    :per-page="perPage"
                    :current-page="currentPage"
                    small 
                    show-empty
                    :fields="fields"
                    striped responsive="sm" v-if="!noClubs">

                <template v-slot:cell(book_id)="row">
                    <b-button v-if="row.item.book_id != null" variant="success" pill size="sm" @click="getBookAndShowModal(row.item, row.index, $event.target)" class="mr-2" ref="btnShow">
                        <b-icon icon="book"></b-icon> See book
                    </b-button>
                    <b-alert class="m-1 warning-bookClub" variant="warning" show v-else>No book yet</b-alert>
                </template>

                <template v-slot:cell(set_book)="row">
                    <b-button variant="success" pill size="sm" @click="clubID = row.item.id;getBooksAndShowModal($event.target)" class="mr-2" ref="btnShow">
                        <b-icon icon="book"></b-icon> Set book
                    </b-button>
                </template>

                <template v-slot:cell(delete_club)="row">
                    <b-button variant="success" pill size="sm" @click="showModalDelete(row.item.id, $event.target)" class="mr-2" ref="btnShow">
                        <b-icon icon="trash"></b-icon> Delete club
                    </b-button>
                </template>
            </b-table>
            <b-alert class="m-5" variant="success" show v-if="bookSetted">Book setted</b-alert>
        </div>
        <b-row class="mt-12 justify-content-md-center" v-if="this.items.length != 0  && this.items.length > perPage">
                <b-col md="2">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="this.items.length"
                        :per-page="perPage"
                        aria-controls="my-table">
                    </b-pagination>
                </b-col>
            </b-row>
    </b-container>
    <b-modal :id="setBookModal.id" :title="setBookModal.title" button-size="md" size="lg"  @ok="setBook">
        <b-container>
            <b-row class="mt-12 justify-content-md-center">
                <b-form-select v-model="selectedTime" :options="optionsSelect"></b-form-select>
            </b-row>
            <b-row class="mt-2 justify-content-md-center">
                <b-col>
                    <b-form-group
                        label="Filter"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="filterInput"
                        class="mb-0"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                v-model="filter"
                                type="search"
                                id="filterInput"
                                placeholder="Type to Search"
                            >
                            </b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row class="mt-2 justify-content-md-center">
                <b-col>
                    <b-table
                        show-empty
                        small
                        stacked="md"
                        selectable
                        :select-mode="selectMode"
                        :items="books"
                        :fields="bookFields"
                        :current-page="booksCurrentPage"
                        :per-page="booksPerPage"
                        :filter="filter"
                        @row-clicked="selectBook"
                    >
                    </b-table>
                </b-col>
            </b-row>
            <b-row class="mt-12 justify-content-md-center">
                <b-col>
                    <b-pagination
                        v-model="booksCurrentPage"
                        :total-rows="books.length"
                        :per-page="booksPerPage"
                        align="fill"
                        size="sm"
                        class="my-0"
                        ></b-pagination>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-alert class="m-5" variant="danger" show v-if="noSelectedBook">You have to select a book</b-alert>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>

    <b-modal :id="infoModal.id" :title="infoModal.title" button-size="md" size="lg">
        <b-container>
            <b-row class="mt-12 justify-content-md-center">
                <b-col>
                    <h4>Title</h4>
                    <p>
                        {{book.title}}
                    </p>
                    <h4>Sinopsis</h4>
                    <p>
                        {{book.synopsis | truncate(10, '...')}}
                    </p>
                    <a :href="'/book/'+ bookId">Read more...</a>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>

    <b-modal :id="deleteModal.id" :title="deleteModal.title" button-size="sm" size="sm">
          <p class="my-2">Do you want to delete this club?</p>

          <template v-slot:modal-footer="{ ok, cancel }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="deleteClub()">
              Confirm
            </b-button>
            <b-button size="sm" @click="cancel()">
              Cancel
            </b-button>
          </template>
    </b-modal>

    <b-modal id="modal-multi-2" title="Delete club" ok-only>
        <p class="my-2">{{ msg }}</p>
    </b-modal>
</div>
</template>

<script>
  import {APIClubService} from '../APIClubService';
  import {APIBookService} from '../APIBookService';
  
  export default {
    data() {
        return {
            perPage: 6,
            currentPage: 1,
            booksPerPage: 6,
            booksCurrentPage: 1,
            selectMode : 'single',
            filter : '',
            noSelectedBook : false,
            infoModal: {
                id: 'info-modal',
                title: 'Weekly book'
            },
            setBookModal: {
                id: 'set-modal',
                title: 'Set book'
            },
            deleteModal: {
                id: 'delete-modal',
                title: 'Delete club'
            },
            error : false,
            books : [],
            book : {"synopsis" : ""},
            bookId : 0,
            clubID: -1,
            bookSetted : false,
            selectedBookId : 0,
            noClubs : false,
            imageError : false,
            images: {
                sample: require('../assets/missingbook.png')
            },
            items: [],
            fields: [{
                    key: 'club_name',
                    sortable: false
                },
                {
                    key: 'book_id',
                    label: 'Weekly book',
                    sortable: false
                },
                {
                    key: 'set_book',
                    label: 'Set a book',
                    sortable: false
                },
                {
                    key: 'delete_club',
                    label: 'Delete club',
                    sortable: false
                }],
            bookFields: [{
                    key: 'title',
                    sortable: true
                },
                {
                    key: 'author',
                    label: 'Author',
                    sortable: true
                },
                {
                    key: 'isbn',
                    label: 'ISBN',
                    sortable: false
                },
                {
                    key: 'pages',
                    label: 'Pages',
                    sortable: true
                }],
            selectedTime: "Weekly",
            optionsSelect: [
                { value: 'Weekly', text: 'Weekly' },
                { value: 'Monthly', text: 'Monthly' }
            ],
            msg: "",
            datos : ""
        }
    },

    filters: {
        truncate: function (text, length, suffix) {
            return text.substring(0, length) + suffix;
        },
    },
    mounted() {
      this.$emit("authenticated", true);
      this.getClubs();
    },

    methods: {
        getBookAndShowModal(item, index, button) {
          this.getBookData(item.book_id);
          this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },

        getBooksAndShowModal(button) {
            this.getBooks();
            this.selectedBookId = -1;
            this.$root.$emit('bv::show::modal', this.setBookModal.id, button)
        },

        showModalDelete(club_ID, button){
            this.clubID = club_ID;
            this.$root.$emit('bv::show::modal', this.deleteModal.id, button)
        },

        deleteClub(){
            var apiService = new APIClubService();
            apiService.deleteClub(this.clubID).then(result => {
                if (result.status == 200) {
                    this.getClubs();
                    this.msg = "Successful deleted ";
                } else {
                    this.msg = "An error has ocurred while trying to remove an club";
                }
                this.$root.$emit('bv::hide::modal', this.deleteModal.id, '#btnShow')
                this.$root.$emit('bv::show::modal', 'modal-multi-2', '#btnShow')
            });
        },

        getBookData(id){
            var apiBookService = new APIBookService();
            apiBookService.getBook(id).then(result => {
                if (result.status == 200) {
                    this.book = result.data;
                    this.bookId = id;
                } else {
                    alert("An error has ocurred");
                    console.log("Component Book - An error has ocurred");
                }
            })
        },
        getBooks() {
            const apiService = new APIBookService();
            var data = apiService.getBooks(9999,0);
            data.then(result => {
                if (result.status == 200) {
                    this.datos = JSON.stringify(result.data);
                    this.books = result.data.books;
                    this.noBooks = false;
                } else {
                    this.books = "";
                    this.noBooks = true;
                }}).catch(error => {
                    console.log(error),
                    this.noBooks = true;
                })
        },
        selectBook(row){
            if (this.selectedBookId == row.id) {
                this.selectedBookId = -1;
            } else {
                this.selectedBookId = row.id;
            }
        },
        setBook(bvModalEvt) {
            if (this.selectedBookId > 0) {
                this.noSelectedBook = false;
                var data = {"book_id" : this.selectedBookId, "club_id" : this.clubID, "date" : this.selectedTime};
                this.saveBook(data);
            } else {
                this.noSelectedBook = true;
                bvModalEvt.preventDefault()
            }
        },
        saveBook(data) {
            const apiService = new APIClubService();
            var api = apiService.setBook(data);
            api.then(result => {
                if (result.status == 201) {
                    this.bookSetted = true;
                    this.getClubs();
                } else {
                    this.bookSetted = false;
                }}).catch(error => {console.log(error), this.bookSetted = false;})
        },

        imageUrlAlt(event) {
            event.target.src = this.images.sample;
        },
        getClubs() {
            const apiService = new APIClubService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            var data = apiService.getCreatedClubs(idUser);
            data.then(result => {
                if (result.status == 200) {
                    this.items = result.data;
                    this.noClubs = false;
                } else {
                    this.items = [];
                    this.noClubs = true;
                }}).catch(error => {console.log(error), this.noClubs = true;})
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