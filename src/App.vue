<template>
  <div id="app">
    <b-container class="prueba" fluid>
  <b-row>
      <b-col>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#/">Lectio</b-navbar-brand>
 
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
 
    <b-collapse id="nav-collapse" is-nav>
      <div v-if="authenticated" class="navOptions">
        <b-navbar-nav>
          <b-nav-item href="#/createUser">Crear Usuario</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item href="#/addNewBook">Add book</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item href="#/books">Catalogue</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item href="#/">User List</b-nav-item>
        </b-navbar-nav> 

      </div>
      <b-navbar-nav class="ml-auto">
        
 
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
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
          authenticated: false
      }
  },
  mounted() {
      if (localStorage.getItem("hola") == null) {
          this.$router.replace({ name: "login" });
      } else {
        this.$router.replace({ name: "userList" });
        this.authenticated = true;
      }
  },
  methods: {
      setAuthenticated(status) {
          this.authenticated = status;
      },
      logout() {
          this.authenticated = false;
          localStorage.removeItem("hola");
          this.$router.replace({ name: "login" });
      },
      isLogged() {
        if (!this.authenticated) {
          this.$router.replace({ name: "login" });
        } 
      }
  },
  components: {

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