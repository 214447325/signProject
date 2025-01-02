<script setup>
import axios from "axios";
import {onMounted, ref, reactive, nextTick, toRaw} from 'vue';
import {QuillEditor} from '@vueup/vue-quill'
import $ from 'jquery'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {useRouter} from "vue-router"; // 引入样式文件

const env = import.meta.env.VITE_SERVER;

const data = reactive({
    content: '',
    editorOption: {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'size': ['small', false, 'large', 'huge']}],
                [{'font': []}],
                [{'align': []}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                [{'header': 1}, {'header': 2}],
                ['image'],
                [{'direction': 'rtl'}],
                [{'color': []}, {'background': []}],
                ['newFunction']
            ]
        },
        placeholder: '请输入内容...'
    }
})

let content = ref(null)

let myQuillEditor = ref(null)

onMounted(() => {
    let info = localStorage.getItem('info')
    info = JSON.parse(info)
    content.value = info.html_text
    nextTick(() => {
        const newFunctionButton = document.querySelector('.ql-newFunction');
        newFunctionButton.style.cssText = "width:60px; border:1px solid #ccc; border-radius:5px;";
        newFunctionButton.innerText = "签名";
        $('.ql-newFunction').click(() => {
            $('u').each(function (index, item) {
                let text = $(item).html()
                if (text.length > 0 && text.trim().length == 0) {
                    $(item).addClass('h_lines').attr({'l': text.length})
                }
            })
        })
    })
})

function setValue() {
    const text = toRaw(myQuillEditor.value).getHTML()
    console.log(text)
}

const router =useRouter()

function submitModel() {
    let info = localStorage.getItem('info')
    info = JSON.parse(info)
    let htmlText = toRaw(myQuillEditor.value).getHTML()
    let _json_ = {
        id: info.id,
        htmlText: htmlText
    }

    axios.post(`${env}/contract/update`,_json_).then((res) => {
        let data = res.data;
        if (data.code == 200) {
            localStorage.setItem('info', JSON.stringify(data.data))
            router.push('/')
        }
    })
}

</script>

<template>
    <div class="mv">
        <div class="mv-model" v-if="content">
            <QuillEditor ref="myQuillEditor"
                         theme="snow"
                         v-model:content="content"
                         :options="data.editorOption"
                         contentType="html"
                         @update:editorOption="setValue"
            />

        </div>
        <div class="btnd" @click="submitModel">模板提交</div>
    </div>

</template>

<style scoped>
.mv {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.mv-model {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.h_lines {
    width: 1px;
    height: 20px;
    border: 1px solid;
}

.btnd {
    width: 100%;
    height: auto;
    flex-shrink: 0;
    background: rgba(26, 115, 232, 1);
    box-sizing: border-box;
    padding: 20px 0;
    text-align: center;
    color: white;
    font-size: 20px;
}

.ql-editor {
    width: 100%;
    height: 100%;
}
</style>