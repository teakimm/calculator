let equation = {
  a: "0",
  sign: undefined,
  b: undefined
};

const audio = document.getElementById("press");
const numbers = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const evaluate = document.querySelector(".evaluate");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const toggle = document.querySelector(".toggle");
let inputs = "";
let repeat = false;
let isKey = false;

window.addEventListener("keydown", handleKeyboardInput);

numbers.forEach(e => e.addEventListener("click", addNumber))

operator.forEach(e => e.addEventListener("click", addOperator));

evaluate.addEventListener("click", answer);

clear.addEventListener("click", clearAll);

del.addEventListener("click", removeEntry);

toggle.addEventListener("click", changeSign);

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
  intA = parseFloat(a);
  intB = parseFloat(b);
  if(operator === "+") {
    return add(intA, intB);
  } else if(operator === "-") {
    return subtract(intA, intB);
  } else if(operator === "*") {
    return multiply(intA, intB);
  } else if(operator === "/") {
    if(intB === 0) {
      return "💀";
    } else {
      return divide(intA, intB);
    }
  }
}

function addNumber(e) {
  audio.currentTime = 0;
  audio.play();
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
  let number;
  if(isKey) {
    number = String(e);
  } else {
    number = e.target.id;
  }
  isKey = false;
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
    if(!((number === ".") && (equation.a.indexOf(".") > -1))) {
      equation.a += number;
      inputs += number;
      document.querySelector(".display").innerHTML += number;
    }
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
    if(!((number === ".") && (equation.b.indexOf(".") > -1))) {
      equation.b += number;
      inputs += number;
      document.querySelector(".display").innerHTML += number;
    }
  }
}

function addOperator(e) {
  audio.currentTime = 0;
  audio.play();
  if(repeat) {
    repeat = false;
    equation.b = undefined;
    equation.sign = undefined;
    inputs = equation.a;
  }
  let sign;
  if(isKey) {
    sign = String(e);
  } else {
    sign = e.target.id;
  }
  isKey = false;
  if(inputs === "💀") {
    inputs = "";
    document.querySelector(".display").innerHTML = "0";
  } else if((equation.a != undefined) && (equation.sign === undefined)) {
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
}

function answer(e) {
  audio.currentTime = 0;
  audio.play();
  repeat = true;
  isKey = false;
  if((equation.sign === undefined) && (equation.b === undefined)) {
    inputs = equation.a;
    document.querySelector(".history").innerHTML = inputs;
    document.querySelector(".display").innerHTML = inputs;
  } else {
    inputs = equation.a + equation.sign + equation.b;
    document.querySelector(".history").innerHTML = inputs;
    let temp;
    if(operate(equation.a, equation.sign, equation.b) === "💀") {
      temp = operate(equation.a, equation.sign, equation.b);
    } else {
      temp = parseFloat(operate(equation.a, equation.sign, equation.b).toFixed(5));
    }
    if(temp > 999999999999 || temp < -999999999999) {
      document.querySelector(".display").innerHTML = temp.toExponential(2);
      equation.a = String(temp.toExponential(2));
    } else {
      document.querySelector(".display").innerHTML = temp;
      equation.a = String(temp);
    }
    
  }
}

function removeEntry(e) {
  audio.currentTime = 0;
  audio.play();
  isKey = false;
  if(repeat) {
    repeat = false;
    equation.b = undefined;
    equation.sign = undefined;
    inputs = equation.a;
  }
  if(inputs === "💀" || inputs == "NaN") {
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
}

function clearAll(e) {
  audio.currentTime = 0;
  audio.play();
  isKey = false;
  equation = {
    a: "0",
    sign: undefined,
    b: undefined
  };
  inputs = "";
  document.querySelector(".history").innerHTML = "";
  document.querySelector(".display").innerHTML = "0";
}



function changeSign(e) {
  audio.currentTime = 0;
  audio.play();
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
}

function handleKeyboardInput(e) {
  isKey = true;
  if (e.key >= 0 && e.key <= 9) {
    addNumber(e.key);
  }
  if (e.key === ".") {
    addNumber(e.key);
  }
  if (e.key === '=' || e.key === "Enter") {
    answer(e);
  }
  if (e.key === "Backspace") {
    removeEntry(e);
  }
  if (e.key === "Escape") {
    clearAll(e);
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "\/")
    addOperator(e.key);
}