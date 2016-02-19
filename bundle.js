(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var btn = document.querySelector("#btn");
var outcome = document.querySelector("#outcome");
var trybox = document.querySelector("#tries");
var werds = document.querySelector("#pre2");
var motivationals = ["Lose", "lose", "lost", "lost the game", "Lose", "Lose", "Nope", "Failed", "Sorry", "no"];

var tries = 0;
var resetTimer = undefined;
var animTimer = undefined;

var scrambleCharOff = 500; // Math.random() < 0.5 ? 10 : 500;
var ch = function ch() {
  return "&#x2" + (oneOf(20) + scrambleCharOff);
};
var oneOf = function oneOf(max) {
  return Math.random() * max | 0;
};
var oneIn = function oneIn(max) {
  return oneOf(max) === 1;
};
var Unfinity = 50;

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
  var trystr = "";
  for (var i = 0; i < tries; i++) {
    trystr += oneIn(80) ? oneIn(10) ? " " : ch() : ".";
    trystr += i > 0 && i % 27 === 0 ? "<br/>" : "";
  }
  trybox.innerHTML = trystr;
}

btn.disabled = false;
btn.addEventListener("click", function () {
  btn.disabled = true;
  werds.classList.remove("flash");
  clearTimeout(resetTimer);

  scramble(outcome);

  setTimeout(function () {
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
    resetTimer = setTimeout(function () {
      outcome.innerText = " Try your luck ";
    }, 800);
  }, Math.random() * 2000 + 200 | 0);
});

},{}]},{},[1]);
