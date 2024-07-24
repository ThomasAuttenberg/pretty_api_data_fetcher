<script setup lang="ts">
import { ref } from 'vue';


const title = ref<string>("");
const message = ref<string>("");
const shown = ref(false);
const floating = ref(false);
const reclicked = ref(false);
let timerForFloating: number | null = null;
let timerForShown: number | null = null;

const notify = (title_: string, message_: string) => {
  title.value = title_;
  message.value = message_;
  if (shown.value) {
    if (timerForFloating !== null) {
      clearTimeout(timerForFloating);
    }
    reclicked.value = true;
    setTimeout(() => {
      reclicked.value = false;
    }, 0);

    if (floating.value) {
      if (timerForShown !== null) {
        clearTimeout(timerForShown);
      }
      floating.value = false;
    }
  }

  shown.value = true;
  timerForFloating = window.setTimeout(() => {
    floating.value = true;
    timerForShown = window.setTimeout(() => {
      shown.value = false;
      floating.value = false;
    }, 200);
  }, 1900);
};

defineExpose({notify,});

</script>

<template>
<div class="toast" :class="{
  hidden: !shown,
  shown: shown,
  floating: floating,
  reclicked: reclicked
  }">
  <div class = "title">
    {{title}}
  </div>
  <br>
  <div class="text">
    {{message}}
  </div>
  <div class="line"></div>
</div>
</template>

<style scoped>
@keyframes animation {
  0%{
    width:100%;
  }
  100%{
    width:0;
  }
}
.toast{
  background-color: rgba(94, 255, 0, 0.5);
  position: fixed;
  right:20px;
  bottom:20px;
  padding:20px;
  border-radius: 5px;
  height: 150px;
  width: 400px;
}
.toast.hidden{
  display:none;
}
.toast.floating{
  transition-duration: 0.2s;
  right:-400px;
}
.title{
  color: black;
  font-weight: bold;
  font-size: 20px;
}
.toast.shown > .line{
  animation-name: animation;
  animation-duration: 2s;
  width:0;
}
.toast.reclicked > .line{
  animation: none;
}
.toast.hidden > .line{
  animation-name: none;
}
.line{
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  width: 100%;
  height: 2px;
}
.line.active{
  transition:2s;
  width: 0;
}
</style>