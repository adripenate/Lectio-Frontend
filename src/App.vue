<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <CreateUser/>
    <hr>

    <div class="fondo">

      <button @click="getSomething()">Hola mundo</button>
      <button @click="getUsers()">Usuarios</button>
      <br>
      <span>{{ respuesta }}</span>
    </div>


  </div>
</template>

<script>

import {APIService} from './APIService';

const apiService = new APIService();


import HelloWorld from './components/HelloWorld.vue'
import CreateUser from './components/CreateUser.vue'

export default {
  name: 'App',
  data: function () {
  return {
    respuesta: "No hay nada"
  } 
},
  
  methods: {

    getSomething: function() {
      apiService.getSomething().then((data) => {
        this.respuesta = data
      })
    },
    getUsers: function() {
      apiService.getUsers().then((data) => {
        this.respuesta = data
      })
    },

  },
  mounted () {
    
  },
  components: {
    HelloWorld,
    CreateUser
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
  margin-top: 60px;
}

.fondo{
background-color: lightgrey;
  width: 300px;
  border: 15px solid green;
  padding: 50px;
  margin: 20px;

}
</style>
