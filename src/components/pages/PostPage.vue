<template>
    <div>
        <!-- <div>
            <button @click="addLike">Like</button>
            <button @click="addDislike">Dislike</button>
            Знак @ заменяет v-on:click и тд
        </div>
        <div>Количество лайков: <strong>{{ likes }}</strong></div>
        <div>Количество дизлайков: <strong>{{ dislikes }}</strong></div> -->
        <h1>Страница с постами</h1>
        <my-input 
            v-model:value="searchQuery"
            placeholder="Поиск.."
        />
        <div class="app__btns">
            <my-button @click="showDialog">
                Создать пост
            </my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
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

    </div>
</template>

<script>
    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue'
    import Pagination from '@/components/Pagination.vue'
    import axios from 'axios'

    export default {
        components: {
            PostList, PostForm, Pagination
        },
        data() {
            return {
                posts: [],
                dialogShown: false,
                modificatorValue: '',
                page: 1,
                limit: 10,
                totalPages: 0,
                isPostsLoading: true,
                selectedSort: '',
                searchQuery: '',
                sortOptions: [
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' },
                    { value: 'id', name: 'По айдишнику' },
                ],
            }
        },
        methods: {
            createPost(post) {
                console.log(post)
                this.posts.push(post)
                this.dialogShown = false
            },
            deletePost(postToRemove) {
                this.posts = this.posts.filter(post => post.id !== postToRemove.id)
            },
            showDialog() {
                this.dialogShown = true
            },
            async fetchPosts() {
                try {
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data
                } catch(e) {
                    alert('Ошибка')
                } finally {
                    this.isPostsLoading = false
                }
            },
            async loadMorePosts() {
                try {
                    this.page += 1
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data]
                } catch(e) {
                    alert('Ошибка')
                } finally {
                    this.isPostsLoading = false
                }
            },
            pageChanged(newPage) {
                this.page = newPage
            }
        },
        mounted() {
            this.fetchPosts()
            
            // const options = {
            //     rootMargin: '0px',
            //     threshold: 1.0
            // }

            // const callback = (entries, observer) => {
            //     if (entries[0].isIntersecting && this.page < this.totalPages) {
            //         this.loadMorePosts()
            //     }
            // }

            // const observer = new IntersectionObserver(callback, options);
            // observer.observe(this.$refs.observer)
        },
        // watch: {
        //     selectedSort(newValue) { //должна иметь название такое же, как и модель в компоненте, за котроым она следит
        //         this.posts.sort((post1, post2) => {
        //             return post1[newValue]?.localeCompare(post2[this.selectedSort])
        //         })
        //     }
        // },
        watch: {
            // page(newValue) {
            //     this.fetchPosts()
            // },
            limit(newValue) {
                this.fetchPosts()
            }
        },
        computed: {
            sortedPosts() {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.toString()?.localeCompare(post2[this.selectedSort]))
            },
            sortedAndSearchedPosts() {
                return this.sortedPosts.filter(post => post.title?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
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
