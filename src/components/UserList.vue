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
                    <b-button variant="danger" pill size="sm" @click="setUserAndShowModal(row.item, row.index, $event.target)" class="mr-2" ref="btnShow">
                    <b-icon icon="trash"></b-icon> Remove
                    </b-button>
                </template>
            </b-table>
            {{text}}
        </div>
        <b-modal :id="infoModal.id" :title="infoModal.title" button-size="sm" size="sm">
          <p class="my-2">Do you want to delete this user?</p>

          <template v-slot:modal-footer="{ ok, cancel }">
            <!-- Emulate built in modal footer ok and cancel button actions -->
            <b-button size="sm" variant="danger" @click="deleteUser()">
              Confirm
            </b-button>
            <b-button size="sm" @click="cancel()">
              Cancel
            </b-button>
          </template>
        </b-modal>

        <b-modal id="modal-multi-2" title="Second Modal" ok-only>
          <p class="my-2">{{ error }}</p>
        </b-modal>
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
        fields: ['id', 'firstName', 'lastName', 'email', 'rol', 'additional', 'options'],
        itemIndex : -1,
        infoModal: {
          id: 'info-modal',
          title: 'Delete user'
        },
        msg : ''
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
        },
        setUserAndShowModal(item, index, button) {
          this.itemIndex = index
          this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },

        deleteUser() {
          var apiService = new APIService();
          apiService.deleteUser(this.items[this.itemIndex].id).then(result => {
            if (result.status == 200) {
                this.itemIndex = -1;
                this.getUsers();
                this.msg = "Successful deleted ";
            } else {
                this.msg = "An error has ocurred when trying to remove an user";
            }
            
            this.$root.$emit('bv::hide::modal', this.infoModal.id, '#btnShow')
            this.$root.$emit('bv::show::modal', 'modal-multi-2', '#btnShow')
            
          });
        }

    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
</style>