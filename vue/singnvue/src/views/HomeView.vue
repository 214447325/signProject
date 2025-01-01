<template>
    <div>
        <VueSignaturePad width="500px" height="500px" ref="signaturePad" />
        <button @click="saveSignature">保存签名</button>
        <button @click="clearSignature">清除签名</button>

        <img v-if="savedImage" :src="savedImage" alt="Signature Image" />
    </div>
</template>

<script setup>
import { VueSignaturePad } from 'vue-signature-pad';
import {ref} from "vue";

let signaturePad = ref()

let savedImage = ref(null)


function saveSignature() {
    const { isEmpty, data } = signaturePad.value.saveSignature();
    savedImage.value = data
    console.log(isEmpty, data);
}

function clearSignature() {
    signaturePad.value.clearSignature()
}
</script>