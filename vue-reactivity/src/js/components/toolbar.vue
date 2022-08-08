<template>
    <nav>
        <v-app-bar
            id="toolbar"
            class="toolbar"
            fixed
            dark
        >
            <v-toolbar-title> Friday Meeting </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <div class="top_btn_container">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" text class="menu-btn">
                                切換頁面
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                v-for="item in menu_items"
                                text
                                class="menu-btn"
                                :to="item['to']"
                                :key="item.name"
                            >
                                <v-list-item-title>{{ item['name'] }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-toolbar-items>
        </v-app-bar>
    </nav>
</template>

<script>
    export default {
        components: {},

        data() {
            return {
                menu_items: [
                    { to: '/example-1/', name: '你的企鵝不是你的企鵝🐧' },
                    { to: '/example-2/', name: '還敢利用陣列索引直接設值啊！' },
                ]
            };
        },

        methods: {
        },
    };
</script>

<style scoped>
    .toolbar {
        width: 100%;
        height: 70px;
        background-color: #eee;
    }

    .top_btn_container {
        bottom: 12px;
        right: 100px;
        margin: auto;
        color: #fff;
    }

    .top_btn_container .menu-btn {
        margin: auto 5px;
        padding: 0 .5rem;
        height: 30px;
        color: #fff;
        background: #3575c8 !important;
        line-height: 30px;
        border-radius: 5px;
    }
</style>
