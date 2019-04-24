const game = {
  startGame: function() {},
  wins: 0,
  tries: 10,
  words: ['pasta', 'spaghetti', 'linguini'],
  randomWord: function() {
    let n = Math.floor(Math.random() * this.words.length);
    let word = this.words[n];
    // this.convertStringToArray(word);
    this.convertStringToArray.chosenWord = word;
  },
  // chosenWord: [],
  // convertStringToArray: function(word) {
  //   console.log(word);
  //   for (let i = 0; i < word.length; i++) {
  //     chosenWord.push(word.charAt(i));
  //   }
  // },
  convertStringToArray: {
    chosenWord: String,
    wordArray: [],
    convert: function(word) {
      for (let i = 0; i < word.length; i++) {
        this.wordArray.push(word.charAt(i));
      }
    }
  },
  incorrectLetters: [],
  winGame: function() {
    this.wins += 1;
    renderWins();
  },
  incorrectGuess: function() {
    this.tries -= 1;
  },
  reset: function() {
    this.wins = 0;
    this.tries = 10;
  }
};

document.addEventListener('keypress', e => {
  if (e) {
    console.log(e);
  }
});

function renderWins() {
  document.getElementById('wins').innerText = game.wins;
}

renderWins();
