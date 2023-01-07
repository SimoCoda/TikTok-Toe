<template>
    <div>
        <div v-if="!isGameOver">
          <h1 class="text-5xl font-bold">{{ msg }}</h1>
          <BaseButtons name="Rivincita" @action="resetBoard" />
        </div>
        <div v-else>
          <h1 class="text-5xl font-bold">{{ msg }}</h1>
          <BaseButtons name="Ricomincia la sfida" @action="resetGameOver" />
        </div>
    </div>
</template>

<script>
import BaseButtons from "./BaseButtons.vue"

export default {
    name : 'GameEnd',
    props:['isGameOver','msg'],
    components:{
        BaseButtons
    },
    methods:{
        resetBoard(){
            this.$emit('resetBoard')
        },
        resetGameOver(){
            this.$emit('resetGameOver')
        }
    }
}
</script>