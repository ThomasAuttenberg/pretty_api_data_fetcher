<script setup lang="ts">
import InformationalField from "@/UI/InformationalField.vue";
import {onMounted} from "vue";

export interface InformationalFieldParams{
  title: string,
  text?: string,
  copyAble?: boolean,
}

const props = defineProps({
  information: {type: Array<InformationalFieldParams>, required: true}
});

const emit = defineEmits(['valCopying','update:placeholder']);
const notify = ()=>{
  emit("valCopying");
};

</script>

<template>
  <div class = "wrapper">
    <InformationalField @valCopying="notify" v-for="field in information" :copyAble="field.copyAble" :title="field.title" :information="field.text"/>
  </div>
</template>

<style scoped>
.wrapper {
  width: 80%;
  height: 80%;
  overflow: auto;
  margin: 0 auto;
  background: darkgray;
  -ms-overflow-style: none;
}
.wrapper::-webkit-scrollbar {
  display: initial;
}
.wrapper::-webkit-scrollbar-track{
  background:gray;
}
.wrapper::-webkit-scrollbar-thumb{
  background: lightgray;
}
</style>