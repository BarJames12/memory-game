// Grabs a couple of thing
const section = document.querySelector("section");
const movesCounter = document.getElementById("counter");
let playerMoves = 0;
let newRecrod = Boolean;

window.ondragstart = function () {
  return false;
};
// Link text
movesCounter.textContent = playerMoves;

// Stopper things
let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector(".timerDisplay");
let int = null;
console.log(timerRef.innerHTML);

const startClock = () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
};

const stopClock = () => {
  clearInterval(int);
};

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerRef.innerHTML = `${m}:${s}:${ms}`;
}

let gameResult = {
  playerMoves: playerMoves,
  playerTime: timerRef.innerHTML,
};

//Generate the data

const getData = () => [
  { imgSrc: "./photos/apple.png", name: "apple" },
  { imgSrc: "./photos/broccoli.png", name: "broccoli" },
  { imgSrc: "./photos/fruit.png", name: "fruit" },
  { imgSrc: "./photos/grapes.png", name: "grapes" },
  { imgSrc: "./photos/kiwi.png", name: "kiwi" },
  { imgSrc: "./photos/lemon.png", name: "lemon" },
  { imgSrc: "./photos/strawberry.png", name: "strawberry" },
  { imgSrc: "./photos/watermelon.png", name: "watermelon" },
  { imgSrc: "./photos/apple.png", name: "apple" },
  { imgSrc: "./photos/broccoli.png", name: "broccoli" },
  { imgSrc: "./photos/fruit.png", name: "fruit" },
  { imgSrc: "./photos/grapes.png", name: "grapes" },
  { imgSrc: "./photos/kiwi.png", name: "kiwi" },
  { imgSrc: "./photos/lemon.png", name: "lemon" },
  { imgSrc: "./photos/strawberry.png", name: "strawberry" },
  { imgSrc: "./photos/watermelon.png", name: "watermelon" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};
randomize();

const firstHint = () => {
  card.classList.toggle("toggleCard");
  setTimeout(() => card.classList.remove("toggleCard"), 500);
};

const saveGameResult = () => {
  gameResult.playerMoves = playerMoves;
  gameResult.playerTime = timerRef.innerHTML;
  localStorage.setItem("playerRecord", JSON.stringify(gameResult));
};

const gettingBestTime = () => {
  let highScore = localStorage.getItem("playerRecord");
  const highScoreDisplay = document.getElementById("highScoreDisplay");

  highScore = JSON.parse(highScore);
  if (highScore == null) {
    return (highScoreDisplay.textContent = "No score to beat");
  }

  highScoreDisplay.textContent = highScore.playerTime + " " + "in " + highScore.playerMoves + " " + "Moves";
};

gettingBestTime();

const checkPlayerRecord = (currentMoves, currentTime) => {
  let playerRecord = localStorage.getItem("playerRecord");
  playerRecord = JSON.parse(playerRecord);

  if (playerRecord == null) {
    saveGameResult();
    return;
  }

  let savedMoves = playerRecord.playerMoves;
  let savedTime = playerRecord.playerTime;

  if (savedTime > currentTime) {
    gameResult.playerTime = currentTime;
    gameResult.playerMoves = currentMoves;
    localStorage.setItem("playerRecord", JSON.stringify(gameResult));
    newRecrod = true;
  }
  // else if (savedMoves > currentMoves) {
  //   gameResult.playerMoves = currentMoves;
  //   localStorage.setItem("playerRecord", JSON.stringify(gameResult));
  // }
};

// const heart = document.getElementsByClassName("heart");
//   const heartImg = document.createElement("img");
//   heart.append(heartImg)

// const createHeart = () => {
//   let heartSrc = "./photos/like.png";
//   const hearts = document.getElementsByClassName("heart-span");
//   let newHeart = document.createElement("img");
//   hearts[0].append(newHeart);
//   newHeart.setAttribute("class", "heart");
//   newHeart.src = heartSrc;
// };

// const updateHearts = () => {
//   for (let i = 0; i < playerLives; i++) {
//     createHeart();
//   }
// };

//Card Generate Func.
const cardGenerator = () => {
  const cardData = randomize();
  // updateHearts();
  console.log(cardData);

  //generate the HTML
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    //Attach te info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    //Attach the card to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    setTimeout(() => {
      card.classList.toggle("toggleCard");
      card.style.pointerEvents = "none";
    }, 200);

    setTimeout(() => {
      card.classList.toggle("toggleCard");
      card.style.pointerEvents = "all";
    }, 1500);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

async function intervalFun(str, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      section.style.pointerEvents = str;
    }, time);
  });
}
//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  let currentMoves = (gameResult.playerMoves = playerMoves);
  let currnetTime = (gameResult.playerTime = timerRef.innerHTML);
  startClock();

  if (clickedCard.classList.contains("toggleCard") == true) {
    clickedCard.style.pointerEvents = "none";
  }

  // Logic
  if (flippedCards.length === 2) {
    intervalFun("none", 100);
    intervalFun("all", 1200);

    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong!");

      playerMoves++;
      movesCounter.textContent = playerMoves;
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "all";
        setTimeout(() => card.classList.remove("toggleCard"), 800);
      });
    }
  }

  //Run A check if we won
  if (toggleCard.length === 16) {
    stopClock();
    checkPlayerRecord(currentMoves, currnetTime);
    let finishTitle = String;
    if (newRecrod === true) {
      finishTitle = "Hugee! New Highscore!!";
    } else {
      finishTitle = "Nice!";
    }
    setTimeout(
      () =>
        Swal.fire({
          title: finishTitle,
          text: `You did it in ${timerRef.innerHTML} sec and ${playerMoves} moves`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            restrat();
          }
        }),
      500
    );
  }
};

//Restrat
const restrat = (text) => {
  // let cardData = randomize();
  // let faces = document.querySelectorAll(".face");
  // let cards = document.querySelectorAll(".card");
  // section.style.pointerEvents = "none";
  // cardData.forEach((item, index) => {
  //   cards[index].classList.remove("toggleCard");
  //   //Randomize
  //   setTimeout(() => {
  //     cards[index].style.pointerEvent = "all";
  //     faces[index].src = item.imgSrc;
  //     cards[index].setAttribute("name", item.name);
  //     section.style.pointerEvents = "all";
  //   }, 1000);
  // });
  // playerLives = 6;
  // playerLivesCount.textContent = playerLives;
  // // setTimeout(() => window.alert(text) ,100 )
  location.reload();
};
cardGenerator();
