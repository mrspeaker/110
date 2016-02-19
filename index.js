const btn = document.querySelector("#btn");
const outcome = document.querySelector("#outcome");
const trybox = document.querySelector("#tries");
const werds = document.querySelector("#pre2");
const twit = document.querySelector("a");

let tries = 0;
let resetTimer;
let animTimer;
const ch = (off = 500) => "&#x2" + (oneOf(20) + off);
const oneOf = max => Math.random() * max | 0;
const oneIn = max => oneOf(max) === 1;
const Minfinity = 25;
const Unfinity = 120;
const motivationals = ["Lose", "lose", "lost", "lost the game", "lose", "Lose", "Nope", "loss", "sorry", "no"];

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
  const trystr = Array.from(new Array(tries), (e, i) => {
    let str = "";
    str += oneIn(80) ? (oneIn(10) ? " " : ch()) : ".";
    str += i > 0 && i % 27 === 0 ? "<br/>" : "";
    return str;
  });
  trybox.innerHTML = trystr.join("");
}

btn.disabled = false;
btn.addEventListener("click", () => {
  btn.disabled = true;
  werds.classList.remove("flash");
  clearTimeout(resetTimer);

  scramble(outcome);

  setTimeout(() => {
    clearInterval(animTimer);

    if (tries++ > Minfinity && oneIn(Unfinity)) {
      document.body.classList.add("pulse");
      outcome.innerText = " You won the game ";
      btn.style.display = "none";
      twit.style.display = "block";
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
