<template>
  <h1>Home</h1>
  <p class="mb-4">Welcome to my supabase dummy app.</p>

  <v-btn :to="{ name: 'SignIn' }" color="primary" class="mr-4">Sign In</v-btn>
  <v-btn :to="{ name: 'SignUp' }" color="secondary">Register</v-btn>
  <br>
  <v-btn @click="writeToPinia()">toggle pinia login state</v-btn>
  <br>
  <v-btn @click="signInWithGoogle()">log in with google</v-btn>
  <br>
  {{ username }}
  <br>
  {{ loggedIn }}
</template>

<script setup>
import { supabase } from '../lib/supabaseClient'
import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '../stores/UserStore.js'

// user values 
const userStore = useUserStore()
const username = ref(userStore.name)
const loggedIn = ref(userStore.loggedIn)

watch(userStore, () => {
  username.value = userStore.name,
    loggedIn.value = userStore.loggedIn
})

const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}



const writeToPinia = () => {
  userStore.$patch({
    name: 'Dietrich 4',
    loggedIn: !userStore.loggedIn
  })
}



// const user = ref(null);

// const checkUser = async () => {
//   const session = supabase.auth.getSession();

//   console.log('session ', session.user)

//   if (session) {
//     user.value = session.user;
//   } else {
//     user.value = null;
//   }
// };

// checkUser();

// console.log('user ', user.value)


// const writeToLocalStorage = async () => {

//   localStorage.setItem("userName", JSON.stringify('Dietrich 3'));

// };

</script>
