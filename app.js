// Grabs a couple of thing
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;
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

//Card Generate Func.
const cardGenerator = () => {
  const cardData = randomize();
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

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

// async function intervalFun(str , time) {
//    setTimeout(() => console.log(str), section.style.pointerEvents = str,
//   time);
// }
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
  
  
  if(clickedCard.classList.contains("toggleCard")== true){ 
  
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
      if (playerLives === 0) {
        setTimeout(() => restrat(":( Try Again"), 1000);
      }
    }
  }

  //Run A check if we won
  if (toggleCard.length === 16) {
    setTimeout(() => restrat("YOU WON!!!"), 500);
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
  // setTimeout(() => window.alert(text) ,100 )
  setTimeout(() => location.reload(), window.alert(text), 2000);
};
cardGenerator();
