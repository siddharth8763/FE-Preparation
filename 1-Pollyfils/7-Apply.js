function getName(city,country){
    return `Hello ${this.firstName} ${this.lastName} from ${city} - ${country}`
}

let person = {
    firstName: `Sid`,
    lastName: `Sah`
}

let person1= {
    firstName: `Siddharth`,
    lastName: `Sahu`
}


// console.log(getName.apply(person,[`kendal`,`India`]))
// console.log(getName.apply(person1,[`kendal`,`India`]))

Function.prototype.myApply = function (context, argsArray) {
  // If context is null or undefined, default to the global object (window in browsers, global in Node.js)
  let currentContext = context || window;
  
  // Create a unique property on the context to avoid overwriting existing properties
  let uniqueProp = Symbol(`uniqueProp`);
  
  // Assign the function (this) to the context under the unique property
  currentContext[uniqueProp] = this;
  
  //edgecase for if array is not provided
  if (!Array.isArray(argsArray)) {
    argsArray = Array.from(argsArray);
  }

  // Call the function using the context and spread the argsArray
  let result = currentContext[uniqueProp](...argsArray);

  // Delete the unique property to clean up
  delete context[uniqueProp];

  // Return the result of invoking the function
  return result;
};


console.log(getName.myApply(person,[`kendal`,`India`]))
console.log(getName.myApply(person1,[`kendal`,`India`]))