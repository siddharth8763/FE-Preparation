Array.prototype.myForEach = function(callback){
    for(let index=0;index<this.length;index++){
        callback(this[index],index,this)
    }
}

let arr = [12,2,5,6,3]

arr.myForEach(data=>console.log(data*2))