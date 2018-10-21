<template>
  <v-app>
    <v-toolbar
      app
      dense
    >
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn flat :to="{name: 'login'}">Login</v-btn>
      <v-btn flat :to="{name: 'signup'}">SignUp</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <v-layout justify-content align-center>
        <h3>{{user.displayName}}</h3>
      <v-avatar
        :size="40"
        color="grey lighten-4"
        >
        <img src="@/assets/avatar.png" alt="avatar">
      </v-avatar>
      </v-layout>
      <v-btn flat @click="logout">Logout</v-btn>
      <!-- <v-btn flat :to="{name: 'signup'}">SignUp</v-btn> -->
    </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      title: 'Boletaje V2'
    }
  },
  computed: {
    ...mapState('auth', { user: 'user' })
    // user () {
    //   return this.$store.state.auth.user
    // }
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout () {
      this.authLogout().then(() => this.$router.push('/login'))
    }
  }
}
</script>
