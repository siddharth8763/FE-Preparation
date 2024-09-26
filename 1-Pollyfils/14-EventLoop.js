`https://betterprogramming.pub/10-javascript-promise-challenges-before-you-start-an-interview-c9af8d4144ec`

`Sync - microtask1 - microtask2 - microtask3 - .... macrotask1 - microtask6 - microtask7 - ..... macrotask2 - microtask10 - microtask11`

// console.log(1);
 
// setTimeout(() => console.log(2));
 
// Promise.resolve().then(() => console.log(3));
 
// Promise.resolve().then(() => setTimeout(() => console.log(4)));
 
// Promise.resolve().then(() => setTimeout(() => console.log(5)));
 
// Promise.resolve().then(() => console.log(6));
 
// setTimeout(() => console.log(7));
 
// console.log(8);

// setTimeout(() => console.log(9))

// op - 1 8 3 6 2 7 9 4 5

//****************************************** */

// console.log('start');

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
// })

// console.log('end');

// start, 1, end

//********************************************* */

// console.log('start');

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
// })

// promise1.then(res => {
//   console.log(res)
// })

// console.log('end');

// op- start, 1, end, 2

/******************************************************* */

// console.log('start');

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
//   console.log(3)
// })

// promise1.then(res => {
//   console.log(res)
// })

// console.log('end');

// op - start, 1, 3, end, 2

/******************************************************* */

// console.log('start');

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
// })

// promise1.then(res => {
//   console.log(2)
// })

// console.log('end');

// op - start, 1, end

/******************************************************* */

// console.log('start')

// const fn = () => (new Promise((resolve, reject) => {
//   console.log(1);
//   resolve('success')
// }))

// console.log('middle')

// fn().then(res => {
//   console.log(res)
// })

// console.log('end')

// op - start, middle, 1, end, success

/******************************************************* */

// console.log('start')

// Promise.resolve(1).then((res) => {
//   console.log(res)
// })

// Promise.resolve(2).then((res) => {
//   console.log(res)
// })

// console.log('end')

// op - start, end, 1, 2

/******************************************************* */

// console.log('start')

// setTimeout(() => {
//   console.log('setTimeout')
// })

// Promise.resolve().then(() => {
//   console.log('resolve')
// })

// console.log('end')

//op start,end, resolve, settimeout

/******************************************************* */

// const promise = new Promise((resolve, reject) => {
//   console.log(1);

//   setTimeout(() => {
//     console.log("timerStart");

//     resolve("success");

//     console.log("timerEnd");
//   }, 0);

//   console.log(2);
// });

// promise.then((res) => {
//   console.log(res);
// });

// console.log(4);

//op - 1,2,4,timerstart,timerend,success

/******************************************************* */

// const timer1 = setTimeout(() => {
//   console.log("timer1");

//   const promise1 = Promise.resolve().then(() => {
//     console.log("promise1");
//   });
// }, 0);

// const timer2 = setTimeout(() => {
//   console.log("timer2");
// }, 0);

//op - timer1. promise1, timer2

/******************************************************* */

// console.log('start');

// const promise1 = Promise.resolve().then(() => {
//   console.log('promise1');
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)
// });

// const timer1 = setTimeout(() => {
//   console.log('timer1')
//   const promise2 = Promise.resolve().then(() => {
//     console.log('promise2')
//   })
// }, 0)

// console.log('end');

//op - start,end, promise1, timer1, promise2, timer2