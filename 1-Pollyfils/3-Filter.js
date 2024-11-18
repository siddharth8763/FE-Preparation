Array.prototype.myFilter = function(callback){
    let output=[]

    for(let item=0;item<this.length;item++){
        if(callback(this[item],item,this)){
            output.push(this[item])
        }
    }
    return output
}


let arr = [11, 12, 13, 4, 5];
let op = arr.myFilter((data, index) => data > 4 && index > 1);
console.log(op);

const array = [{id: 1, name:'vijay'}, {id: 2, name:'Ayush'}, {id: 3, name:'vijay'}];

// Using a map to keep track of unique names
const uniqueArray = array.filter((obj, index, self) =>
  index === self.findIndex((el) => el.name === obj.name)
);

console.log(uniqueArray);
