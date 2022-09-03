<template>
  <nav class="nav">
    <div @click="$router.push('/')">Назвагнние</div>
    <div class="navbar__btns">
        <my-button @click="$router.push('/posts')">Пользователи</my-button>
        <my-button @click="$router.push('/about')" style="margin-left: 20px;">О сайте</my-button>
        <my-button @click="$router.push('/store')" style="margin-left: 20px;">store</my-button>
        <my-button @click="$router.push('/composition')" style="margin-left: 20px;">composition api</my-button>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
    .nav {
        height: 50px;
        background: lightgray;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 15px;
    }
</style>