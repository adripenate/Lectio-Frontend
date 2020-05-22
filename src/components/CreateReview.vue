<template>
<div class="hello">
    <b-container class="bv-row">
        <div v-if="!commented">
          <h5 class="title center" >Add a review</h5>
          <b-row class="mt-2">
            <b-col md="10">
              <b-form-rating v-model="form.punctuation" variant="warning" class="mb-2"></b-form-rating>
            </b-col>
          </b-row>

          <b-form @submit="onSubmit" header='Add a review'>
            <b-row class="mt-2">
                <b-col md="10">
                    <b-form-textarea
                        id="comment-field"
                        v-model="form.comment"
                        placeholder="Enter comment..."
                        rows="3"
                        required
                        max-rows="6"
                    ></b-form-textarea>
                    
                </b-col>
                <b-col md="2" class="mt-4">
                  <b-button type="submit" variant="primary">Submit</b-button>
                </b-col>
            </b-row>
          </b-form>
        </div>
    <b-alert class="m-5" variant="success" show v-if="successNewReview">Your review has been published</b-alert>       
    <b-alert class="m-5" variant="danger" show v-if="error">{{message}}</b-alert>
</b-container>
</div>
</template>

<script>
  import {APIBookService} from '../APIBookService';
  import Vue from 'vue'

  export default {
    data() {
      return {
        form: {
          comment: "",
          punctuation: 1
        },
        successNewReview : false,
        error : false,
        commented : false,
        message: ""
      }
    },

    mounted(){
        this.$emit("authenticated", true);
        this.canUserComment();
    },

    methods: {
      onSubmit(e) {
        e.preventDefault();
        alert(JSON.stringify(this.form));
        var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
        var idBook = this.$route.params.id;

        Vue.set(this.form, "user_id", idUser);
        Vue.set(this.form, "book_id", idBook);

        const apiService = new APIBookService();
        var data = apiService.createReview(JSON.stringify(this.form));
        data.then(result => {
            if (result.status == 201) {
                this.successNewReview = true;
                this.error = false;
            } else {
                this.successNewList = false;
                this.error = true;
            }}).catch(error => {console.log(error), this.error = true; 
                                                    this.message = error.message; 
                                                    this.successNewReview = false;})
      },

      canUserComment() {
        const apiService = new APIBookService();

        var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
        var idBook = this.$route.params.id;
        
        var data = apiService.hasUserReview(idUser, idBook);
        data.then(result => {
            if (result.status == 200) {
                this.commented = true;
            } else {
                this.commented = false;
            }}).catch(error => {console.log(error); this.commented = false;})
      }
    }
  }
</script>

<style>
.title{
    padding: 5vh;
}
.center {
    text-align: center;
}
</style>