let getTitle = document.getElementById("title") 

console.log(getTitle)

let name = prompt("who is playing ?") 

getTitle.innerHTML = `${name} is playing !`


const word = document.getElementById('word');

const wrong = document.getElementById('wrong');

const wrongLettersEl = document.querySelector('#wrong p');

const backdrop = document.getElementById('backdrop');

const audio = document.getElementById('audio');

const playMusic = document.getElementById('play-btn');

const pauseBtn = document.getElementById('pause-btn');

const volumeRange = document.getElementById('volume-range');

const finalMsg = document.getElementById('final-msg');

const msgInfo = document.getElementById('msg-info');

const playBtn = document.getElementById('play');

const indication = document.getElementById('indication');

const bodyParts = document.getElementsByClassName('body-part');

const aboutBtn = document.querySelector("#about");

const gameImg = document.querySelector("#game-img");

const wordList = ["HORSE","ZIMBABWE","AFGHANISTAN","ALBANIA","ALGERIA","ANDORRA","ANGOLA","ANGUILLA","ARGENTINA","ARMENIA","ARUBA","AUSTRALIA","AUSTRIA","AZERBAIJAN","BAHAMAS","BAHRAIN","BANGLADESH","BARBADOS","BELARUS","BELGIUM","BRAZIL","BRUNEI","BULGARIA","BURKINA FASO","BURUNDI","CAMBODIA","CAMEROON","CHAD","CHILE","CHINA","COLOMBIA","CONGO","COSTA RICA","CROATIA","CUBA","CYPRUS","CZECH REPUBLIC","DENMARK","DOMINICA","DOMINICAN REPUBLIC","ECUADOR","EGYPT","ELSALVADOR","ESTONIA","ETHIOPIA","FALKLAND ISLANDS","FAROE ISLANDS","FIJI","FINLAND","FRANCE","FRENCH POLYNESIA","FRENCH WEST INDIES","GABON","GAMBIA","GEORGIA","GERMANY","GHANA","GIBRALTAR","GREECE","GREENLAND","HAITI","HONDURAS","HONG KONG","HUNGARY","ICELAND","INDIA","INDONESIA","IRAN","IRAQ","IRELAND","ISRAEL","ITALY","JAMAICA","JAPAN","JORDAN","KAZAKHSTAN","KENYA","KUWAIT","LEBANON","LIBERIA","LIBYA","LUXEMBOURG","MALAWI","MALAYSIA","MALDIVES","MALI","MALTA","MEXICO","MOLDOVA","MONACO","MONGOLIA","MONTENEGRO","MONTSERRAT","MOROCCO",,"NAMIBIA","NEPAL","NETHERLANDS","NEW CALEDONIA","NEWZEALAND","NIGER","NIGERIA","NORWAY","OMAN","PAKISTAN","PALESTINE","PANAMA","PERU","PHILIPPINES","POLAND","PORTUGAL","PUERTO RICO","QATAR",,"ROMANIA","RUSSIA","RWANDA","SAMOA","SANMARINO",,"SAUDI ARABIA","SENEGAL","SERBIA","SEYCHELLES","SIERRA LEONE","SINGAPORE","SLOVAKIA","SLOVENIA","SOUTH AFRICA","SOUTHKOREA","SPAIN","SUDAN",,"SWAZILAND","SWEDEN","SWITZERLAND","SYRIA","TAIWAN","TAJIKISTAN","TANZANIA","THAILAND","TUNISIA","TURKEY","TURKMENISTAN","UGANDA","UKRAINE","UNITEDARABEMIRATES","UNITEDKINGDOM","UZBEKISTAN","VENEZUELA","VIETNAM","VIRGIN ISLANDS","YEMEN","DOG","CAT","ELEPHANT","DOLPHIN","ANT","RAT","MOUSE","CHICKEN","COW","PIG"]


playMusic.addEventListener('click', () => {
  audio.play();
});

pauseBtn.addEventListener('click', () => {
  audio.pause();
});

volumeRange.addEventListener('input', () => {
  audio.volume = volumeRange.value;
});



let selectedWord = null;

let wrongCount = 0;

const correctLetters = [];

const wrongLetters = [];

function initializeWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const noOfLetters = selectedWord.length;
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.append(listItem);
  }
}

function displayIndication() {
  indication.classList.add('visible');

  setTimeout(() => {
    indication.classList.remove('visible');
  }, 2400);
}

function updateFigure() {
  try {
    bodyParts[wrongCount].style.display = 'block';
    wrongCount++;
  } catch (error) {}
}


function check(ev) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ev.key;
  if (
    !backdrop.classList.contains('visible') &&
    !indication.classList.contains('visible') &&
    ev.keyCode >= 65 &&
    ev.keyCode <= 90
  ) {
    if (selectedWord.includes(character)) {
      if (correctLetters.includes(character)) {
        displayIndication();
      } else {
        correctLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (wrongLetters.includes(character)) {
        displayIndication();
      } else {
        wrongLetters.push(character);
        if (!wrong.classList.contains('visible')) {
          wrong.classList.add('visible');
        }
        wrongLettersEl.textContent = `${wrongLetters.join(', ')}`;
        updateFigure();
      }
    }
  }


  function successState() {
    setTimeout(() => {
      backdrop.classList.add('visible');
      finalMsg.classList.add('visible');
      alert("You won !")
      msgInfo.textContent = 'congrats you won !';
      showCelebration();
      hideCelebration();
    }, 400);
  }
  
  function failureState() {
    setTimeout(() => {
      backdrop.classList.add('visible');
      finalMsg.classList.add('visible');
      alert("You lost")
      msgInfo.textContent = 'you have lost !';
    }, 200);
  }

  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });
  if (formedWord === selectedWord) {
    successState();
  }
  if (wrongCount >= 6) {
    failureState();
  }
}

function startNewGame() {
  selectedWord = null;
  wrongCount = 0;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  word.innerHTML = '';
  Array.from(bodyParts).forEach((value) => {
    value.style.display = 'none';
  });
  wrong.classList.remove('visible');
  backdrop.classList.remove('visible');
  finalMsg.classList.remove('visible');
  initializeWord();
}

initializeWord();

window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);



aboutBtn.addEventListener("click", () => {
  gameImg.style.display = gameImg.style.display === "none" ? "block" : "none";
});


  let countDownDate = new Date().getTime() + 10 * 60 * 1000;

let CountDown = setInterval(function() {

  let now = new Date().getTime();

  let distance = countDownDate - now;

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  let seconds = Math.floor((distance % (1000 * 60)) / 1000);


  document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(CountDown);
    document.getElementById("timer").innerHTML = "Game over ! ";
  }
}, 1000);


