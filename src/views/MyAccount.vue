<template>
    <h1 class="text-h3 mb-4">Kontoeinstellungen</h1>
    <!-- <label for="username">Username: </label>
    <span>{{ userprofile.username }}</span>
    <br>
    <label for="birthday">Geburtstag: </label>
    <span>{{ userprofile.birthday }}</span> -->
    <!-- {{ uid }}
    <br> <br> -->
    <v-form @submit.prevent="saveUserData()">
        <v-text-field v-model="userprofile.username" label="Nutzername" required hide-details class="mb-6"></v-text-field>
        <v-text-field v-model="userprofile.birthday" label="Geburtstag" required hide-details class="mb-6"></v-text-field>

        <v-btn color="primary" type="submit">speichern</v-btn>
    </v-form>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { getUserSession } from '../lib/composables.js'
import { useUserStore } from '../stores/UserStore.js'


// set values
const uid = ref(null)
const userprofile = ref('[]')
const userStore = useUserStore()



// save content of user profile to supabase and locally
const saveUserData = async () => {
    const { error } = await supabase
        .from('profiles')
        .update({ username: userprofile.value.username, birthday: userprofile.value.birthday })
        .eq('id', uid.value)

    localStorage.setItem("userName", JSON.stringify(userprofile.value.username));
    userStore.$patch({ name: userprofile.value.username })
}

// get user profile from supabase
async function getUserProfile(uid) {
    const { data } = await supabase.from('profiles').select().eq('id', uid)
    userprofile.value = data[0]
}

// get userid from session and call getUserProfile
onMounted(async () => {
    getUserSession()
        .then((session) => {
            uid.value = session.uid
            getUserProfile(uid.value)
        });
})
</script>