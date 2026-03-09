let createCounter=(number)=>{
    let copy=number

    return{
        increment : ()=>{
            return ++copy
        },
        decrement : ()=>{
            return --copy
        },
        reset : ()=>{
            copy = number
            return copy
        }
}
}

    const counter = createCounter(5)
    counter.increment(); // 6
    counter.reset(); // 5
    counter.decrement(); // 4