<template>
    <form @submit.prevent> <!-- Модификаторы -->
        <h1>Создание поста</h1>
        <!-- <input class="input" 
            v-bind:value="post.title" 
            @input="post.title = $event.target.value"
            type="text"
            placeholder="Название"
        > -->
        <my-input
            v-focus
            v-model:value="post.title"
            type="text"
            placeholder="Название"
        />
        <my-input 
            v-model:value="post.body"
            type="text"
            placeholder="Описание"
        />
        <my-button 
            @click="createPost" 
            style="align-self: flex-end; margin-top: 15px;"
        >
            Добавить пост
        </my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    },
    watch: {
        post: {
            handler(newVal) {
                console.log(newVal)
            },
            deep: true,
        }
    }
}
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
</style>