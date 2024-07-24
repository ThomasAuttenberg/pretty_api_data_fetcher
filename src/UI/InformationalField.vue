<script setup lang="ts">


import {ref, type VNodeRef} from "vue";

defineProps({
  title: { type: String, required: true },
  information: { type: String },
  noInfoText: {type: String, default: "Не установлено" },
  copyAble: {type:Boolean, default: true},
});

const emit = defineEmits(['valCopying']);
const responseRef = ref<VNodeRef | null>(null);
const copyCurrentText = (val: string): void => {
  emit('valCopying', val);
  navigator.clipboard.writeText(val);
};
function wheelOnResponseScroll(event:WheelEvent){
  (responseRef.value).scrollLeft += event.deltaY;
}
</script>

<template>
  <div class="field">
    <div class="title">{{ title }}</div>
    <div ref="responseRef" v-if="information" class="response" @wheel="wheelOnResponseScroll">
      <div v-if="copyAble" class="copyIco" @click="copyCurrentText(information)"></div>
      <div class="text">{{ information }}</div>
    </div>
    <div v-else class="response">{{noInfoText}}</div>
  </div>
</template>

<style scoped>
.field {
  display: grid;
  grid-template-columns: 200px 1fr; /* две колонки: фиксированная и гибкая */
  gap: 10px; /* промежуток между колонками */
  height: auto;
  color: black;
  border-style: solid;
  border-radius: 8px;
  border-color: darkgray;
  background-color: lightgray;
  align-content: center;
  overflow: hidden;
}

.title {
  align-content: center;
  text-align: center;
  font: 18px bold;
  font-family: Georgia, serif;
  background-color: darkgray;
  border-bottom: 1px solid lightgray;
  word-wrap: break-word; /* переносит текст на новую строку при переполнении */
  padding: 10px;
}


.response {
  display: flex;
  font-size: 18px;
  align-self: center;
  font-family: "Courier New", Courier, monospace;
  overflow-x: auto; /* добавляет горизонтальный скроллбар при переполнении */
  white-space: nowrap; /* запрещает перенос строк */
  padding: 5px;
}
.response::-webkit-scrollbar {
  display: initial;
  height: 5px;
}
.response::-webkit-scrollbar-track{
  background:lightgray;
  height: 3px;
}
.response::-webkit-scrollbar-thumb{
  background: gray;
}

.copyIco {
  content: url("@/assets/copy.svg");
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.copyIco:hover {
  transform: scale(110%);
}

@media (max-width: 799px) {
  .title {
    font: 13px bold;
    padding: 5px;
  }
  .response {
    font-size: 12px;
  }
  .field{
    grid-template-columns: 100px 1fr;
  }
  .response::-webkit-scrollbar {
    display: initial;
    height: 3px;
  }
}




</style>
