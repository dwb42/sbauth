<template>
    <h1 class="text-h3 mb-4">Images</h1>

    <div>
        <v-file-input label="Bild auswählen" @change="onFileChange" />
        <br>
        <v-btn @click="uploadImage">Upload</v-btn>
        <br>
        <img v-if="imageURL" :src="imageURL" alt="Uploaded image" />
        <br>
        <AdvancedImage :cldImg='myImg' />
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { AdvancedImage } from "@cloudinary/vue";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

const cld = new Cloudinary({ cloud: { cloudName: 'ddztjooms' } });

const myImg = cld.image('cld-sample-5');
//console.log('myImg', myImg)

// Apply the transformation.
myImg.effect(sepia());  // Apply a sepia effect.



const imageURL = ref(null)



const uploadImage = () => {
    console.log('uploadImage')
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    //console.log('onFileChange', file)
}

// const upload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET');

//     try {
//         const res = await axios.post('https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload', formData);
//         imageURL.value = res.data.url;
//     } catch (error) {
//         console.error('Error uploading image:', error);
//     }
// };

</script>