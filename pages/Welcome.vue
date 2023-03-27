<template>
    <div>
        <h1 class="text-4xl text-red-600 mt-5 mb-5 xl:-mt-64 xl:text-6xl">Inserite i vostri nomi!</h1>
        <h3 class="text-red-500 text-xl italic underline underline-offset-4 mb-5 ">{{ errorMsg }}</h3>
        <div class="space-y-8 p-5">
            <div>
                <label class="mr-5 text-lg font-bold" for="player1">Giocare uno:</label>
                <input type="text" id="player1" placeholder="Nome primo giocatore" class="rounded-lg border-2 border-stone-900 p-2 w-80" v-model.trim="playerOne" maxlength="10" @keyup.enter="confirmNames"/>
            </div>
            <div>
                <label class="mr-5 text-lg font-bold" for="player2">Giocare uno:</label>
                <input type="text" id="player2" placeholder="Nome secondo giocatore" class="rounded-lg border-2 border-stone-900 p-2 w-80" v-model.trim="playerTwo" maxlength="10" @keyup.enter="confirmNames"/>
            </div>
        </div>
    
        <BaseButtons name="Conferma" @action="confirmNames" />
        <h3 class="mt-12 text-left ml-7 text-xl text-red-500 ">REGOLAMENTO:</h3>
        <p class="text-left ml-7 text-lg">Ogni vittoria vale <span class="font-bold text-xl">1</span> punto, vince chi arriva prima a <span class="font-bold text-xl">3</span> punti !!!</p>
        <h1 class="text-5xl font-bold text-red-600 mt-20">Buon divertimento!!!</h1>
    </div>
</template>

<script>
import BaseButtons from "../src/components/BaseButtons.vue";

export default {
    name: 'Welcome',
    data: () => {
        return{
            playerOne: '',
            playerTwo: '',
            errorMsg: null,
        }
    },
    components:{
        BaseButtons,
    },
    methods:{
        confirmNames(){
        this.errorMsg = null;
        
        if(this.playerOne === "" || this.playerTwo === ""){
            return this.errorMsg = `I nomi inseriti non sono validi!`
        }else if(this.playerOne === this.playerTwo){
            return this.errorMsg = `I nomi inseriti non possono essere uguali`
        }

        const query = `?player1=${this.playerOne}&player2=${this.playerTwo}`

        this.$router.push('/game' + query)

        },
    }
}
</script>