<template>
<div class="hello">
    <b-container>
        <h1 class="title">Registered users</h1>
        <div> 
             <b-table :items="items" :fields="fields" striped responsive="sm">
                <template v-slot:cell(options)="row">
                    <b-button pill size="sm" @click="row.toggleDetails" class="mr-2">
                    <b-icon icon="pencil-square"></b-icon> Edit
                    </b-button>
                    <b-button variant="danger" pill size="sm" @click="row.toggleDetails" class="mr-2">
                    <b-icon icon="trash"></b-icon> Remove
                    </b-button>
                </template>
            </b-table>
        </div>
    </b-container>
</div>
</template>

<script>
  import {APIService} from '../APIService';
  export default {
    data() {
      return {
        items: this.getUserList(),
        fields: ['id', 'firstName', 'lastName', 'email', 'rol', 'additional', 'options']
        
      }
    },

    computed:{
    },

    methods: {
        getUserList(){
            const apiService = new APIService();
            return apiService.getUsers();
        }
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
</style>