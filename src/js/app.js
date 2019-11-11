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

model.fire('06');
