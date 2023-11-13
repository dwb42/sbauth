<template>
    <h1 class="text-h3 mb-4">Projekte</h1>

    <v-btn color="secondary" class="mr-4">filter</v-btn>
    <v-btn color="primary" :to="{ name: 'ProjectCreate' }">neues Projekt</v-btn>
    <div class="mb-4"></div>

    <div class="d-flex flex-wrap">
        <v-card class="mr-4 mb-4" max-width="400" v-for="project in projects" :key="project.id">
            <v-card-text>
                <div>{{ project.created_at }} - {{ project.created_by_username }}</div>
                <p class="my-2 text-h5 text--primary">
                    {{ project.name }}
                </p>
                <!-- <p>adjective</p> -->
                <div class="text--primary">
                    {{ project.description }}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="primary" :to="{ name: 'Project', params: { id: project.id } }">
                    erfahre mehr
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { truncateText } from '../lib/composables.js'
import { format } from 'date-fns'

const projects = ref([])

async function getProjects() {
    const { data } = await supabase
        .from('projects')
        .select(`
            *,
            profiles(id, username)
        `)
        .order('created_at', { ascending: false })
    projects.value = data
    //console.log('projects', projects.value)

    // loop through projects and modify values
    projects.value.forEach((project) => {
        project.description = truncateText(project.description, 200)
        project.created_at = format(new Date(project.created_at), 'dd.MM.yyyy')
        project.created_by_username = project.profiles.username
    })
}

onMounted(() => {
    getProjects()
})
</script>



