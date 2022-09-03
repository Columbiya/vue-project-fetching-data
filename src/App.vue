<template>
    <navbar></navbar>
   <div class="app">
    <router-view></router-view>
   </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
        Navbar
    }
}
</script>

<style>
    body {
        margin: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .app {
        padding: 20px;
    }
</style>