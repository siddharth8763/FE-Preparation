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

// console.log(getName.call(person,`kendal`,`india`))

//Pollyfill

// Function.prototype.myCall = function(context,...args){
//     context.myfn=this
//     context.myfn(...args)
// }

Function.prototype.myCall = function (context, ...args) {
    // Check if the context is provided; if not, use the global object (usually window in browsers)
    const targetContext = context || window;
  
    

    // In the above code, Symbol is a built-in primitive data type in JavaScript that was introduced in ECMAScript 2015 (ES6). 
    // A Symbol is a unique and immutable value that can be used as the key of an object property. Each Symbol value is unique, meaning that even if you create two symbols with the same description, they will be different from each other.

    // Purpose of Symbol in the Code:
    // In the polyfill, Symbol is used to create a unique property key on the context object where the function will be temporarily stored. 
    // This prevents any potential naming conflicts with existing properties on the context object.

    // Create a unique property name to avoid overwriting existing properties
    const uniqueProp = Symbol('uniqueProp');
  
    // Attach our function to the context object
    targetContext[uniqueProp] = this;
  
    // Invoke the function with the provided arguments
    const result = targetContext[uniqueProp](...args);
  
    // Clean up by removing the temporary property
    delete targetContext[uniqueProp];
  
    return result;
  };

  const person2 = {
    firstname: 'Kirtesh',
    lastname: 'Bansal',
  };
  
  function printName(country) {
    console.log(`${this.firstname} ${this.lastname} from ${country}`);
  }
  
  // Using our custom myCall polyfill
  printName.myCall(person2, 'India');