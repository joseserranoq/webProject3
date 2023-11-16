<template>
  <div id="nav" v-if="$store.state.user">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Crear Formulario</router-link> |
    <router-link to="/MyForms">Mis Formularios</router-link>
    <!-- <button @click="$store.dispatch('logout')">Logout</button> -->
    <button class="logout" @click="logout">Logout</button>

  </div>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    
    const logout = ()=> {
      localStorage.removeItem('emailVar')
      store.dispatch('logout')
    }

    return {
      logout
    }

  }


}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.logout {
  background-color: rgb(121, 38, 53);
  color: #fff;
  font-weight: 700;
  padding: 0.1rem 0.3rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 5px;
}
.logout:hover{
  background-color: rgb(39, 11, 16);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(41, 27, 144);
}
</style>