const view = {
  displayMessage: function(msg) {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    const cell = document.getElementById(location);
    cell.setAttribute('class', 'hit');
  },
  dispalyMiss: function(location) {
    const cell = document.getElementById(location);
    cell.setAttribute('class', 'miss');
  },
};

const model = {
  borderSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,
  ships: [{
      location: ['06', '16', '26'],
      hits: ['', '', '']
    },
    {
      location: ['24', '34', '44'],
      hits: ['', '', '']
    },
    {
      location: ['10', '11', '12'],
      hits: ['', '', '']
    }
  ],
  fire: function(guess) {
    for (let i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.location.indexOf(guess);
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
  }
};

const controller = {
  guesses: 0,
  processGuess: function(guess) {
    let location = parseGuess(guess);
    if (location) {
      this.guesses++;
      let hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage('Zatopiłeś wszystkie moje okręty, w' + this.guesses + ' próbach');
      }
    }
  }
};

function parseGuess(guess) {
  let alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
  if (guess === null || guess.length !== 2) {
    alert('Musisz podać literę (od A do F) i cyfrę (od 0 do 5)');
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
}

function handleFireButton(){

}

window.onload = init;
