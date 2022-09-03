<template>
    <div class="pagination">
        <div 
            v-for="page in pagesAmount" :key="page" 
            class="pagination__item"
            :class="{active: page === activePage}"
            @click="$emit('pageChanged', page)"
        >
            {{ page }}
        </div>
    </div>

</template>

<script>
export default {
    props: {
        pagesAmount: {
            type: Number,
            required: true,
        },
        activePage: {
            type: Number,
            required: true,
        }
    }
}
</script>

<style>
    .pagination {
        display: flex;

        margin-top: 25px;
        justify-content: center;
    }

    .pagination__item {
        width: 25px;
        height: 25px;

        display: grid;
        place-items: center;

        color: teal;
        border: 2px solid teal;

        cursor: pointer;

        transition: all .5s ease;
    }

    .pagination__item:hover {
        background: teal;
        color: #fff;
    }

    .pagination__item:not(:last-child) {
        margin-right: 10px;
    }

    .active {
        background: teal;
        color: #fff;
    }
</style>