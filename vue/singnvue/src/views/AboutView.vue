<template>
    <div class="about">
        <div class="addBtn" @click="addFile">添加</div>
        <input type="file" ref="fileInput" v-show="false"  @change="handleFileChange"/>
        <div class="constract_list">
            <template v-if="dataJson && dataJson.length > 0">
                <template v-for="(item, index) in dataJson">
                    <div class="item">
                        <div class="title">{{ item.oldName }}</div>
                        <div class="status">
                            <div class="update">修改</div>
                            <div class="delete">删除</div>
                        </div>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import {onBeforeMount, ref} from "vue";

const env = import.meta.env.VITE_SERVER;

let dataJson = ref(null)

let fileInput = ref(null)

onBeforeMount(() => {
    getList()
})

function getList() {
    axios.get(`${env}/contract/list`).then((res) => {
        let data = res.data;
        if (data.code == 200) {
            dataJson.value = data.data
        }
    })
}

function addFile() {
    if(fileInput.value) {
        fileInput.value.click()
    }
}


function handleFileChange(event) {
    console.log(event.target.files[0])
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    axios.post(`${env}/contract/upload`, formData).then((res) => {
        if(res.data.code == 200) {
            // getList()
        }
    })
}
</script>

<style>
.about {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px;
    overflow: hidden;
}

.addBtn {
    width: fit-content;
    height: auto;
    font-size: 16px;
    flex-shrink: 0;
    color: #54aeff;
    border: 1px solid #54aeff;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 5px;

}

.constract_list {
    width: 100%;
    height: 100%;
    margin-top: 10px;
}

.item {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d1d9e0;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.title {
    font-size: 20px;
    color: #1f2328;
}

.status {
    width: fit-content;
    height: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.update {
    color: #54aeff;
    margin-right: 5px;
}

.delete {
    color: #596381;
}
</style>
