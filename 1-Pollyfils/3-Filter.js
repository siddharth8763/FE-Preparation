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

