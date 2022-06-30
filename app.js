// Grabs a couple of thing
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 999;
window.ondragstart = function () {
  return false;
};
// Link text
playerLivesCount.textContent = playerLives;

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

// const heart = document.getElementsByClassName("heart");
//   const heartImg = document.createElement("img");
//   heart.append(heartImg)

const createHeart = () => {
  let heartSrc = "./photos/like.png";
  const hearts = document.getElementsByClassName("heart-span");
  let newHeart = document.createElement("img");
  hearts[0].append(newHeart);
  newHeart.setAttribute("class", "heart");
  newHeart.src = heartSrc;
};

const fadeOutHeart = () => {
  newHeart.classList.toggle("fade");
};
const updateHearts = () => {
  for (let i = 0; i < playerLives; i++) {
    createHeart();
  }
};

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
      console.log(str);
    }, time);
  });
}
//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  startClock()
  
  if (clickedCard.classList.contains("toggleCard") == true) {
    clickedCard.style.pointerEvents = "none";

    console.log("testtt");
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
      // setTimeout(() => card.classList.remove("toggleCard"),
      //    500);
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "all";
        setTimeout(() => card.classList.remove("toggleCard"), 800);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      // updateHearts();
      if (playerLives === 0) {
        stopClock();

        setTimeout(
          () =>
            Swal.fire({
              title: "Oops!",
              text: "Please try again",
              icon: "error",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                restrat();
              }
            }),
          500
        );
      }
    }
  }

  //Run A check if we won
  if (toggleCard.length === 16) {
    stopClock();
    setTimeout(
      () =>
        Swal.fire({
          title: "Good Job!",
          text: `You did it in ${timerRef.innerHTML} sec`,
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

// document.getElementById("resetTimer").addEventListener("click", () => {
//   clearInterval(int);
//   [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
//   timerRef.innerHTML = "00 : 00 : 00 : 000 ";
// });

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}
