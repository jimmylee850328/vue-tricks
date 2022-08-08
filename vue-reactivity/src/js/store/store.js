import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:'developer',
        show_login_page:false,
        is_authenticated: false,
        is_staff: false,
    },

    mutations:{ //  sync function， 一般修改 vuex 寫這裡
        set_username (state, username) {
            state.user = username
        },

        set_auth_state (state, auth_state) {
            state.is_authenticated = auth_state
        },
        
        set_staff_state (state, staff_state) {
            state.is_staff = staff_state
        },
        
        set_login_page_state (state, login_page_state) {
            state.show_login_page = login_page_state
        },

    },
    
    actions: { // 建議 async function 才寫 actions 就好
        
    },
    
    getters: { // 建議 computed 的用法才寫 getters，平常使用 mapState 取值
         
    }
})