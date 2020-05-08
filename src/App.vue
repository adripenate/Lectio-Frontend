<template>
  <div id="app">
    <b-container class="prueba" fluid>
  <b-row>
      <b-col>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Lectio</b-navbar-brand>
 
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
 
    <b-collapse id="nav-collapse" is-nav>
      <div v-if="authenticated" class="navOptions">
        <div v-if="this.role =='Administrator'" class="navOptions">
          <b-navbar-nav>
            <b-nav-item href="/createUser">Crear Usuario</b-nav-item>
          </b-navbar-nav>
          
          <b-navbar-nav>
            <b-nav-item href="/userList">User List</b-nav-item>
          </b-navbar-nav> 
        </div>
        
        <div v-if="this.role != 'Administrator'" class="navOptions">
          
          <div v-if="this.role =='Librarian'" class="navOptions">
            <b-navbar-nav>
              <b-nav-item href="/addNewBook">Add book</b-nav-item>
            </b-navbar-nav>
          </div>

          <b-navbar-nav>
            <b-nav-item href="/books">Catalogue</b-nav-item>
          </b-navbar-nav>

          <div v-if="this.role =='Student'">
            <b-navbar-nav>
              <b-nav-item href="/lists">My lists</b-nav-item>
            </b-navbar-nav>
          </div>
          
        </div>
      </div>
      <b-navbar-nav class="ml-auto">
        
 
        <b-nav-item-dropdown right>
          <template v-slot:button-content>
            <em>{{ authenticated }}</em>
          </template>
          <b-dropdown-item href="#" v-on:click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
      </b-col>
  </b-row>
  </b-container>
    <router-view @authenticated="isLogged" @login="setAuthenticated"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
      return {
          authenticated: false,
          role: ""
      }
  },
  mounted() {
      if (localStorage.getItem("userInfo") != null) {
          this.authenticated = true;
          this.role = JSON.parse(localStorage.getItem("userInfo")).role;
      } else {
        this.authenticated = false;
      }
  },
  methods: {
      setAuthenticated(status) {
          this.authenticated = status;
          this.goToHome();
      },
      logout() {
          this.authenticated = false;
          localStorage.removeItem("userInfo");
          this.$router.replace({ name: "login" });
      },
      isLogged() {
        if (localStorage.getItem("userInfo") == null && !this.authenticated) {
          this.$router.replace({ name: "login" });
        } 
      },
      goToHome(){
          var role = JSON.parse(localStorage.getItem("userInfo")).role;
          alert(role)
          if(role == "Student"){
            this.$router.replace({ name: "catalogue" });
          }else if(role == "Administrator"){
            this.$router.replace({ name: "userList" });
          }else{
            this.$router.replace({ name: "addBook" });
          }
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navOptions {
  display: inherit;
}
</style>