<template>
    <div>
        <BaseButtons name="Classifica" @action="showStandings"/>
        <div v-if="isStandings" class="-mb-36 absolute inset-0 bg-slate-300 flex flex-col justify-center items-center">
            <h1 class="text-6xl font-bold text-red-600 mb-12">Classifica:</h1>
            <h3 class="text-4xl m-3">{{ scorePlayerOne }}</h3>
            <h3 class="text-4xl m-3">{{ scorePlayerTwo }}</h3>
            <BaseButtons name="Torna al gioco" @action="showStandings" />
        </div>
    </div>
</template>

<script>
import BaseButtons from './BaseButtons.vue';

export default {
    name: "GameStandings",
    props:['playerOne','playerTwo'],
    components: {
        BaseButtons,
    },
    data: () => {
        return{
            isStandings: false
        }
    },
    methods:{
        showStandings(){
            this.isStandings = !this.isStandings
        }
    },
    computed:{
        scorePlayerOne() {
            return `${this.playerOne.name}: ${this.playerOne.bigScore}`;
        },
        scorePlayerTwo() {
            return `${this.playerTwo.name}: ${this.playerTwo.bigScore}`;
        },
    },

}
</script>