<template>
  <div class="app">
    <div>&nbsp</div>
    <SearchingField :copyAble="copyable" v-model:input="inputText" @enter = "handleEnterUuid" :class="{noInput:!uuid, gotInput:uuid}" :placeHolder ="inputPlaceHolderText" ref="searchingField" @focusout="backFocusOnInput" @linkCopying="linkCopyingNotify"/>
    <InformationalWindow v-if="!loadedFailed && loaded" :class="{loaded:(loaded && uuid), unloaded:!(loaded && uuid)}" @valCopying=infoCopyingNotify :information="information"/>
    <LoadingIco class="loadingIco" :loadingFail="loadedFailed" :message="loadingFailMessage" v-if="!loaded || loadedFailed"></LoadingIco>
    <ToastNotification ref="toastRef"/>
  </div>
</template>

<script setup lang="ts">

import ToastNotification from '@/UI/ToastNotification/ToastNotification.vue';
import InformationalWindow, {type InformationalFieldParams} from "@/Components/InformationalWindow.vue";
import SearchingField from "@/Components/SearchingField.vue";
import {onMounted, ref, watch} from "vue";
import {callToast} from "@/UI/ToastNotification/callToast";;
import APIFetch from "@/hooks/APIFetch";
import fillInformationalWindowData from "@/hooks/fillInformationalWindow";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import LoadingIco from "@/Components/LoadingWindow.vue";
import type {AxiosError, AxiosResponse} from "axios";

const router = useRouter();
const route = useRoute();
const information = ref<Array<InformationalFieldParams>>([]);
const {toastRef, showToast} = callToast();
const searchingField = ref<typeof SearchingField | null>(null);
const inputText=ref("");
const loadingFailMessage=ref("");
let uuid = route.params.id as string;
const inputPlaceHolderText = ref(uuid? 'uuid: '+uuid : 'uuid');
const copyable = ref(Boolean(uuid));
const loadedFailed = ref(uuid == '');
const loaded = ref(uuid != '');
const API_ENDPOINT = '';

if(uuid) {
  getData();
}

watch(route, (newValue, oldValue)=>{
  getData();
});


onMounted(()=>{
  searchingField.value?.requestFocus();
});

async function fetchData(uuid: string) {
  let response : AxiosResponse<any, any>;
  response = await APIFetch("post", API_ENDPOINT,
      {
        uuid: uuid,
      }
  );
  return Promise.resolve(fillInformationalWindowData(response?.data));
}
function getData(){
  if(loadedFailed.value) loadedFailed.value = false;
  copyable.value=false;
  loaded.value = false;
  uuid = route.params.id as string;
  if(uuid){
  inputPlaceHolderText.value = "uuid: "+uuid;
  fetchData(route.params.id as string).then((data)=>{
    information.value = data;
    loaded.value = true;
    loadedFailed.value=false;
    copyable.value=true;
  }).catch((err:AxiosError)=>{
    switch(err.response?.status){
      case 404: loadingFailMessage.value='Профиль не найден';
      break;
      case 400:
        loadingFailMessage.value="Bad Request (code:400): сервер не понимает запрос. Данные в консоли";
        console.log("Ошибка во время выполнения запроса: "+err);
        break;
      case 500:
        loadingFailMessage.value="Ошибка сервера (code: 500)";
        console.log("Ошибка сервера: "+err.message);
        break;
      default:
        loadingFailMessage.value="Ошибка: (code:"+err.response?.status+"). Данные в консоли";
        console.log(err);
        break;
    }
    loadedFailed.value = true;
  });
  }else{
    loaded.value = true;
    inputPlaceHolderText.value = "uuid";
  }
}

function backFocusOnInput() {
  searchingField.value?.requestFocus();
}

function infoCopyingNotify(){
  showToast("Текст скопирован!","Текст успешно скопирован в буфер обмена.");
}

function linkCopyingNotify(){
  showToast("Ссылка скопирована!", "Ссылка на данную страницу скопирована в буфер обмена.")
}

function handleEnterUuid(input:string){
  router.push(inputText.value);
  inputText.value = '';
}

</script>

<style scoped>
.loadingIco{
  margin: 0 auto;
}
.app {
  height: 100vh;
  background-color: #c5c5c5;
}

@keyframes animation {
  0%{
   overflow: hidden;
    height: 0;
  }
  100%{
    overflow: auto;
  }
}
.noInput{
  margin-top: 20%;
}
.gotInput{
  transition-duration: 0.5s;
}
.loaded{
  animation-name: animation;
  animation-duration: 0.5s;
  animation-timing-function: linear;
}
.unloaded{
  height: 0;
}
</style>