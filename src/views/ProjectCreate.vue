<template>
    <h1 class=" text-h3 mb-4">Projekt erstellen</h1>

    <v-form @submit.prevent="createProject()">
        <v-text-field v-model="project.name" label="Projektname" required hide-details class="mb-6"></v-text-field>
        <v-textarea v-model="project.description" label="Beschreibung" required hide-details class="mb-6"
            auto-grow></v-textarea>

        <v-btn color="primary" type="submit">erstellen</v-btn>
        <v-btn text color="grey-lighten-2" class="ml-4" :to="{ name: 'Projects' }">abbrechen</v-btn>
    </v-form>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import { useUserStore } from '../stores/UserStore.js'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter();

const userStore = useUserStore()

const project = ref({})

//const { snackbar } = defineProps(['snackbar']);
//const snackbar = ref(route.props.snackbar || false)



const createProject = async () => {
    //console.log('saveProjectData', project.value)

    const { data, error } = await supabase
        .from('projects')
        .insert({
            name: project.value.name,
            description: project.value.description,
            created_by: userStore.uid
        })
        .select()

    if (error) {
        console.log('error', error)
    }
    else {
        console.log('data', data[0].id)
        router.push({ name: 'Project', params: { id: data[0].id, state: '' } })
    }

}



</script> 