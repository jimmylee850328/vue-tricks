import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Main from '../main.vue'
import VueRouter from 'vue-router'
import route from '../../router/index.js'


import '@babel/polyfill'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.use(VueRouter)

localVue.directive('focus', { 
    inserted: function(el) {
        el.focus()
    }
})

describe('main.vue Method Test', () => { 
    let store;
    let vuetify;
    let getters;
    let actions;

    let router = new VueRouter({
        mode: 'abstract',
        routes:route.routes
      });

    beforeEach(() => {
        actions = {
            dialog_back_default_position_toggle: jest.fn(),
            dialog_save_layout_confirm_toggle: jest.fn(),
            dialog_toggle_action: jest.fn(),
        };

        getters = {
          dialog_default_pos: function(state) {
            return state.dialog_default_pos
          }
        }

        store = new Vuex.Store({
          actions, getters,
          state: {
            dialog_default_pos: false,
          },
          //actions
        })
      })   
      
      const mountFunction = () => {
        return shallowMount(Main, {
            localVue,
            vuetify,
            router,
            store,
            stubs: ['router-link', 'router-view'],
            mocks: { //假的property
                test_fn: jest.fn(),
                test_data: 'test',
            },
            propsData: {

            },
        })
      }

   

    test('main.vue check loaded tab function would be right', async () => {
        const wrapper = mountFunction();

        //檢查shared_users是否只剩下share屬性是true的
        expect(wrapper.text()).toContain('initial template')      
    })    

  })