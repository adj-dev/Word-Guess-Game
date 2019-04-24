const game = {
  start: function() {
    this.library.getRandomWord();
  },
  score: {
    current: 0,
    tries: 10,
    win: function() {
      this.current += 1;
    },
    wrongGuess: function() {
      this.tries -= 1;
    },
    reset: function() {
      this.tries = 10;
    }
  },
  library: {
    index: ['beethoven', 'liszt', 'mozart', 'chopin'],
    currentWord: [],
    getRandomWord: function() {
      let i = Math.floor(Math.random() * this.index.length);
      let word = this.index[i];
      this.setRandomWord(word);
    },
    setRandomWord: function(word) {
      this.currentWord = [];
      for (let i = 0; i < word.length; i++) {
        this.currentWord.push(word.charAt(i));
      }
    }
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
