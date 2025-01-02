<template>
    <div class="about">
        <div class="addBtn" @click="addFile">添加</div>
        <input type="file" ref="fileInput" v-show="false"  @change="handleFileChange"/>
        <div class="constract_list">
            <template v-if="dataJson && dataJson.length > 0">
                <template v-for="(item, index) in dataJson">
                    <div class="item" @click="goInfo(item)">
                        <div class="title">{{ item.oldName }}</div>
                        <div class="status">
                            <div class="update" @click.stop="updateInfo(item)">修改</div>
                            <div class="delete" @click.stop="deleteData(item)">删除</div>
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
import {useRouter} from "vue-router";

const env = import.meta.env.VITE_SERVER;

let dataJson = ref(null)

let fileInput = ref(null)

const router = useRouter()

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
        let data = res.data;
        if (data.code == 200) {
            localStorage.setItem('info', JSON.stringify(data.data))
            router.push('/model')
        }
    })
}

function updateInfo(item) {
    localStorage.setItem('info', JSON.stringify(item))
    router.push('/model')
}

function deleteData(item) {
    console.log(item)
    axios.delete(`${env}/contract/delete?id=${item.id}&name=${item.newName}`).then((res) => {
        getList()
    })
}

function goInfo(item) {
    console.log(item)
    localStorage.setItem('detail', JSON.stringify(item))
    router.push('/home')
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
    overflow: auto;
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
    width: 100%;
    height: auto;
    font-size: 20px;
    color: #1f2328;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.status {
    width: fit-content;
    height: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    flex-shrink: 0;
    margin-left: 20px;
}

.update {
    color: #54aeff;
    margin-right: 5px;
}

.delete {
    color: #596381;
}
</style>
