const btn = document.querySelector("#btn");
const outcome = document.querySelector("#outcome");
const trybox = document.querySelector("#tries");
const werds = document.querySelector("#pre2");
const motivationals = ["Lose", "lose", "lost", "lost the game", "Lose", "Lose", "Nope", "Failed", "Sorry", "no"];

let tries = 0;
let resetTimer;
let animTimer;

const scrambleCharOff = 500; // Math.random() < 0.5 ? 10 : 500;
const ch = () => "&#x2" + (oneOf(20) + scrambleCharOff);
const oneOf = max => Math.random() * max | 0;
const oneIn = max => oneOf(max) === 1;
const Unfinity = 50;

function scramble (el) {
  const chars = [];
  animTimer = setInterval(() => {
    for (var i = 0; i < chars.length; i++) {
      if (oneIn(20)) {
        chars[i] = ch();
      }
    }
    if (oneIn(10)) {
      chars.push(ch());
    }
    el.innerHTML = chars.join("");
  }, 1000 / 60);
}

function drawTries (tries) {
  let trystr = "";
  for (let i = 0; i < tries; i++) {
    trystr += oneIn(80) ? (oneIn(10) ? " " : ch()) : ".";
    trystr += i > 0 && i % 27 === 0 ? "<br/>" : "";
  }
  trybox.innerHTML = trystr;
}

btn.disabled = false;
btn.addEventListener("click", () => {
  btn.disabled = true;
  werds.classList.remove("flash");
  clearTimeout(resetTimer);

  scramble(outcome);

  setTimeout(() => {
    clearInterval(animTimer);

    if (tries++ > 15 && oneIn(Unfinity)) {
      document.body.classList.add("pulse");
      outcome.innerText = " You won the game ";
      btn.style.display = "none";
      return;
    }

    drawTries(tries);
    outcome.innerText = " " + motivationals[Math.random() * motivationals.length | 0] + ". ";

    btn.disabled = false;
    werds.classList.add("flash");
    resetTimer = setTimeout(() => {
      outcome.innerText = " Try your luck ";
    }, 800);

  }, Math.random() * 2000 + 200 | 0);
});
