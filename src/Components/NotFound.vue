<script setup lang="ts">

</script>

<template>
  <div class="wrapper">
    <button class="btn" @click="$router.push('/')">Назад на главную</button>
    <div class="error">Ошибка 404: Страница не найдена</div>
  </div>
</template>

<style scoped>
  .wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: lightgray;
  }
  .error{
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: black;
    text-shadow: 2px 2px 2px darkgray;
    padding-top: 15%;
    margin: 0 auto;
  }
  .btn{
    background-color: darkgray;
    border: 1px solid darkgray;
    font-weight: bolder;
    width: 100%;
    height: 5%;
  }
  .btn:hover{
    background-color: lightgray;
    transition: 0.5s;
  }
</style>