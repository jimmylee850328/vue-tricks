<template>
    <div>
        <v-app id="inspire">
            <Toolbar />
            <div style="height: 64px;"></div>
            <ExcelParser />
        </v-app>
    </div>
</template>

<script>
    import Toolbar from '@/components/toolbar.vue';
    import ExcelParser from './components/excel-parser.vue';
    export default {
        name: 'App',
        components: {
            Toolbar, ExcelParser
        },
        
        data () {
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