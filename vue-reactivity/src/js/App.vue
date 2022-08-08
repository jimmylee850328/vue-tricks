<template>
    <div>
        <v-app id="inspire">
            <!-- <div v-if="has_login"> -->
                <Toolbar/>
                <v-content>
                    <div class="pa-1">
                        <router-view></router-view>
                    </div>
                </v-content>
            <!-- </div>
                <div v-else>
                <Login/>
            </div> -->
        </v-app>
    </div>
    
</template>

<script>
    import Toolbar from '@/components/toolbar.vue';
    export default {
        name: 'App',
        
        components: {Toolbar},
        
        data() {
            return {
                
            }
        },

        computed: {
            has_login: function() {
                return this.$store.getters.is_authenticated
            }
        },
        
        methods: {

        },
    }

</script>

<style>
    [v-cloak] {
        display: none;
    }

    body  {
        font-family:Meiryo, Arial,Verdana,Sans-Serif, Microsoft JhengHei; 
        margin: auto auto;
        -webkit-overflow-scrolling: touch;
    }

    .v-content {
        padding-top:64px !important;
    }

    .underline {
        border-color: #f0f0f0;

    }
</style>