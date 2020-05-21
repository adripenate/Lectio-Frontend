<template>
<div class="hello">
    <b-container class="bv-row">
        <h5 class="title center">Add a review</h5>
        <b-row class="mt-2">
          <b-col md="10">
            
            <b-form-rating v-model="form.rating" variant="warning" class="mb-2" v-if="notCommented"></b-form-rating>
          </b-col>
        </b-row>
        <b-form @submit="onSubmit" header='Add a review' v-if="notCommented">

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
        <b-alert class="m-5" variant="success" show v-if="successNewReview">ITS OK</b-alert>
        <b-alert class="m-5" variant="success" show v-if="alreadyReview">You already review this book</b-alert>
        <b-alert class="m-5" variant="success" show v-if="notInReaded">You have to read this book in order to review it</b-alert>
        <b-alert class="m-5" variant="danger" show v-if="error">Error</b-alert>
    </b-form>
</b-container>
</div>
</template>

<script>
  //import {APIBookService} from '../APIBookService';
  //import Vue from 'vue'

  export default {
    data() {
      return {
        form: {
          comment: "",
          rating : 1
        },
        successNewReview : false,
        error : false,
        notCommented : true
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
        /*var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
        var idBook = this.$route.params.id;
        Vue.set(this.form, "user_id", idUser);
        const apiService = new APIBookService();
        var data = apiService.review(JSON.stringify(this.form), idUser);
        data.then(result => {
            if (result.status == 201) {
                this.successNewReview = true;
                this.onReset();
                this.error = false;
            } else {
                this.successNewList = false;
                this.error = true;
            }}).catch(error => {console.log(error),this.error = true; this.successNewReview = false;})*/
      },
      canUserComment() {
        /*var idUser = JSON.parse(localStorage.getItem("userInfo")).user_id;
        var idBook = this.$route.params.id;
        const apiService = new APIBookService();
        var data = apiService.hasUserReview(idUser);
        data.then(result => {
            if (result.status == 201) {
                this.notCommented = true;
            } else {
                this.notCommented = false;
            }}).catch(error => {console.log(error)})*/
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