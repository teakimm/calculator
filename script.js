let equation = {
  a: undefined,
  sign: undefined,
  b: undefined
};
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a , b) {
  return a / b;
}

function operate(a, operator, b) {
  intA = parseInt(a);
  intB = parseInt(b);
  if(operator === "+") {
    return add(intA, intB);
  } else if(operator === "-") {
    return subtract(intA, intB);
  } else if(operator === "*") {
    return multiply(intA, intB);
  } else {
    return divide(intA, intB);
  }
}
let inputs = "";
const numbers = document.querySelectorAll(".number");
numbers.forEach(e => e.addEventListener("click", e => {
  let number = e.target.id;
  if((equation.a === undefined) && (equation.sign === undefined)) {
    equation.a = number;
    inputs += number;
    document.querySelector(".display").innerHTML = number;
  } else if((equation.a != undefined) && (equation.sign === undefined)) {
    equation.a += number;
    inputs += number;
    document.querySelector(".display").innerHTML += number;
  } else if((equation.sign != undefined) && (equation.a != undefined) && (equation.b === undefined)) {
    equation.b = number;
    inputs += number;
    document.querySelector(".display").innerHTML += number;
  } else {
    equation.b += number;
    inputs += number;
    document.querySelector(".display").innerHTML += number;
  }
}));
const operator = document.querySelectorAll(".operator");
operator.forEach(e => e.addEventListener("click", e => {
  let sign = e.target.id
  if(equation.a != undefined) {
    equation.sign = sign;
    inputs += sign;
    document.querySelector(".display").innerHTML += sign;
    console.log(equation);
  }
}));

const evaluate = document.querySelector(".evaluate");
evaluate.addEventListener("click", e => {
  document.querySelector(".history").innerHTML = inputs;
  document.querySelector(".display").innerHTML = operate(equation.a, equation.sign, equation.b);
  inputs = String(operate(equation.a, equation.sign, equation.b));
  equation.a = String(operate(equation.a, equation.sign, equation.b));
  equation.sign = undefined;
  equation.b = undefined;
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", e => {
  equation = {
    a: undefined,
    sign: undefined,
    b: undefined
  };
  document.querySelector(".history").innerHTML = "";
  document.querySelector(".display").innerHTML = 0;
});

const del = document.querySelector(".del");
del.addEventListener("click", e => {
  if((equation.a != undefined) && (equation.sign === undefined)) {
    if(inputs.length === 1) {
      equation.a = undefined;
      inputs = inputs.slice(0,-1);
      document.querySelector(".display").innerHTML = "0";
    } else {
      equation.a = equation.a.slice(0,-1);
      inputs = inputs.slice(0,-1);
      document.querySelector(".display").innerHTML = inputs;
    }
  } else if((equation.a != undefined) && (equation.b === undefined) && (equation.sign != undefined)) {
    equation.sign = "";
    inputs = inputs.slice(0,-1);
    document.querySelector(".display").innerHTML = inputs;
  } else {
    equation.b = equation.b.slice(0,-1);
    inputs = inputs.slice(0,-1);
    document.querySelector(".display").innerHTML = inputs;
  }
});