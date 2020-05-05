<template>
<div class="hello">
    <b-container>
        <h1 class="title">Books</h1>
            <b-row class="mt-2 justify-content-md-center"> 
                <b-col class="book-element" v-for="index in 10" :key="index" md="2">
                    <b-img class="book-cover" src="http://covers.openlibrary.org/b/isbn/9788448005009-L.jpg" fluid alt="Responsive image"></b-img>
                    <div class="book-info">
                        Nombre - Autor
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
        items: [{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"},{"bookName":"Libro","author":"Autor","publisher":"Editorial","pages":"1233","isbn":"9788448005009","genre":"Science fiction","synopsis":"Sinopsis del libro"}],
        showTable : false,
        text: 'No registered users',
        fields: ['id', 'firstName', 'lastName', 'email', 'role', 'additional', 'options'],
        itemIndex : -1,
        infoModal: {
          id: 'info-modal',
          title: 'Delete user'
        },
        msg : ''
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
    margin: 5vh;
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
}
.book-element:hover .book-info {
    display: block;
    opacity: 100% !important;
}
</style>