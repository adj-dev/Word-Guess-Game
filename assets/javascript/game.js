class Game {
  constructor() {
    this.running = false;
    this.hiddenWord = '';
    this.currentScore = 0;
    this.tries = 10;
    this.currentWord = this.chooseWord();
    this.library = ['mozart', 'beethoven', 'chopin', 'bach', 'haydn'];
    this.wrongLetters = [];
    this.gameVisible = false;

    // hide game-play div before game-play (makes sense...)
    document.getElementById('game-play').style.display = 'none';

    // Set up event listener -- this will act as the 'control panel' for the game
    document.onkeyup = e => {
      let { key } = e;

      // Main control switch
      if (this.running === false) {
        this.running = true;
        this.toggleDivs();
        this.chooseWord();
      } else if (!key.search(/[A-Za-z]/) && key.length === 1) {
        this.checkGuess(key, this.currentWord);
      } else {
        return;
      }

      // Checks if an entire word has been revealed.
      if (this.hiddenWord == this.currentWord) {
        this.winsRound();
        this.resetTries();
      }

      if (this.tries === 0) {
        this.gameOver();
        this.resetGame();
      }

      // Re-renders the elements to update data after every keypress
      this.renderGame();
    };
  }

  // Increases the game points by 1
  winsRound() {
    this.currentScore += 1;
    this.chooseWord();
    this.wrongLetters = [];
  }

  // Resets the "try" count
  resetTries() {
    this.tries = 10;
  }

  // Sends a 'Game Over' message
  gameOver() {
    alert(`Game over! You won a total of ${this.currentScore} rounds!`);
    this.toggleDivs();
  }

  // Resets all points
  resetGame() {
    this.currentScore = 0;
    this.resetTries();
  }

  // Shows the game-play div and hides the game-message
  toggleDivs() {
    if (!this.gameVisible) {
      this.gameVisible = true;
      document.getElementById('game-play').style.display = 'flex';
      document.getElementById('game-message').style.display = 'none';
    } else {
      this.gameVisible = false;
      document.getElementById('game-play').style.display = 'none';
      document.getElementById('game-message').style.display = 'block';
    }
  }

  // Checks the guessed letter against the chosen word
  checkGuess(key, currentWord) {
    // Convert the hiddenWord string to an array
    let hiddenWordArray = this.hiddenWord.split('');

    // if the guessed letter is in currentWord inject it into the hidden word array
    for (let i = 0; i < currentWord.length; i++) {
      if (key === currentWord[i]) {
        hiddenWordArray[i] = key;
      }
    }

    let repeatLetter = this.checkGuessHelper(key);

    // Push a letter into the wrongLetters array if it doesn't match anything
    if (this.hiddenWord === hiddenWordArray.join('') && !repeatLetter) {
      this.wrongLetters.push(key);

      // Takes away a "try" (because it's an incorrect guess and those are the rules, man!)
      this.tries -= 1;
    } else if (repeatLetter) {
      return;
    }

    // Convert hidden word array back into a string and save to object
    this.hiddenWord = hiddenWordArray.join('');
  }

  // Helper function that checks for repeat letters
  checkGuessHelper(key) {
    const letter = item => {
      return item === key;
    };

    // Also checks the hidden word
    if (this.hiddenWord.search(key) !== -1) {
      return true;
    }

    // Return a boolean indicating whether letter is a repeat in wrongLetters array
    return this.wrongLetters.find(letter) ? true : false;
  }

  // Select a random word from the library and set it as the current word
  chooseWord() {
    if (this.library) {
      let i = Math.floor(Math.random() * this.library.length);
      this.currentWord = this.library[i];

      // Send chosen word over to utility function for processing
      this.hideWord(this.library[i]);
    }
  }

  // Renders out the game data
  renderGame() {
    document.getElementById('wins').textContent = this.currentScore;
    document.getElementById('tries').textContent = this.tries;
    document.getElementById('word').textContent = this.hiddenWord;
    document.getElementById('wrong-letters').textContent = this.wrongLetters;
  }

  // Takes the chosen word and creates a new string of dashes
  hideWord(word) {
    let hiddenWord = '';

    for (let i = 0; i < word.length; i++) {
      hiddenWord += '-';
    }

    this.hiddenWord = hiddenWord;
  }
}

const game = new Game();
