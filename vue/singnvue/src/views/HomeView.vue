<template>
    <div class="home-view">
        <div class="hv ql-editor" v-html="content">
        </div>
        <div class="qms" v-if="isqms">
            <VueSignaturePad width="100%" height="200px" ref="signaturePad" />
            <button @click="saveSignature">保存签名</button>
            <button @click="clearSignature">清除签名</button>
        </div>
    </div>
</template>

<script setup>
import { VueSignaturePad } from 'vue-signature-pad';
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {nextTick, onMounted, ref} from "vue";
import $ from 'jquery'
let signaturePad = ref()

let savedImage = ref(null)

let content = ref(null)

let selectIndex = ref(0)

let isqms = ref(false)

onMounted(() => {
    let detail = localStorage.getItem('detail');
    detail = JSON.parse(detail);
    console.log(detail)
    content.value = detail.html_text
    nextTick(() => {
        $('.h_lines').each(function (params) {
            console.log(params)
          $(this).html('签名').addClass('qm').attr('index',params)
        })

        $('.qm').click(function () {
            let index = $(this).attr('index');
            console.log(index)
            selectIndex.value = index;
            isqms.value = true
        })
    })
})


function saveSignature() {
    const { isEmpty, data } = signaturePad.value.saveSignature();
    savedImage.value = data
    console.log(isEmpty, data);
    $(`.qm[index=${selectIndex.value}]`).html(`<image src="${data}" style="height:22px"></image>`)
    isqms.value = false
}

function clearSignature() {
    signaturePad.value.clearSignature()
}


</script>

<style>
.home-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.hv {
    overflow: auto;
}

.qms {
    width: 100%;
    height: auto;
    background: rgba(26, 115, 232, 1);
    flex-shrink: 0;
}
</style>