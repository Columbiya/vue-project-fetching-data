<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input 
            :value="searchQuery"
            @update:value="setSearchQuery"
            placeholder="Поиск.."
        />
        <div class="app__btns">
            <my-button>
                Создать пост
            </my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
        </div>

        <my-dialog v-model:shown="dialogShown">
            <post-form
            />
        </my-dialog>

        <post-list 
            :posts="sortedAndSearchedPosts" 
            v-if="!isPostsLoading"
         />
         
         <div v-else>
            Loading....
         </div>

        <div v-intersection="loadMorePosts" class="observer"></div>

        <pagination :pagesAmount="totalPages" @pageChanged="loadMorePosts" :activePage="page" />
    </div>
</template>

<script>
    import PostForm from '@/components/PostForm.vue'
    import PostList from '@/components/PostList.vue'
    import Pagination from '@/components/Pagination.vue'
    import { usePosts } from '../../hooks/usePosts'
    import { useSortedPosts } from '../../hooks/useSortedPosts'
    import { useSortedAndFilteredPosts } from '../../hooks/useSortedAndFilteredPosts'

    export default {
        components: {
            PostList, PostForm, Pagination
        },
        data() {
            return {
                dialogShown: false,
                sortOptions: [
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' },
                    { value: 'id', name: 'По айдишнику' },
                ],
            }
        },
        setup(props) {
            // const likes = ref(0)
            // const addLike = () => {
            //     likes.value += 1 //чтобы менять реф нужно обращаться к value
            // }

            // return {
            //     likes,
            //     addLike
            // }

            const { isPostsLoading, posts, totalPages, page, setCurrentPage, loadMorePosts } = usePosts(10)
            const { selectedSort, sortedPosts, setSelectedSort } = useSortedPosts(posts)
            const { searchQuery, filteredPosts, setSearchQuery } = useSortedAndFilteredPosts(sortedPosts)

            return {
                isPostsLoading,
                posts, 
                totalPages,
                selectedSort,
                sortedAndSearchedPosts: filteredPosts,
                searchQuery,
                filteredPosts,
                page, setCurrentPage,
                loadMorePosts,
                setSelectedSort,
                setSearchQuery
            }
        },
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
