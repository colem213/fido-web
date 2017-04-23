<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Fido Links</h2>
    <p v-if="user.authenticated">Welcome, {{ user.name }}!</p>
    <p v-else>Please log in!</p>
    <ul>
      <li v-if="!user.authenticated"><a :href="auth.createLoginUrl()">Login</a></li>
      <li v-if="!user.authenticated"><a :href="auth.createRegisterUrl()">Register</a></li>
      <li v-if="user.authenticated"><a :href="auth.createAccountUrl()">Account</a></li>
      <li v-if="user.authenticated"><a :href="auth.createLogoutUrl()">Logout</a></li>
    </ul>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'hello',
  computed: {
    auth () {
      return this.$store.getters.auth
    },
    user () {
      return this.$store.getters.user
    }
    // ...mapGetters({
    //   auth: 'auth',
    //   user: 'user'
    // })
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
