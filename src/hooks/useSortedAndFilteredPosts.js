import { computed, ref, watch, watchEffect } from "vue";

export function useSortedAndFilteredPosts(sortedPosts) {
    const searchQuery = ref('')
    
    const filteredPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title?.toString().toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    
    const setSearchQuery = val => searchQuery.value = val

    return {
        searchQuery,
        filteredPosts,
        setSearchQuery
    }
}