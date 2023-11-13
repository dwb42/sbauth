<template>
    <h1 class="text-h3 mb-4">Images</h1>

    <div>
        <v-file-input label="Bild auswählen" @change="onFileChange" />
        <br>
        <v-btn @click="uploadImage(imgFile)">Upload</v-btn>
        <br>
        <!-- <img v-if="imageURL" :src="imageURL" alt="Uploaded image" /> -->
        <br>
    </div>


    <!-- <AdvancedImage :cldImg="myImgage" /> -->
    <!-- <img :src="imageUR2L" /> -->
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { AdvancedImage } from "@cloudinary/vue";
import { Cloudinary } from "@cloudinary/url-gen";
// // Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Resize } from "@cloudinary/url-gen/actions/resize";

const imageURL = ref(null)
const imageURL2 = ref('https://res.cloudinary.com/ddztjooms/image/upload/e_gen_recolor:prompt_black%20box;to-color_AA24BB/co_rgb:8A3232,e_colorize:40/co_rgb:0021FF,l_text:arial_200_bold_normal_left:Hara%20Chair%20for%20Sale%20$400/fl_layer_apply,g_south,x_0,y_100/ar_6:6,c_scale,w_500/hara-chair-01.jpg')
const imgFile = ref(null)

// Transform with sdk 
const cld = new Cloudinary({ cloud: { cloudName: 'ddztjooms' } });
const myImage = cld
    .image('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg')
    .setDeliveryType('fetch')
    .resize(Resize.fill().width(100).height(150))

//console.log(myImage.toURL());


const uploadImage = (file) => {


    console.log('uploadImage name ', file.name)
}

const onFileChange = (e) => {
    imgFile.value = e.target.files[0]
    console.log('onFileChange', imgFile.value)
}



</script>