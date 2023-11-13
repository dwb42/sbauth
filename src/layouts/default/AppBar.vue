<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="openNav = !openNav"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title><router-link :to="{ name: 'Home' }" class="text-decoration-none text-white">Supabase
        Dummy App</router-link></v-app-bar-title>

    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
    </template>

    <!-- <v-btn @click="updateUserData">get Profile</v-btn> -->
    <span v-if="loggedIn">{{ username }}</span>
    <v-btn v-if="loggedIn" @click="signOut">sign out</v-btn>
    <v-btn v-if="!loggedIn" :to="{ name: 'SignIn' }">sign in</v-btn>
    <v-btn v-if="!loggedIn" :to="{ name: 'SignUp' }">register</v-btn>
  </v-app-bar>


  <v-navigation-drawer permanent v-if="openNav">
    <!-- <v-list>
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              title="Sandra Adams"
              subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list> -->

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- <v-list-item isActive prepend-icon="mdi-home-outline" title="Home" :to="{ name: 'Home' }">
        </v-list-item> -->
      <v-list-item prepend-icon="mdi-view-dashboard-outline" title="Dashboard" :to="{ name: 'Dashboard' }"
        @click="openNav = !openNav"></v-list-item>
      <v-list-item prepend-icon="mdi-format-list-bulleted-type" title="Projects" :to="{ name: 'Projects' }"
        @click="openNav = !openNav"></v-list-item>
      <!-- <v-list-item prepend-icon="mdi-image-multiple-outline" title="Images" :to="{ name: 'Images' }"
        @click="openNav = !openNav"></v-list-item> -->
      <v-list-item prepend-icon="mdi-account-outline" title="Mein Konto" :to="{ name: 'MyAccount' }"
        @click="openNav = !openNav"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" :to="{ name: 'Users' }"
        @click="openNav = !openNav"></v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/UserStore.js'


// user values
const userStore = useUserStore() // useUserStore is a function that returns a store object  
const username = ref(userStore.name)
const loggedIn = ref(userStore.loggedIn)

watch(userStore, () => {
  username.value = userStore.name,
    loggedIn.value = userStore.loggedIn
})


const openNav = ref(false)
const router = useRouter();




async function signOut() {
  const { error } = await supabase.auth.signOut()
  localStorage.removeItem("userName");
  localStorage.removeItem("loggedIn");
  userStore.$patch({ name: '', loggedIn: false })

  // redirect to sign in page
  router.push({ name: 'SignIn' })
}

// // get username from local storage
// function getUsernameFromLocalStorage() {
//   username.value = JSON.parse(localStorage.getItem("userName"));
// }

// onBeforeMount(getUsernameFromLocalStorage);


// function updateLoginStatus(payload) {
//   isLoggedIn.value = payload.status
// }

// export { updateLoginStatus }



// async function getUserId() {

//   const { data, error } = await supabase.auth.getSession()

//   console.log('userId', data.session.user.id)

//   getUserData(data.session.user.id)

// }


// function getUserData() {

//   const user = useUserStore()
//   username.value = user.name

//   console.log('userData', username.value)
// }


//check ob nutzer eingeloggt ist
// const checkAuthUserSupabase = async () => {
//   const { data, error } = await supabase.auth.getUser()

//   if (error) {
//     console.log('error', error)
//     localStorage.removeItem("userName");
//   }
//   else {
//     //console.log('current user', data)
//   }

// }

// onBeforeMount(checkAuthUserSupabase);

</script>
