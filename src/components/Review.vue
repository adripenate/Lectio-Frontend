<template>
    <b-container>
        <b-row v-for="(review, idx) in items.reviews" :key="idx">
            <b-col>
                <b-card>
                    <b-media>
                        <template v-slot:aside>
                            <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
                        </template>
                        <b-container>
                            <b-row>
                                <b-col md="3">
                                    <h5 class="mt-0">{{ review.user_name }}</h5>
                        
                                    <p class="small">
                                        {{ review.created_at}}
                                    </p>
                                </b-col>
                                <b-col>
                                    <b-form-rating id="rating-disabled" variant="warning" :value="review.punctuation" disabled inline  class="mb-2 rate"></b-form-rating>
                                </b-col>
                                <b-col md="1" class="mt-2">
                                     {{review.punctuation}}/5
                                </b-col>
                            </b-row>
                        </b-container>
                        
                        <p>
                            {{review.comment}}
                        </p>
                    </b-media>
                </b-card>
            </b-col>
            
        </b-row>

        <b-row v-if="this.items == null || this.items.reviews == null || this.items.reviews.length == 0">
            <b-col md="12">
                <b-alert show variant="warning" class="center">There are no reviews for this book yet</b-alert>
            </b-col>
        </b-row>

        <b-row class="mt-12 justify-content-md-center" v-if="this.items != null && this.items.size >  0 && (this.items.reviews.length != 0 && this.items.numReviews > 8)">
                <b-col md="2">
                    <b-pagination class="book-pagination"
                        v-model="currentPage"
                        :total-rows="items.numReviews"
                        :per-page="items.size"
                        aria-controls="my-table"
                        size="md"
                        @input="test"
                        ></b-pagination>
                </b-col>
            </b-row>
    </b-container>
</template>

<script>
  import {APIBookService} from '../APIBookService';
  
  export default {
    data() {
        return {
            limit : 8,
            noReviews : false,
            imageError : false,
            currentPage: 1,
            items: {},
            datos : ""
        }
    },

    mounted() {
      this.$emit("authenticated", true);
      this.getReviews(this.$route.params.id,this.limit,this.currentPage);
    },

    methods: {
        getReviews(id,limit,offset) {
            const apiService = new APIBookService();
            var data = apiService.getReviewsOfBook(limit, offset-1, id);
            data.then(result => {
                if (result.status == 200) {
                    this.datos = JSON.stringify(result.data);
                    this.items = result.data;
                    this.noReviews = false;
                } else {
                    this.items = "";
                    this.noReviews = true;
                }}).catch(error => {console.log(error),this.noReviews = true;})
        },
        goToPage() {
            this.getReviews(this.$route.params.id,this.limit,this.currentPage);
        }     
    }
  }
</script>

<style>
.rate {
    color:#CFAE06;
}

.small {
    size: 10px;
}
</style>