const view = {
  displayMessage: function(msg) {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },
  displayHit: function(locations) {
    const cell = document.getElementById(locations);
    cell.setAttribute('class', 'hit');
  },
  dispalyMiss: function(locations) {
    const cell = document.getElementById(locations);
    cell.setAttribute('class', 'miss');
  },
};

const model = {
  borderSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [{
    locations: [0, 0, 0],
    hits: ['', '', '']
  },
  {
    locations: [0, 0, 0],
    hits: ['', '', '']
  },
  {
    locations: [0, 0, 0],
    hits: ['', '', '']
  }
  ],
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('Trafiony!!!');

        if (this.isSunk(ship)) {
          view.displayMessage('Zatopiłeś mój okręt');
          this.shipSunk++;
        }
        return true;
      }
    }
    view.dispalyMiss(guess);
    view.displayMessage('Spudłowałeś');
    return false;
  },
  isSunk: function(ship) {
    for (let i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit');
      return false;
    }
    return true;
  },
  generateShipLocations: function(){
    let locations;

    for(let i = 0; i < this.numShips; i++){
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },
  generateShip: function () {
    let direction = Math.floor(Math.random() * 2);
    let row, col;

    if(direction === 1){
      row = Math.floor(Math.random() * this.borderSize);
      col = Math.floor(Math.random() * (this.borderSize - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.borderSize - this.shipLength));
      col = Math.floor(Math.random() * this.borderSize);
    }

    let newShipLocations = [];

    for(let i = 0; i < this.shipLength; i++){
      if(direction === 1){
        newShipLocations.push(row + '' + (col + i));
      } else {
        newShipLocations.push((row + i) + '' + col);
      }
    }
    return newShipLocations;
  },
  collision: function (locations) {
    for(let i = 0; i < this.numShips; i++){
      let ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
  }
};

const controller = {
  guesses: 0,
  processGuess: function(guess) {
    let locations = parseGuess(guess);

    if (locations) {
      this.guesses++;
      let hit = model.fire(locations);

      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage('Zatopiłeś wszystkie moje okręty, w' + this.guesses + ' próbach');
      }
    }
  }
};

function parseGuess(guess) {
  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  if (guess === null || guess.length !== 2) {
    alert('Musisz podać literę (od A do G) i cyfrę (od 0 do 6)');
  } else {
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert('To nie są poprawne współrzędne');
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert('Wybrałeś pole poza planszą');
    } else {
      return row + column;
    }
  }
  return null;
}

function init() {
  let fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;

  let guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

function handleFireButton() {
  let guessInput = document.getElementById('guessInput');
  let guess = guessInput.value;

  controller.processGuess(guess);
  guessInput.value = '';
}

function handleKeyPress(e){
  let fireButton = document.getElementById('fireButton');

  if (e.keyCode === 13){
    fireButton.click();
    return false;
  }
}

window.onload = init;
