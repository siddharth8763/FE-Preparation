function Once(fn){
    let result;
    let called = false;

    return function(...args){
        if(!called){
            result = fn.apply(this,args)
            called = true
        }
        return result;
    }
}


const hello = Once(()=>console.log(`Hello`))

hello()
hello()
hello()