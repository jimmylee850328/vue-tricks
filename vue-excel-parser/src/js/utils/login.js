import axios from 'axios'
import { axiosConfig } from '../config/axiosConfig.js'

export async function login_ajax(user, password) {
    const send_data = {
        'username': user,
        'password': password
    };

    const response = await axios.post('/login/', send_data, axiosConfig)
     
    try {
        const data = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
        if (response.data['status'] == 'success') {
            this.$store.commit('set_auth_state', data['is_auth']);
            if (data['is_auth']) {
                this.$store.commit('set_username', data['name']);
                this.$store.commit('set_staff_state', data['is_staff']);
                this.$store.commit('set_private_state', true);
            } else {
                this.show_failed_login_hint = true;               
            }
                
        } else {
            this.show_failed_login_hint = true; 
        }
    } catch (error) {
        console.error(error);
    }

}

export async function logout_ajax() {
    try {
        const res = await axios.post('/logout/', {}, axiosConfig)
        if (!(res.data instanceof Object)) {
            res.data = JSON.parse(res.data);
        }            
        if (res['data']['status'] == 'success') {
            const res_data = res['data']
            this.$store.commit('set_username', '');
            this.$store.commit('set_auth_state', false);
            this.$store.commit('set_staff_state', false);
        }
        this.$store.commit('set_login_page_state', true);
    } catch {
        console.error(error);
    }

}

export async function check_logged_state_ajax() {
    try {
        const res = await axios.post('/cls/', {}, axiosConfig)
        if (!(res.data instanceof Object)) {
            res.data = JSON.parse(res.data);
        }                 
        const res_data = res['data'];
        if (res_data['is_auth']) {
            this.$store.commit('set_username', res_data['name']);
            this.$store.commit('set_auth_state', res_data['is_auth']);
            this.$store.commit('set_staff_state', res_data['is_staff']);
            if (res['data']['is_private']) {
                this.$store.commit('set_private_state', true);
            } else {
                this.$store.commit('set_private_state', false); 
            }
        } else {
            this.$store.commit('set_login_page_state', true);
        } 
    } catch (error) {   
        console.error(error);
    }
}