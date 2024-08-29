
/**
 * reduce function takes 2 args i.e a callback function and an initial value
 * If we have not provided any initialvalue then 1st element of the array will be 
 * considered as initial value.
 * 
 * also if you have not provided any initial value, then the indexing should start from the 1st index
 * instead of the 0th index as it considers the 1st element as starting element
 */
Array.prototype.myReduce = function(callback,initialValue){
    let accumulator = initialValue === undefined ? this[0] : initialValue
    let startingIndex = initialValue === undefined ? 1 : 0

    for(let item = startingIndex; item <this.length;item++){
        accumulator = callback.call(undefined,accumulator,this[item],item,this)
    }
    return accumulator
}

const numbers = [1, 2, 3, 4, 5, 6];

let op= numbers.myReduce((accumulator,current)=>accumulator+current,0)
let op1=numbers.reduce((accumulator,current)=>accumulator+current)

console.log(op)
