<template>
  <div class="w-[360px]">
    <div v-if="!isRoundOver"> 
      <GameInfo :nameOne="player1.name" :nameTwo="player2.name" :roundScore1="roundScore1" :roundScore2="roundScore2" :isTurn="isTurn" @editNameOne="editNameOne" @editNameTwo="editNameTwo"  />

      <div class="flex select-none bg-gray-200" v-for="(row, y) in table" :key="y">
        <div
          class="h-28 w-32 border-2 border-zinc-900 text-8xl flex items-center justify-center hover:bg-green-200" :class="[table[y][x] !== '' ? 'cursor-not-allowed hover:bg-red-100' : 'cursor-pointer']" @click="selectCell(x, y)" v-for="(cell, x) in row" :key="x">
          <h2>{{ cell }}</h2>
        </div>
      </div>
      <h3 class="mt-10 text-2xl">Pareggi: {{ isDrow }}</h3>
      <GameStandings :playerOne="player1" :playerTwo="player2" class="mb-10" />
    </div>

    <GameEnd v-else :isGameOver="isGameOver" :msg="msg" @resetBoard="resetBoard" @resetGameOver="resetGameOver" />
  </div>
</template>

<script>
import GameInfo from "../src/components/GameInfo.vue"
import BaseButtons from "../src/components/BaseButtons.vue";
import GameStandings from "../src/components/GameStandings.vue";
import GameEnd from "../src/components/GameEnd.vue";

export default {
  name: "Game",
  components: {
    GameInfo,
    BaseButtons,
    GameStandings,
    GameEnd,
  },
  data() {
    return {
      table: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      solutions: [
        //orrizontali
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],
        //verticali
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        //oblique
        ["2", "4", "6"],
        ["0", "4", "8"],
      ],
      currentPlayer: "X",
      isRoundOver: false,
      isGameOver: false,
      msg: "",
      player1: {
        name: "",
        score: 0,
        bigScore: 0,
      },
      player2: {
        name: "",
        score: 0,
        bigScore: 0,
      },
      isDrow: 0,
      showStandings: true,
    };
  },
  mounted(){
    const queryPlayerOneName = this.$route.query.player1
    const queryPlayerTwoName = this.$route.query.player2

    if(queryPlayerOneName === undefined || queryPlayerTwoName === undefined){
      this.$router.push('/')
    }
    this.player1.name = queryPlayerOneName
    this.player2.name = queryPlayerTwoName
  },

  methods: {
    seeClass() {
      this.showStandings = true;
    },

    backToGame() {
      this.showStandings = false;
    },

    selectCell(x, y) {
      //come fosse riga.celle = selzioniamo un array di stringhe
      if (this.table[y][x] !== "") {
        return;
      }
      this.table[y][x] = this.currentPlayer;
      this.isWinner(this.table.flat()); //rende l'array monodimensionale
      if (!this.isRoundOver) {
        this.switchUser(); //richiamiamo la funzione
      }
    },

    switchUser() {
      //this.current se è uguale a X cambialo in O se no this.current è X
      this.currentPlayer === "X"
        ? (this.currentPlayer = "O")
        : (this.currentPlayer = "X"); // ? se è vero : se no
      // console.log(this.currentPlayer)
    },
    
    //dovremmo fargli ricevere la nostra table.flat quindi tante celle
    isWinner(cells) {
      //unificare i vari array in un unico array perchè prima erano 3 diversi array con this.table.flat()
      this.solutions.forEach((set) => {
        set.every((el) => cells[el] === this.currentPlayer)
          ? (this.isRoundOver = true)
          : this.isRoundOver;
      });

      if (this.currentPlayer === "X") {
        this.msg = `Grande ${this.player1.name}! Hai vinto la partita!`;
      } else {
        this.msg = `Grande ${this.player2.name}! Hai vinto la partita!`;
      }

      if (cells.every((el) => el != "")) {
        this.isRoundOver = true;
        this.isDrow++;
        this.msg = `La partita è finita in pareggio!`;
      } else {
        if (this.isRoundOver) {
          if (this.currentPlayer === "X") {
            this.player1.score++;
          } else {
            this.player2.score++;
          }
        }
      }

      if (this.player1.score === 3) {
        this.isRoundOver = true;
        this.isGameOver = true;
        this.msg = `${this.player1.name} sei arrivato al massimo punteggio!`;
        this.player1.bigScore++;
      } else if (this.player2.score === 3) {
        this.isRoundOver = true;
        this.isGameOver = true;
        this.msg = `${this.player2.name} sei arrivato al massimo punteggio!`;
        this.player2.bigScore++;
      }
    },
    
    resetBoard() {
      this.isRoundOver = false;
      this.table = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]
    },
    resetGameOver(){
      this.isRoundOver = false;
      this.table = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
        this.player1.score = 0, 
        this.player2.score = 0;
        this.isDrow = 0;
        this.isGameOver = false;
    },

    editNameOne(newName){
      this.player1.name = newName
    },
    editNameTwo(newName){
      this.player2.name = newName 
    }
  },
  computed: {
    roundScore1() {
      return `${this.player1.name}: ${this.player1.score}`;
    },
    roundScore2() {
      return `${this.player2.name}: ${this.player2.score}`;
    },
    isTurn() {
      if (this.currentPlayer === "X") {
        return this.player1.name;
      } else {
        return this.player2.name;
      }
    },
  },
};
</script>
