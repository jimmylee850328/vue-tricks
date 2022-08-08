<template>
    <div>
        <v-row no-gutters class="mt-2">
            <v-text-field 
                v-model="animal" 
                label="啥動物來著"
                hide-details
                style="max-width: 200px" 
                outlined 
            />
            <v-btn @click="change_animal" color="primary" class="ml-2 mt-2"> 把動物陣列[0]換掉 </v-btn>
        </v-row>
        <ul>
            <li 
                v-for="animal in animals" 
                :key="animal + count"
            >
                {{ animal }}
            </li>
        </ul>
        <v-btn 
            color="error" 
            @click="$forceUpdate()" 
            class="mr-1"
        >
            <v-icon class="mr-1"> mdi-alert </v-icon>
            又是禁忌的那一招 
        </v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                animal: '',
                animals: ['<YOURAnimal>', 'cat', 'penguin', 'bird', 'rabbit'],
                count: 0
            };
        },

        methods: {
            change_animal () {
                this.animals[0] = this.animal;
                
                // this.count += 1;

                // this.$set(this.animals, 0, this.animal)

                console.log(this.animals);
            }
        },
    };
</script>

<style lang="scss" scoped>

</style>