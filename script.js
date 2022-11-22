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

console.log(operate("1", "+", "2"))

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
const numbers = document.querySelectorAll(".number");
numbers.forEach(e => e.addEventListener("click", e => {
  let number = e.target.id;
  if((equation.a === undefined) && (equation.sign === undefined)) {
    equation.a = number;
    console.log(equation);
  } else if((equation.a != undefined) && (equation.sign === undefined)) {
    equation.a += number;
    console.log(equation);
  } else if((equation.sign != undefined) && (equation.a != undefined) && (equation.b === undefined)) {
    equation.b = number;
    console.log(equation)
  } else {
    equation.b += number;
    console.log(equation)
  }
}));
const operator = document.querySelectorAll(".operator");
operator.forEach(e => e.addEventListener("click", e => {
  let sign = e.target.id
  if(equation.a != undefined) {
    equation.sign = sign;
    console.log(equation);
  }
}));

const evaluate = document.querySelector(".evaluate");
evaluate.addEventListener("click", e => {
  console.log(operate(equation.a, equation.sign, equation.b));
});
