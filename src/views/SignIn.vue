<template>
    <h1 class="text-h3 mb-4">Sign In</h1>

    <v-form @submit.prevent="submit">
        <!-- <v-container> -->
        <v-row>
            <v-col cols="12" md="8" xl="4">
                <v-text-field v-model="email" label="E-Mail" required hide-details class="mb-6"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="8" xl="4">
                <v-text-field v-model="password" label="Password" required hide-details class="mb-6"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="8" xl="4">
                <v-btn color="primary" type="submit" v-if="enableButton">sign in</v-btn>
                <v-btn color="primary" type="submit" v-else disabled>fill out form</v-btn>
            </v-col>
        </v-row>
    </v-form>
    <!-- <br><br>
    <v-btn @click="getUser('1b427053-ee2c-45cf-b7a0-fcf1dbc5cce9')">get user name</v-btn> -->
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/UserStore.js'
import { loginUserLocally } from '../lib/composables.js'



//initialize values 
const email = ref('fovecax791@dixiser.com');
const password = ref('12adfas^%@asdES3');
const enableButton = ref(false);
const router = useRouter();

const userStore = useUserStore()



watchEffect(() => {
    if (isValidEmail(email.value)) {
        //console.log('valid email')
        enableButton.value = true;
    } else {
        //console.log('invalid email')
        enableButton.value = false;
    }
});


function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


// function to create user 
const submit = async (event) => {

    //console.log('email', email.value);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })

        if (data) {
            //console.log('user logged in');
            //console.log('data', data.session.user.id);

            //get username from profile
            const uid = data.session.user.id;
            const username = await getUserInfoFromDB(uid);

            //console.log('username 333', username);

            loginUserLocally(username, uid)

            // localStorage.setItem("userName", JSON.stringify(username));
            // localStorage.setItem("loggedIn", true);
            // userStore.$patch({ name: username, loggedIn: true })

            router.push({ name: 'Dashboard' })
        }
    }
    catch (error) {
        console.log('error 12 ', error);
    }

}

async function getUserInfoFromDB(uid) {
    const { data } = await supabase.from('profiles').select().eq('id', uid)
    //console.log('data', data[0].username);
    return data[0].username;
}



</script>
