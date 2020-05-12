<template>
    <div>
        <b-container>
            <h1 class="title">My lists</h1>
            <b-row>
                <b-col md="4">
                    <ul class="list-unstyled">
                        <b-media tag="li" v-for="list in this.lists" :key="list">
                                
                            <template v-slot:aside>
                                <b-icon v-if="list.name == 'Readed'" icon="book" class="booklist-icons"></b-icon>
                                <b-icon v-if="list.name == 'Marked for later'" icon="bookmarks" class="booklist-icons"></b-icon>
                                <b-icon v-if="list.name != 'Marked for later' && list.name != 'Readed'" icon="bookmark-fill" class="booklist-icons"></b-icon>
                            </template>

                            <h4 class="mt-0 mb-1">{{list.name}}</h4>
                        </b-media>
                    </ul>
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
  //import {APIService} from '../APIService';
  
  export default {
    data() {
      return {
        lists: [{"id": "1",
                "name": "Marked for later",
                "description": "Books marked for later",
                "numberBooks": "5"},
                {"id": "2",
                "name": "Readed",
                "description": "My readed books",
                "numberBooks": "8"}],
        items: {"numBooks" : 20, "page" : 1, "size" : 5, "books" : [{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"id" : 5, "title":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"}]},
        fields: ['options', 'title', 'author'],
      }
    },
    mounted() {
      this.$emit("authenticated", true);
    },
    methods: {
        myRowClickHandler(record) {
            this.goToBook(record.id);
        },
        goToBook(id) {  
            this.$router.push({ name: 'book', params: { id: id } })
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
</style>