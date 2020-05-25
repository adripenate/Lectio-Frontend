<template>
<div class="hello">
    <b-container>
        <h1 class="title">Clubs</h1>
        <div> 
            <b-table :items="items.clubs" :fields="fields"
                    :per-page="limit" :current-page="currentPage" 
                    striped responsive="sm" @row-clicked="myRowClickHandler" v-if="!noClubs">
                <template v-slot:cell(book_id)="row">
                    <b-button variant="success" pill size="sm" @click="getBookAndShowModal(row.item, row.index, $event.target)" class="mr-2" ref="btnShow">
                        <b-icon icon="book"></b-icon> See book
                    </b-button>
                </template>

                <template v-slot:cell(suscription)="row">

                    <b-button variant="primary" pill size="sm" @click="suscribe(row.item, row.index, $event.target)" class="mr-2" ref="btnShow" v-if="!isUserSuscribed(row.item.id)">Suscribe</b-button>
                    <b-button variant="danger" pill size="sm" @click="unsuscribe(row.item, row.index, $event.target)" class="mr-2" ref="btnShow" v-else>Unsuscribe</b-button>
               
                </template>
            </b-table>
            <b-alert class="m-5" variant="danger" show v-if="noClubs">There are no books yet</b-alert>
        </div>
        <b-row class="mt-12 justify-content-md-center" v-if="this.items.clubs.length != 0  && this.items.numClubs > 8">
                <b-col md="2">
                    <b-pagination class="club-pagination"
                        v-model="currentPage"
                        :total-rows="items.numClubs"
                        :per-page="items.size"
                        aria-controls="my-table"
                        size="md"
                        @input="test"
                        ></b-pagination>
                </b-col>
            </b-row>
    </b-container>
    <b-modal :id="infoModal.id" :title="infoModal.title" button-size="md" size="lg" ok-only>
        <b-container>
            <b-row class="mt-12 justify-content-md-center">
                <b-col md="4">
                    <b-img class="book-cover" :src="'http://covers.openlibrary.org/b/isbn/'+ book.isbn + '-L.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>         
                </b-col>
                <b-col>
                    <h4>Title</h4>
                    <p>
                        {{book.title}}
                    </p>
                    <h4>Sinopsis</h4>
                    <p>
                        {{book.synopsis | truncate(50, '...')}}
                    </p>
                    <a :href="'/book/'+bookId">Read more...</a>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>

    <b-modal :id="subModal.id" :title="subModal.title" button-size="sm" size="sm" ok-only>
        <b-alert class="m-2" variant="success" show v-if="successSuscribed">Suscribed</b-alert>
        <b-alert class="m-2" variant="success" show v-if="successUnsuscribed">Unsuscribed</b-alert>
        <b-alert class="m-2" variant="danger" show v-if="error">Error</b-alert>
    </b-modal>
</div>
</template>

<script>
  //import {APIClubService} from '../APIClubService';
  import {APIBookService} from '../APIBookService';
  export default {
    data() {
        return {
            infoModal: {
                id: 'info-modal',
                title: 'Weekly book'
            },
            subModal: {
                id: 'sub-modal',
                title: 'Message'
            },
            successSuscribed : false,
            successUnsuscribed : false,
            error : false,
            book : {"synopsis" : ""},
            boodId : 0,
            limit : 8,
            noClubs : false,
            imageError : false,
            currentPage: 1,
            images: {
                sample: require('../assets/missingbook.png')
            },
            items : {"numClubs": 0,"page": 0,"size": 0,
                "clubs": [{
                        "id": 1,
                        "name": "Un club",
                        "description" : "Descripción 1",
                        "book_id" : 8,
                        "numSubscriptors": 4,
                    },{
                        "id": 2,
                        "name": "Otro club",
                        "description" : "Descripción 2",
                        "book_id" : 8,
                        "numSubscriptors": 0,
                    },{
                        "id": 3,
                        "name": "socorro",
                        "description" : "ayuda",
                        "book_id" : 8,
                        "numSubscriptors": 245,
                    }]
            },
            fields: [{
                    key: 'name',
                    sortable: false
                },
                {
                    key: 'description',
                    sortable: false
                },
                {
                    key: 'book_id',
                    label: 'Weekly book',
                    sortable: false
                },
                {
                    key: 'numSubscriptors',
                    label: 'Subscriptors',
                    sortable: true
                },
                {
                    key: 'suscription',
                    label: 'Suscription',
                    sortable: false
                }],
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
      //this.getBook(this.limit,this.currentPage);
    },

    methods: {
        getBookAndShowModal(item, index, button) {
          this.getBookData(item.book_id);
          this.$root.$emit('bv::show::modal', this.infoModal.id, button)
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
        imageUrlAlt(event) {
            event.target.src = this.images.sample;
        },
        isUserSuscribed(clubId) {
            console.log(clubId)
            /*const apiService = new APIClubService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            var data = apiService.isSuscribed(idUser, clubId);
            data.then(result => {
                if (result.status == 200) {
                    return true;
                } else {
                    return false;
                }}).catch(error => {console.log(error)})*/
            return true;
        },
        suscribe(clubId, index, button) {
            console.log(clubId)
            alert("In");
            this.successSuscribed = true;
            this.successUnsuscribed = false;
            this.$root.$emit('bv::show::modal', this.subModal.id, button)
            /*const apiService = new APIClubService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            var data = apiService.suscribe(idUser, clubId);
            data.then(result => {
                if (result.status == 200) {
                    this.successSuscribed = true;
                    this.successUnsuscribed = false;
                } else {
                    this.error = true;
                }}).catch(error => {console.log(error);this.error = true})*/
        },
        unsuscribe(clubId, index, button) {
            console.log(clubId)
            alert("Out");
            this.successSuscribed = false;
            this.successUnsuscribed = true;
            this.$root.$emit('bv::show::modal', this.subModal.id, button)

            /*const apiService = new APIClubService();
            var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
            var data = apiService.unsuscribe(idUser, clubId);
            data.then(result => {
                if (result.status == 200) {
                    this.successSuscribed = false;
                    this.successUnsuscribed = true;
                } else {
                    this.error = true;
                }}).catch(error => {console.log(error);this.error = true})*/
            return true;
        }
        /*
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
        }*/     
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