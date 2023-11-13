<template>
    <!-- Project View-->
    <div v-if="pageState === 'view'">
        <div class="text-caption mb-2 text-decoration-none"><router-link :to="{ name: 'Projects' }">Projekte</router-link>
        </div>
        <h1 class="text-h3 mb-4">{{ project.name }}</h1>
        <div class="mb-6">erstellt am {{ project.created_at }} von {{ project.created_by_username }}</div>
        <div>{{ project.description }}</div>

        <!-- show images -->
        <div v-if="project.cloudinary_public_id" class="mt-6">
            <v-img v-for="id in project.cloudinary_public_id" :key="id" width="200px" aspect-ratio="16/9"
                @click="dialog = true; img_to_open_cloudinary_public_id = id" class="d-inline-block mr-4 mb-4"
                :src="`https://res.cloudinary.com/ddztjooms/image/upload/c_thumb,w_200,g_face/v1699267336/${id}`">
            </v-img>

            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title class="text-h5">Full Size Image</v-card-title>
                    <v-card-text>
                        <v-img
                            :src="`https://res.cloudinary.com/ddztjooms/image/upload/c_thumb,w_600,g_face/v1699267336/${img_to_open_cloudinary_public_id}`"
                            aspect-ratio="16/9"></v-img>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <!-- <v-btn color="secondary" class="mt-12" :to="{ name: 'Project', params: { id: project.id } }"> edit </v-btn>
            -->
        <v-btn text color="secondary" class="mt-12" :to="{ name: 'Project', params: { id: project.id, state: 'edit' } }"
            v-if="userStore.uid === project.created_by">
            bearbeiten
        </v-btn>
    </div>
    <!-- Project View-->

    <div v-if="pageState === 'edit'">
        <h1 class=" text-h3 mb-4">Projekt bearbeiten</h1>

        <!-- Project Edit Form-->
        <v-form @submit.prevent="saveProjectData()">
            <v-text-field v-model="project.name" label="Projektname" required hide-details class="mb-6"></v-text-field>
            <v-textarea v-model="project.description" label="Beschreibung" required hide-details class="mb-6"
                auto-grow></v-textarea>

            <v-file-input label="File input" @change="uploadImage"></v-file-input>
            <!-- <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" /> -->

            <!-- <img v-if="files" :src="files[0].name" alt="Uploaded Image" /> -->
            <!-- {{ previewURL }} -->
            <!-- <img width="150px" v-if="previewURL" :src="previewURL" alt="Uploaded Image" /> -->
            <v-img width="150" aspect-ration="16/9" :src="previewURL"></v-img>
            <!-- {{ previewURL }} -->
            <br>


            <v-btn color="primary" type="submit">speichern</v-btn>
            <v-btn text color="grey-lighten-2" class="ml-4"
                :to="{ name: 'Project', params: { id: project.id, state: '' } }">abbrechen </v-btn>

            <div class="mt-16"></div>
        </v-form>
        <!-- Project Edit Form-->


        <!-- Project Delete Dialog-->
        <v-dialog width="500">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="red-lighten-3" class="mt-16" text="Löschen"> </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
                <v-card title="Projekt Löschen">
                    <v-card-text>
                        Bitte bestätige die Löschung dieses Projektes. Dieser Vorgang kann nicht rückgängig gemacht werden.
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text color="red" class="mr-4" @click="deleteProject(project.id)">löschen</v-btn>
                        <v-btn text="abbrechen" @click="isActive.value = false"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
        <!-- Project Delete Dialog-->
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import { useUserStore } from '../stores/UserStore.js'
import { format } from 'date-fns'
import { image } from '@cloudinary/url-gen/qualifiers/source'


const route = useRoute()
const router = useRouter();

const userStore = useUserStore()

const projectID = route.params.id
const pageState = ref(route.params.state || 'view')
const project = ref({})

let previewURL = ref(null)
let files = ref(null)

const dialog = ref(false);
const img_to_open_cloudinary_public_id = ref(null);


async function getProjects() {
    // get project data from db
    const { data: projectData } = await supabase
        .from('projects')
        .select(`
            *,
            profiles(id, username)
        `)
        .eq('id', projectID)
    project.value = projectData[0]
    //console.log('project', project.value)

    // get images data from db
    const { data: imageData } = await supabase
        .from('images2projects')
        .select(`
            *,
            images(cloudinary_public_id)
        `)
    //.eq('image data ', projectID)
    console.log('image Data', imageData)

    project.value.cloudinary_public_id = imageData.map(item =>
        item.images.cloudinary_public_id)

    //project.value.cloudinary_public_id = imageData[0].images.cloudinary_public_id
    console.log('project cloudinary public id', project.value.cloudinary_public_id)




    project.id = project.value.id
    project.value.name = project.value.name.trim()
    project.value.created_at = format(new Date(project.value.created_at), 'dd.MM.yyyy')
    project.value.created_by_username = project.value.profiles.username
}

const imageUrl = ref(null);

async function uploadImage(event) {
    files = ref(event.target.files)
    console.log('files', files.value)
    previewURL.value = URL.createObjectURL(files.value[0])
    console.log('previewURL', previewURL)
    if (files.length === 0) {
        return;
    }

    // const formData = new FormData();
    // formData.append('file', files.value[0]);
    // formData.append('upload_preset', 'rogkj7rr'); // Replace with your Cloudinary upload preset
    // console.log('formData', formData)

    // try {
    //     const response = await fetch('https://api.cloudinary.com/v1_1/ddztjooms/image/upload', {
    //         method: 'POST',
    //         body: formData,
    //     });

    //     const data = await response.json();
    //     imageUrl.value = data.secure_url;
    // } catch (error) {
    //     console.error('Upload error:', error);
    // }
}

const saveProjectData = async () => {
    //console.log('saveProjectData', project.value)

    // upload images to cloudinary and save info in db 
    if (files) {
        console.log('files', files.value)

        const formData = new FormData();
        formData.append('file', files.value[0]);
        formData.append('upload_preset', 'rogkj7rr'); // Replace with your Cloudinary upload preset
        console.log('formData', formData)

        try {
            const response = await fetch('https://api.cloudinary.com/v1_1/ddztjooms/image/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            imageUrl.value = data.secure_url;
            console.error('cloudinary response:', data);

            // save image info in db
            saveImageInfoToDBimages(data)

        } catch (error) {
            console.error('Upload error:', error);
        }

    }



    const { error } = await supabase
        .from('projects')
        .update({
            name: project.value.name,
            description: project.value.description
        })
        .eq('id', project.value.id)

    if (error) {
        console.log('error', error)
    }
    //else
    //router.push({ name: 'Project', params: { id: project.value.id, state: '' } })
}


const saveImageInfoToDBimages = async (image) => {
    console.log('saveImageToDB', image)
    console.log('userStore.uid', userStore.uid)

    const { data: imageData, error: imageError } = await supabase
        .from('images')
        .insert({
            cloudinary_public_id: image.public_id,
            cloudinary_original_filename: image.original_filename,
            created_by: userStore.uid
        })
        .select()

    console.log('db data ', imageData[0])

    const { data: images2projectsData, error: images2projectsError } = await supabase
        .from('images2projects')
        .insert({
            image_id: imageData[0].id,
            project_id: project.value.id,
            created_by: userStore.uid
        })
        .select()

    console.log('db data ', images2projectsData)

}


const deleteProject = async (id) => {
    //console.log('deleteProject', id)

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) {
        console.log('error', error)
    }
    else {
        //console.log('deleteProject', id)
        router.push({ name: 'Projects' })
    }

}

// Watch for changes in the route parameters
watch(route, (newRoute) => {
    pageState.value = newRoute.params.state || 'view';
});


// load projects upon mount
onMounted(() => {
    getProjects()
})
</script>