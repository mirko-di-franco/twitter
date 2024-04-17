//collegamenti
let registerBtn = document.querySelector("#registerBtn");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let showPassword = document.querySelector("#showPassword");
let formControl = document.querySelectorAll(".form-control")
let divPassword = document.querySelector("div.form-control");

//errori
let usernameError = document.querySelector("#usernameError");
let passwordError = document.querySelector("#passwordError");

//regex
const regexUSERNAME = /^[a-zA-Z0-9]{4,15}$/;
const regexPASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//funzioni
username.addEventListener("keyup", validazioneUsername);
password.addEventListener("keyup", ValidazionePassword);
showPassword.addEventListener("click", toShowPassword);
registerBtn.addEventListener("submit", aggiuntaUtente);

function validazioneUsername() {
  console.log(username.value.length, "char username")
  if (regexUSERNAME.test(username.value)) {
    usernameError.textContent = "";
    usernameError.classList.remove("text-danger");
    usernameError.classList.add("text-success");
    username.classList.remove("input-error");
    username.classList.add("input-correct");
    return true;
  } else if (username.value.length < 4) {
    usernameError.textContent = "L'username deve contenere minimo 4 caratteri"
  } else if (username.value.length > 15) {
    usernameError.textContent = "L'username deve contenere massimo 15 caratteri"
  } else {
    usernameError.textContent = "L'username non può contenere caratteri speciali"
  }

  if (username.value.length < 4 || username.value.length > 15 || !regexUSERNAME.test(username.value)) {
    usernameError.classList.remove("text-success");
    usernameError.classList.add("text-danger");
    username.classList.remove("input-correct");
    username.classList.add("input-error");
    console.log(regexUSERNAME.test(username.value));
  }
}


function ValidazionePassword() {
  if (regexPASSWORD.test(password.value)) {
    passwordError.innerHTML = "";
    passwordError.classList.remove("text-danger");
    passwordError.classList.add("text-success");
    divPassword.classList.remove("input-error");
    divPassword.classList.add("input-correct");
    return true;
  } else {
    passwordError.innerHTML = `<li>La password deve contenere:</li>
    <li>Almeno un carattere in maiuscolo</li>
    <li>Almeno un carattere in minuscolo</li>
    <li>Almeno un numero</li>
    <li>Almeno un carattere speciale</li>`;

    passwordError.classList.remove("text-success");
    passwordError.classList.add("text-danger");
    divPassword.classList.remove("input-correct");
    divPassword.classList.add("input-error");
  }
}


function toShowPassword() {
  if (password.type == "text") {
    password.type = "password";
  } else {
    password.type = "text";
  }
}


function Utente(username, password, tweets, avatar) {
  this.username = username;
  this.password = password;
  this.tweets = tweets;
  this.avatar = avatar;
}

function aggiuntaUtente(event) {
  if (validazioneUsername() && ValidazionePassword()) {
    console.log(validazioneUsername())
    console.log(ValidazionePassword())
    let nuovoUtente = new Utente(username.value, password.value, [], "");

    localStorage.setItem("Accesso", JSON.stringify(nuovoUtente));
    console.log(localStorage.setItem("Accesso", JSON.stringify(nuovoUtente)), "successo");
  } else {
    event.preventDefault();
    console.log("accesso negato");
  }
}

