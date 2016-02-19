(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var btn = document.querySelector("#btn");
var outcome = document.querySelector("#outcome");
var trybox = document.querySelector("#tries");
var werds = document.querySelector("#pre2");
var twit = document.querySelector("a");

var tries = 0;
var resetTimer = undefined;
var animTimer = undefined;
var ch = function ch() {
  var off = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];
  return "&#x2" + (oneOf(20) + off);
};
var oneOf = function oneOf(max) {
  return Math.random() * max | 0;
};
var oneIn = function oneIn(max) {
  return oneOf(max) === 1;
};
var Minfinity = 25;
var Unfinity = 120;
var motivationals = ["Lose", "lose", "lost", "lost the game", "Lose", "Lose", "Nope", "loss", "sorry", "no"];

function scramble(el) {
  var chars = [];
  animTimer = setInterval(function () {
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

function drawTries(tries) {
  var trystr = Array.from(new Array(tries), function (e, i) {
    var str = "";
    str += oneIn(80) ? oneIn(10) ? " " : ch() : ".";
    str += i > 0 && i % 27 === 0 ? "<br/>" : "";
    return str;
  });
  trybox.innerHTML = trystr.join("");
}

btn.disabled = false;
btn.addEventListener("click", function () {
  btn.disabled = true;
  werds.classList.remove("flash");
  clearTimeout(resetTimer);

  scramble(outcome);

  setTimeout(function () {
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
    resetTimer = setTimeout(function () {
      outcome.innerText = " Try your luck ";
    }, 800);
  }, Math.random() * 2000 + 200 | 0);
});

},{}]},{},[1]);
