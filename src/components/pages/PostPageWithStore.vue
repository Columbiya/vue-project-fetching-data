<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input 
            :value="searchQuery"
            @update:value="setSearchQuery"
            placeholder="Поиск.."
        />
        <div class="app__btns">
            <my-button @click="showDialog">
                Создать пост
            </my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:shown="dialogShown">
            <post-form
                @create="createPost" 
            />
        </my-dialog>

        <post-list 
            :posts="sortedAndSearchedPosts" 
            @remove="deletePost"
            v-if="!isPostsLoading"
         />
         
         <div v-else>
            Loading....
         </div>

        <div v-intersection="loadMorePosts" class="observer"></div>

        <pagination :pagesAmount="totalPages" @pageChanged="pageChanged" :activePage="page" />

        <!-- <h1>{{ $store.state.post.limit }}</h1>
        {{ $store.commit('post/setLoading') }} -->

    </div>
</template>

<script>
    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue'
    import Pagination from '@/components/Pagination.vue'
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

    export default {
        components: {
            PostList, PostForm, Pagination
        },
        data() {
            return {
                dialogShown: false,
            }
        },
        methods: {
            ...mapMutations({
                setPage: 'post/setPage',
                setSearchQuery: 'post/setSearchQuery',
                setSelectedSort: 'post/setSelectedSort'
            }),
            ...mapActions({
                loadMorePosts: 'post/loadMorePosts',
                fetchPosts: 'post/fetchPosts'
            }),
        },
        mounted() {
            this.fetchPosts();
        },
        computed: {
            ...mapState({
                posts: state => state.post.posts,
                page: state => state.post.page,
                limit:  state => state.post.limit,
                totalPages:  state => state.post.totalPages,
                isPostsLoading: state => state.post.isPostsLoading,
                selectedSort: state => state.post.selectedSort,
                searchQuery: state => state.post.searchQuery,
                sortOptions: state => state.post.sortOptions,
            }),
            ...mapGetters({
                sortedPosts: 'post/sortedPosts',
                sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
            })
        }
    }
</script>

<style>
    .app__btns {
        display: flex;
        justify-content: space-between;
    }

    .observer {
        height: 30px;
        background: green;
    }
</style>

<!-- Single file component -->
