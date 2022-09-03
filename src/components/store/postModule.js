import axios from "axios"

export const postModule = {
    state: () => ({
        posts: [],
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
    }), //рекомендуется объявлять в виде функции, которая возвращает объект
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.toString()?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title?.toString().toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setLoading(state, isLoading) {
            state.isPostsLoading = isLoading
        },
        setPage(state, pageNumber) {
            state.page = pageNumber
        },
        setLimit(state, limitNumber) {
            state.limit = limitNumber
        },
        setTotalPages(state, totalPagesNumber) {
            state.totalPages = totalPagesNumber
        },
        setSelectedSort(state, selectedSortString) {
            state.selectedSort = selectedSortString
        },
        setSearchQuery(state, searchQueryString) {
            state.searchQuery = searchQueryString
        },
    },
    actions: {
        async fetchPosts({ state, commit, dispatch }) { //dispatch нужен для вызова других экшенов
            try {
                commit('setLoading', true)
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit)
                commit('setTotalPages', totalPages)
                commit('setPosts', response.data)
            } catch(e) {
                console.log(e);
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePosts({ state, commit, dispatch }) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                const totalPages = Math.ceil(response.headers['x-total-count'] / state.limit)
                commit('setTotalPages', totalPages) 
                commit('setPosts', response.data) 
                state.posts = [...state.posts, ...response.data]
            } catch(e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        }
    },
    namespaced: true
}