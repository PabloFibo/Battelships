let randomNumb = Math.floor(Math.random() * 5);

const battelId = {
  guess: '',
  guesses: 0,
  hits: 0,
  isSunk: false,
};

const loc1 = randomNumb;
const loc2 = loc1 + 1;
const loc3 = loc2 + 1;


while (battelId.isSunk == false) {
  battelId.guess = prompt('Wybierz numer pola od 0 do 6');

  if (battelId.guess < 0 || battelId.guess > 6) {
    alert('Podaj ponownie wartość pola z przedziału od 0 do 6');
  } else {
    battelId.guesses = battelId.guesses + 1;

    if (battelId.guess == loc1 || battelId.guess == loc2 || battelId.guess == loc3) {
      alert('Trafiony!');
      battelId.hits = battelId.hits + 1;

      if (battelId.hits == 3) {
        battelId.isSunk = true;
        alert('Wygrałeś');
      }
    } else {
      alert('Pudło');
    }
  }
}

const winMsg = 'Udało ci się wygrać w' + ' ' + battelId.guesses + ' ' + 'ruchach';
alert(winMsg);
