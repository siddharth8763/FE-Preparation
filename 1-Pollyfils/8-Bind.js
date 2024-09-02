const john = { name: 'John' };
const alice = { name: 'Alice' };

const greetPerson = function() {
  return 'Hello, ' + this.name;
};

const greetJohn = greetPerson.bind(john);
const greetAlice = greetPerson.bind(alice);

console.log(greetJohn());
console.log(greetAlice());

function multiply(a, b) {
  return a * b;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(5)); // Output: 10


Function.prototype.ourBind = function(context,...bindArgs){
  let originalFunction = this

  if(typeof originalFunction !==`function`){
    throw new Error(`bind must be called upon functions`)
  }

  return function(...callArgs){
    return originalFunction.apply(context,bindArgs.concat(callArgs))
  }
}

const multiplyByTwoo = multiply.ourBind(null, 2);
console.log(multiplyByTwoo(5)); // Output: 10

function greet(greeting, punctuation) {
  console.log(`${greeting}, my name is ${this.name}${punctuation}`);
}

const person = { name: 'Siddharth' };

const greetSiddharth = greet.ourBind(person, 'Hello');
greetSiddharth('!'); // Output: "Hello, my name is Siddharth!"
