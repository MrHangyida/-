import Vue from 'vue'
import Vuex from 'vuex'
import examManger from './modules/examManger'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        examManger
    }
})