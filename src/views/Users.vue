<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const profiles = ref([])

async function getUsers() {
    const { data } = await supabase.from('profiles').select()
    profiles.value = data
    console.log('profiles', profiles.value)
}

onMounted(() => {
    getUsers()
})
</script>

<template>
    <h1>Users</h1>
    <ul>
        <li v-for="profile in profiles" :key="profile.id">{{ profile.username }}</li>
    </ul>
</template>