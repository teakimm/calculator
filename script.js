let equation = {
  a: "0",
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

let inputs = "";
let repeat = false;

function operate(a, operator, b) {
  intA = parseFloat(a);
  intB = parseFloat(b);
  if(operator === "+") {
    return add(intA, intB);
  } else if(operator === "-") {
    return subtract(intA, intB);
  } else if(operator === "*") {
    return multiply(intA, intB);
  } else {
    if(intB === 0) {
      return "💀"
    } else {
      return divide(intA, intB);
    }

  }
}

const numbers = document.querySelectorAll(".number");
numbers.forEach(e => e.addEventListener("click", e => {
  if(repeat) {
    repeat = false;
    equation.b = undefined;
    equation.sign = undefined;
    inputs = equation.a;
  }
  if(equation.a === "💀" || equation.a === "NaN") {
    equation.a = "0";
    inputs = "";
  }
  let number = e.target.id;
  if((equation.a === "0") && (equation.sign === undefined)) {
    if(number === ".") {
      equation.a = "0" + number;
      inputs += "0" + number;
      document.querySelector(".display").innerHTML = "0" + number;
    } else {
      equation.a = number;
      inputs += number;
      document.querySelector(".display").innerHTML = number;
    }
  } else if((equation.a != undefined) && (equation.sign === undefined)) {
    equation.a += number;
    inputs += number;
    document.querySelector(".display").innerHTML += number;
  } else if((equation.sign != undefined) && (equation.a != undefined) && (equation.b === undefined)) {
    if(number === ".") {
      equation.b = "0" + number;
      inputs += "0" + number;
      document.querySelector(".display").innerHTML += "0" + number;
    } else {
      equation.b = number;
      inputs += number;
      document.querySelector(".display").innerHTML += number;
    }
  } else {
    equation.b += number;
    inputs += number;
    document.querySelector(".display").innerHTML += number;
  }
}));
const operator = document.querySelectorAll(".operator");
operator.forEach(e => e.addEventListener("click", e => {
  if(repeat) {
    repeat = false;
    equation.b = undefined;
    equation.sign = undefined;
    inputs = equation.a;
  }

  let sign = e.target.id
  if((equation.a != undefined) && (equation.sign === undefined)) {
    equation.sign = sign;
    inputs += sign;
    document.querySelector(".display").innerHTML += sign;
  } else if((equation.a != undefined) && (equation.sign != undefined) && (equation.b === undefined)) {
    equation.sign = undefined;
    inputs = inputs.slice(0,-1);
    document.querySelector(".display").innerHTML = inputs;
    equation.sign = sign;
    inputs+=sign;
    document.querySelector(".display").innerHTML += sign;
  }
}));

const evaluate = document.querySelector(".evaluate");
evaluate.addEventListener("click", e => {
  console.log(inputs)
  repeat = true;
  if((equation.sign === undefined) && (equation.b === undefined)) {
    inputs = equation.a;
    document.querySelector(".history").innerHTML = inputs;
    document.querySelector(".display").innerHTML = inputs;
  } else {
    inputs = equation.a + equation.sign + equation.b;
    document.querySelector(".history").innerHTML = inputs;
    document.querySelector(".display").innerHTML = operate(equation.a, equation.sign, equation.b);
    equation.a = String(operate(equation.a, equation.sign, equation.b));
  }
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", e => {
  equation = {
    a: "0",
    sign: undefined,
    b: undefined
  };
  inputs = "";
  document.querySelector(".history").innerHTML = "";
  document.querySelector(".display").innerHTML = "0";
});

const del = document.querySelector(".del");
del.addEventListener("click", e => {
  if(repeat) {
    repeat = false;
    equation.b = undefined;
    equation.sign = undefined;
    inputs = equation.a;
  }
  if(inputs === "💀") {
    inputs = "";
    document.querySelector(".display").innerHTML = "0";
  } else if((equation.a.length === 1) && (equation.sign === undefined) && (equation.b === undefined)) {
    equation.a = "0";
    inputs = "";
    document.querySelector(".display").innerHTML = "0";
  } else if((equation.sign === undefined) && (equation.b === undefined)) {
    equation.a = equation.a.slice(0, -1);
    inputs = inputs.slice(0, -1);
    document.querySelector(".display").innerHTML = inputs;
  } else if((equation.sign !== undefined) && (equation.b === undefined)) {
    equation.sign = undefined;
    inputs = inputs.slice(0, -1);
    document.querySelector(".display").innerHTML = inputs;
  } else if (equation.b.length === 1) {
    equation.b= undefined;
    inputs = inputs.slice(0, -1);
    document.querySelector(".display").innerHTML = inputs;
  } else {
    equation.b = equation.b.slice(0, -1)
    inputs = inputs.slice(0, -1);
    document.querySelector(".display").innerHTML = inputs;
  }
});
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", e => {
  if(repeat) {
    repeat = false;
    equation.b = undefined;
    equation.sign = undefined;
    inputs = equation.a;
  }
  if((equation.b === undefined) && (!equation.a.includes("-")) && (equation.a !== "0")) {
    equation.a = "-" + equation.a;
    inputs = "-" + inputs;
    document.querySelector(".display").innerHTML = inputs;
  } else if((equation.b === undefined) && (equation.a.includes("-")) && (equation.a !== "0")) {
    equation.a = equation.a.replace("-", "");
    inputs = inputs.replace("-", "");
    document.querySelector(".display").innerHTML = inputs;
  } else if((equation.a !== undefined) && (equation.b !== undefined) && (!equation.b.includes("-")) && (equation.b !== "0")) {
    equation.b = "-" + equation.b;
    inputs = equation.a + equation.sign + equation.b;
    document.querySelector(".display").innerHTML = inputs;
  } else {
    equation.b = equation.b.replace("-", "")
    inputs = equation.a + equation.sign + equation.b;
    document.querySelector(".display").innerHTML = inputs;
  }
});
