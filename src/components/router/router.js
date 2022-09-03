import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import PostPage from '../pages/PostPage.vue'
import AboutPage from '../pages/About.vue'
import SinglePostPage from '../pages/SinglePostPage.vue'
import PagePostWithStore from '../pages/PostPageWithStore.vue'
import PostPageComposition from '../pages/PostPageComposition.vue'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/posts/:id',
        component: SinglePostPage
    },
    {
        path: '/store',
        component: PagePostWithStore
    },
    {
        path: '/composition',
        component: PostPageComposition
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router