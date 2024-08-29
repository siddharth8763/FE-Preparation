Array.prototype.myMap = function(callback){
    let output=[]
    for(let item=0;item<this.length;item++){
        output.push(callback(this[item],item,this))
    }
    return output
}

let arr = [11, 12, 13, 4, 5];
let op = arr.myMap(
  (data, index, ar) => `Item is ${data * 2}, index is ${index} , array is ${ar}`
);
console.log(op);
