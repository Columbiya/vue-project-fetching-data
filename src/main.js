import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI/index'
import router from '@/components/router/router'
import directives from '@/directives'
import store from './components/store'

const app = createApp(App)

//глобальная регистрация компонента
components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
