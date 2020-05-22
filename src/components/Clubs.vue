<template>
<div class="hello">
    <b-container>
        <h1 class="title">Clubs</h1>
        <div> 
            <b-table :items="items.clubs" :fields="fields"
                    :per-page="2" :current-page="currentPage" 
                    striped responsive="sm" @row-clicked="myRowClickHandler" v-if="!noClubs">
                
            </b-table>
            <b-alert class="m-5" variant="danger" show v-if="noClubs">There are no books yet</b-alert>
        </div>
        <b-row class="mt-12 justify-content-md-center" v-if="this.items.clubs.length != 0">
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
</div>
</template>

<script>
  //import {APIClubService} from '../APIClubService';
  export default {
    data() {
        return {
            limit : 2,
            noClubs : false,
            imageError : false,
            currentPage: 1,
            items : {"numClubs": 0,"page": 0,"size": 0,
                "clubs": [{
                        "id": 1,
                        "name": "Un club",
                        "description" : "akjdhfasdkf",
                        "numSubscriptors": 4,
                    },{
                        "id": 2,
                        "name": "Otro club",
                        "description" : "kahdfaldsjfoaiwejfkjawljfdc",
                        "numSubscriptors": 0,
                    },{
                        "id": 3,
                        "name": "socorro",
                        "description" : "ayuda",
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
                    key: 'numSubscriptors',
                    label: 'Subscriptors',
                    sortable: true,
                    variant: 'danger'
                }],
            datos : ""
        }
    },

    mounted() {
      this.$emit("authenticated", true);
      this.getBooks(this.limit,this.currentPage);
    },

    methods: {
        /*goToBook(id) {  
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