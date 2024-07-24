<script setup lang="ts">

import {reactive, ref, toRef, toRefs, watch} from "vue";

const onCopyLinkButton = ()=>{
  emit('linkCopying');
  navigator.clipboard.writeText(window.location.href);
}
const props = defineProps({
  placeHolder:({type:String, default:''}),
  input:({type:String, default:''}),
  copyAble:({type:Boolean,default:true}),
})

const {input: inputText} = toRefs(props);

const text = defineModel();

const emit = defineEmits(['linkCopying','enter','update:input']);

const isInputPlaceholderVisible = ref(true);

watch(inputText, (newValue:string,oldValue:string) => {
  if(oldValue.length == 0){
    isInputPlaceholderVisible.value=false;
  }else{
    if(newValue.length == 0){
      isInputPlaceholderVisible.value=true;
    }
  }
});
const inpt = ref<HTMLInputElement | null>(null);
function requestFocus(){
  console.log("focus lost");
  inpt.value?.focus();
}

function fireEnterEvent(event:Event){
  emit('enter');
}
function updateInput(value:string){
  emit('update:input',value);
}
defineExpose({requestFocus});

</script>

<template>
  <div class = "field">
    <div v-if="copyAble" class = "copyLink" @click="onCopyLinkButton"/>
      <input @keydown.enter="fireEnterEvent" ref="inpt" :value="input" @input="updateInput(($event.target as HTMLInputElement).value)" :class="{placeholder:isInputPlaceholderVisible}" :placeholder="placeHolder" class = "input" type="text" />
  </div>
</template>

<style scoped>
.field{
  display: flex;
  width: 80%;
  height: 5%;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
}
.input:focus{
  outline: none;
}
.input{
  align-self: center;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  border: 1px solid darkgray;
  border-radius: 20px;
  padding: 5px;
  font-size: 20px;
  width:100%;
  background-color: lightgray;
}
.input.placeholder{
  color: transparent;
  text-shadow: 0 0 0 black;
  text-align: center;
}
.copyLink{
  align-self: center;
  content: url("@/assets/link.svg");
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.copyLink:hover{
  transform: scale(110%);
}
</style>