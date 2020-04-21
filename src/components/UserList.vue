<template>
<div class="hello">
    <b-container>
        <h1 class="title">Registered users</h1>
        <div> 
             <b-table :items="items" :fields="fields" striped responsive="sm" v-if="showTable">
                <template v-slot:cell(options)="row">
                    <b-button pill size="sm" @click="row.toggleDetails" class="mr-2">
                    <b-icon icon="pencil-square"></b-icon> Edit
                    </b-button>
                    <b-button variant="danger" pill size="sm" @click="row.toggleDetails" class="mr-2">
                    <b-icon icon="trash"></b-icon> Remove
                    </b-button>
                </template>
            </b-table>
            {{text}}
        </div>
    </b-container>
</div>
</template>

<script>
  import {APIService} from '../APIService';
  export default {
    data() {
      return {
        items: [],
        showTable : false,
        text: 'No registered users',
        fields: ['id', 'firstName', 'lastName', 'email', 'rol', 'additional', 'options']
      }
    },

    computed:{

    }, 
    mounted() {
      this.getUsers();
    },

    methods: {
        getUsers() {
          var apiService = new APIService();
          apiService.getUsers().then(result => {
            this.items = result;
            if (this.items.length != 0){
              this.showTable = true;
              this.text = '';
            }});
        }
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
</style>