function timer(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(delay)
        },delay)
    })
}



const array = [1000,2000,8000,3000,4000]

function printArray(arr){
    //use for loop
    // for(let i = 0;i<arr.length;i++){
    //     await timer(arr[i]).then(data=>console.log(data)).catch(err=>console.log(err))
    // }

    
    let promiseChain = Promise.resolve(); // Initialize a chain with a resolved promise.

    arr.forEach(ele => {
        promiseChain = promiseChain.then(() => timer(ele).then(data => console.log(data)));
    });
}

printArray(array)