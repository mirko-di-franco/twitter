const URL_ENDPOINTS = "http://localhost:3000/utenti";

let d = luxon.DateTime.now();

//utente local storage
let utenteLoggato = JSON.parse(localStorage.getItem("Accesso"));
console.log(utenteLoggato);


//collegamenti
let textArea = document.querySelector("#textArea");
let remainingChar = document.querySelector("#remainingChar");
let singleChar = document.querySelector("#singleChar");
let postsWrapper = document.querySelector("#postsWrapper");
let formTweet = document.querySelector("#formTweet");
let userNickname = document.querySelector("#userNickname");
let logout = document.querySelector("#logout");
let profilePic = document.querySelector(".profilePic");
let numberTweet = document.querySelector(".number");

//funzioni
textArea.addEventListener("input", validazioneTweet);
formTweet.addEventListener("submit", CreazioneTweetEStampo);
logout.addEventListener("submit", logoutUser);


userNickname.innerHTML = utenteLoggato.username;
profilePic.src = "https://source.unsplash.com/50x50?avatar";

numberTweet.innerHTML = utenteLoggato.tweets.length;


function validazioneTweet() {
  const char_Max = 50;

  if (textArea.value.length > char_Max) {
    textArea.value = textArea.value.substr(0, char_Max);
  }

  remainingChar.textContent = char_Max - textArea.value.length;

  if (textArea.value.length == 49) {
    singleChar.textContent = "e";
  } else {
    singleChar.textContent = "i";
  }
}


// funzioni tweet

function Tweet(tweet, date) {
  this.tweet = tweet;
  this.date = date;
}

function newTweet() {
  let nuovoTweet = new Tweet(textArea.value, orario())
  utenteLoggato.tweets.unshift(nuovoTweet);
  utenteLoggato.avatar = profilePic.src;
  localStorage.setItem("Accesso", JSON.stringify(utenteLoggato));

  console.log(utenteLoggato);

}


function stampaTweets() {
  if (utenteLoggato.tweets.length < 1) {
    postsWrapper.innerHTML += `<div class="coloreBgTweet p-3 border rounded-2 mx-2"><p class="m-0">Scrivi il tuo tweet nella casella qui sopra e postalo qui!</p></div>`;
  } else {

    utenteLoggato.tweets.forEach(el => {
      postsWrapper.innerHTML += `<div class="coloreBgTweet p-3 mb-3 border rounded-2 mx-2"><p class="m-0">[${el.date}] ${utenteLoggato.username}</p>
      <p class="">${el.tweet}</p></div>
      `
    })
  };
};

stampaTweets()

function CreazioneTweetEStampo() {
  newTweet();
  stampaTweets();
}


//funzione orario
function orario() {
  let orarioFormattato = d.toFormat("HH:mm");
  console.log(orarioFormattato);

  return orarioFormattato;
}





function logoutUser() {
  fetch(URL_ENDPOINTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(utenteLoggato)
  })
  localStorage.clear();
}