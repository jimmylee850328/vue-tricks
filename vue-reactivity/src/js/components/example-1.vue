<template>
    <div>
        <v-row no-gutters>
            <v-btn color="warning" @click="addCount('dog')" class="mr-1"> 加狗 </v-btn>
            <v-btn color="success" @click="addCount('cat')" class="mr-1"> 加貓 </v-btn>
            <v-btn color="info" @click="addCount('penguin')" class="mr-1"> 加企鵝 </v-btn>
            <v-spacer></v-spacer>
            <v-btn 
                color="error" 
                @click="$forceUpdate()" 
                class="mr-1"
            >
                <v-icon class="mr-1"> mdi-alert </v-icon>
                禁忌的那一招 
            </v-btn>
        </v-row>

        <v-row no-gutters class="mt-2">
            <v-btn color="error" @click="create_wrong_obj()" class="mr-1"> 用錯誤的方式新增物件的 key </v-btn>
            <v-btn color="success" @click="create_right_obj()" class="mr-1"> 用正確的方式新增物件的 key </v-btn>
            <v-btn color="info" @click="add_value()" class="mr-1"> 數值++ </v-btn>
        </v-row>
        
        <div class="my-5">
            <h3> Dog: {{ counter.dog }} </h3>
            <h3> Cat: {{ counter.cat }} </h3>
            <h3> Penguin: {{ counter.penguin }} </h3>
        </div>

        <h3> OO object </h3>
        <pre>{{ oo_obj }}</pre>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: {
                    dog: 0,
                    cat: 0
                },

                oo_obj: {
                    'cat': 'meow'
                }
            };
        },

        created() {
            // 在 created 的時候才建立 penguin 順便設值為 0
            this.counter.penguin = 0;
        },

        methods: {
            addCount(name) {
                this.counter[name]++
            },

            create_wrong_obj () {
                this.oo_obj.hello = 5;
                this.oo_obj.world = 6;

                console.log('oo obj is: ', JSON.stringify(this.oo_obj, null, 2));
            },

            create_right_obj () {
                this.oo_obj = {...this.oo_obj, 'hello': 5, 'world': 6};

                // this.$set(this.oo_obj, 'hello', 5);
                // this.$set(this.oo_obj, 'world', 6);

                // Object.assign({}, this.oo_obj, {
                //     hello: 5,
                //     world: 6
                // })
            },

            add_value () {
                this.oo_obj['hello']++;
                console.log(this.oo_obj['hello'])
            }
        },
    };
</script>

<style lang="scss" scoped>


</style>