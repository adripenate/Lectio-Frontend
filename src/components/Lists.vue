<template>
    <div>
        <b-container>
            <h1 class="title">My lists</h1>
            <b-row>
                <b-col md="4">
                    <b-list-group>
                        <b-list-group-item >
                            <b-list-group-item @click="getBooks('Pending')">Pending</b-list-group-item>
                            <b-list-group-item @click="getBooks('Esperando')">Esperando</b-list-group-item>
                        </b-list-group-item>
                    </b-list-group>

                    

                </b-col>
                <b-col md="8">
                    <div> 
                        <b-table :items="items.books" :fields="fields" striped responsive="sm" @row-clicked="myRowClickHandler">
                            <template v-slot:cell(options)="row">
                                <b-img class="book-cover-list" :src="'http://covers.openlibrary.org/b/isbn/'+ row.item.isbn + '-S.jpg?default=false' || image.sample" fluid alt="Responsive image" @error="imageUrlAlt"></b-img>
                            </template>
                        </b-table>
                        {{text}}
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
        items: {"numBooks" : 20, "page" : 1, "size" : 5, "books" : [{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"}]},
        fields: ['options', 'title', 'author'],
        images: {
            sample: require('../assets/missingbook.png')
        }
      }
    },
    mounted(){
      this.$emit("authenticated", true);
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
                    this.items.books = response.data.books;
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