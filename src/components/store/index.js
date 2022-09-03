import { createStore } from "vuex";
import { postModule } from "./postModule";

export default createStore({
    // state: {
    //     likes: 4
    // },
    // getters: { //computed свойства   
    //     doubleLikes(state) {
    //         return state.likes * 2
    //     }
    // },
    // mutations: { //изменять состояние напрямую нельзя (immutable), но можно с помощью мутаций (редюсер я так понимаю)
    //     incrementLikes(state) {
    //         state.likes += 1
    //     },
    //     decrementLikes(state) {
    //         state.likes -= 1
    //     }
    // },
    // actions: { //Функции, которые внутрие себя используют мутации (async data collection)

    // },
    state: {
        isAuth: false
    },
    modules: { //изолированный кусочек состояния
        post: postModule
    }
})