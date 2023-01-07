<template>
    <h1 class="text-7xl text-red-600 mb-16 font-bold ">TikTok Toe</h1>
    <div class="h-1 mb-14 flex justify-between">
      <div>
        <div v-if="!editPlayerOne" class="flex">
          <h3 class="float-left text-3xl">
            {{ roundScore1 }}
          </h3>
          <img class="float-left ml-3" src="../assets/image/edit.svg" @click="toggleNameOne" />
        </div>
        <input placeholder="Modifica il nome" v-else type="text" v-model.trim="newNamePlayerOne" @keyup.enter="confirmEditNameOne" maxlength="10" class="rounded-lg border-2 border-stone-900 p-2 w-40">
      </div>

      <div>
        <div v-if="!editPlayerTwo" class="flex">
            <h3 class="float-right text-3xl">
            {{ roundScore2 }}
          </h3>
          <img class="float-left ml-3" src="../assets/image/edit.svg" @click="toggleNameTwo" />
        </div>
        <input v-else placeholder="Modifica il nome"  type="text" v-model.trim="newNamePlayerTwo" @keyup.enter="confirmEditNameTwo" maxlength="10" class="rounded-lg border-2 border-stone-900 p-2 w-40">
      </div>
    </div>
    <h5 class="text-lg mb-9 italic">{{ isTurn }} è il tuo turno...</h5>
</template>

<script>

export default {
    name : "GameInfo",
    data(){
        return{
            editPlayerOne : false,
            editPlayerTwo : false,
            newNamePlayerOne : "",
            newNamePlayerTwo : "",
        }
    },
    props: ['nameOne','nameTwo','roundScore1','roundScore2','isTurn'],
    methods: {
        toggleNameOne(){
          this.editPlayerOne = !this.editPlayerOne
        },
        toggleNameTwo(){
          this.editPlayerTwo = !this.editPlayerTwo
        },
        confirmEditNameOne(){
            if(this.newNamePlayerOne === "" || this.newNamePlayerOne === this.nameTwo){
                return
            }else{
                this.$emit('editNameOne', this.newNamePlayerOne)
                this.newNamePlayerOne = ''
                this.toggleNameOne()
            }
        },
        confirmEditNameTwo(){
            if(this.newNamePlayerTwo === "" || this.newNamePlayerTwo === this.nameOne){
                return
            }else{
                this.$emit('editNameTwo', this.newNamePlayerTwo)
                this.newNamePlayerTwo = ''
                this.toggleNameTwo()
            }
            
        },
    },
}
</script>