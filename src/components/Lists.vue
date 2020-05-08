<template>
    <div>
        <b-container>
            <h1 class="title">My lists</h1>
            <b-row>
                <b-col>
                    <ul class="list-unstyled">
                        <b-media tag="li" v-for="list in this.lists" :key="list">
                                
                            <template v-slot:aside>
                                <b-icon v-if="list.name == 'Readed'" icon="book" class="booklist-icons"></b-icon>
                                <b-icon v-if="list.name == 'Marked for later'" icon="bookmarks" class="booklist-icons"></b-icon>
                                <b-icon v-if="list.name != 'Marked for later' && list.name != 'Readed'" icon="bookmark-fill" class="booklist-icons"></b-icon>
                            </template>

                            <h4 class="mt-0 mb-1">{{list.name}}</h4>
                            <p class="mb-0">{{list.description}}</p>
                        </b-media>

                    </ul>
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
                "numberBooks": "8"}]
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();
        //const apiService = new APIService();
        /*var data = apiService.login(JSON.stringify(this.form));
        data.then(result => {
            if (result.status == 200) {
                localStorage.setItem("token", result.headers.authorization);
                localStorage.setItem("userInfo", JSON.stringify(this.userData));
                this.error = false;
                this.$emit("login", true);
            } else {
                this.error = true;
            }}).catch(error => alert(error))
            this.onReset();*/
      },
      getUserInfo(){
          return this.userData;
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
.booklist-icon{
    width: 120px; 
    height: 120px;
}
</style>