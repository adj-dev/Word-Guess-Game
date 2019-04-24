const game = {
  start: function() {
    this.library.getRandomWord();
    this.renderWins();
    this.renderTries();
  },
  renderWins: function() {
    document.getElementById('wins').textContent = this.currentScore;
  },
  renderTries: function() {
    document.getElementById('tries').textContent = this.tries;
  },
  currentScore: 0,
  tries: 10,
  win: function() {
    this.currentScore += 1;
    this.renderWins();
  },
  wrongGuess: function() {
    this.tries -= 1;
    this.renderTries();
  },
  newRound: function() {
    this.tries = 10;
    this.renderTries();
  },
  newGame: function() {
    this.currentScore = 0;
    this.renderWins();
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

// document.onkeyup = function(e) {}

// function renderWins() {
//   document.getElementById('wins').innerText = game.score.current;
// }

// function renderTries() {
//   document.getElementById('tries').innerText = game.score.tries;
// }

// renderWins();
// renderTries();
