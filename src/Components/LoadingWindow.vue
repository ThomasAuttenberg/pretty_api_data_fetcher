<script setup lang="ts">
import {ref, toRefs, watch} from "vue";

const props = defineProps({
  loadingFail:{type: Boolean},
  message:{type: String, default:""},
});

const {loadingFail: loadingFailRef} = toRefs(props);

const loadingFailFlag = ref(false);
const showContentFlag = ref(false);
const printingMessageFlag = ref(false);
watch(loadingFailRef, (newValue) => {
  if(!newValue){
    showContentFlag.value=false;
    printingMessageFlag.value=false;
    loadingFailFlag.value=false;
  }
  setTimeout(()=>{loadingFailFlag.value =true; showContentFlag.value=true},400);
  setTimeout(()=>{printingMessageFlag.value = true},600);
})
</script>

<template>
<div :class="{loadingFail:loadingFailFlag}" class="loading">
  <div :class="{loadingFail:loadingFail}" class="loadingSym"></div>
  <div class = "content" :class="{messagePrinting:printingMessageFlag, hidden:!showContentFlag}" v-if="loadingFail">{{message}}</div>
</div>
</template>

<style scoped>

@keyframes content-appear-anim {
  0%{
    width: 0;
    overflow: hidden;
    color: lightgray;
  }
  100%{
    width: 100%;
    color: gray;
  }
}
.content.hidden{
  display: none;
}
.content{
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  transition: 1s;
  color: lightgray;
  width: 100%;
  padding: 15px;
  background-color: lightgray;
}
.content.messagePrinting{
  color: black;;
  transition: 2s;
}

.loading{
  width: 100px;
  display: flex;
}
.loading.loadingFail{
  width: 80%;
  border: none;
  border-radius: 0;
  transition: 0.5s;
}
.loadingFail.loadingSym{
  animation: none;
  transition: 2s;
  border: none;
  margin-right: 20px;
}
.loadingFail.loadingSym:before, .loadingFail.loadingSym:after{
  position: absolute;
  content: " ";
  margin-left: 40px;
  height: 80px;
  width: 5px;
  background-color: gray;
  transition: 2s;
}
.loadingFail.loadingSym:before{
  transform: rotate(45deg);
}
.loadingFail.loadingSym:after {
  transform: rotate(-45deg);
}
.loadingSym {
  border: 16px solid gray;
  border-top: 16px solid #c8c8c8;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>