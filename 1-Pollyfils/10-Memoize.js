/**
 * Create a cache map
 * 
 * this cache map is going to store the result of the function
 * 
 * From subsequent calls, it will check in map and return those results
 */
function memoize(fn) {
  let cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

function veryLargeCalculation(num1,num2){
    for(let i=0;i<=10000;i++){}
    return num1 * num2
}

const memoizedFunction = memoize(veryLargeCalculation)

console.time(`First Call`)
console.log(veryLargeCalculation(923,942))
console.timeEnd(`First Call`)

console.time(`Second Call`)
console.log(veryLargeCalculation(923,942))
console.timeEnd(`Second Call`)