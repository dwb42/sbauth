<template>
    <h1 class="text-h3 mb-4">Sign Up</h1>


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
                <v-btn color="primary" type="submit" v-if="enableButton">create account</v-btn>
                <v-btn color="primary" type="submit" v-else disabled>fill out form</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { supabase } from '../lib/supabaseClient'


//initialize values 
const email = ref('');
const password = ref('12adfas^%@asdES3');
const enableButton = ref(false);


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

    console.log('email', email.value);

    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })

    // //create document and return id
    // try {
    //     // Create document and return id
    //     const docRef = await addDoc(colRef, dataObj)

    //     // Access auto-generated id
    //     console.log('docRef', docRef.id);
    // } catch (error) {
    //     console.error('Error saving to Firebase:', error);
    // }
}

</script>
