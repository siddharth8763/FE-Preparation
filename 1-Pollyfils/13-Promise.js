const promise = new Promise((resolve, reject) => {
  let flag = true;

  if (flag) {
    resolve(`Operation was successful`);
  } else {
    reject(`Operation was failed`);
  }
});

promise
  .then(() => {
    console.log(`value`);
    return `new Value from prev`;
  })
  .then((newValue) => {
    console.log(newValue);
  })
  .catch((err) => {
    console.error(`some error happened - ${err}`);
  })
  .finally(() => {
    console.log(`Operation completed`);
  });

/////////////////////////////////////////////////////////////////////////////////////

// promise all

//Promise.all waits for all of them and then logs the values in an array.
//If any promise fails, the .catch block will catch it. That's the gist of it!

const promise1 = Promise.resolve("First Promise");
const promise2 = new Promise((resolve, reject) =>
  setTimeout(resolve, 2000, "Second Promise")
);
const promise3 = Promise.resolve("Third Promise");

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // ['First Promise', 'Second Promise', 'Third Promise']
  })
  .catch((error) => {
    console.error("One of the promises failed:", error);
  });

///////////////////////////////////////////////////////////////

// promise.allSettled

// Promise.allSettled waits for all promises to complete and then returns an array of objects describing the outcomes, 
// regardless of whether they were fulfilled or rejected. You can then handle each result based on its status.

const promise11 = Promise.resolve("First Promise");
const promise22 = new Promise((resolve, reject) =>
  setTimeout(reject, 2000, "Second Promise Failed")
);
const promise33 = Promise.resolve("Third Promise");

Promise.allSettled([promise11, promise22, promise33]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fulfilled:", result.value);
    } else if (result.status === "rejected") {
      console.log("Rejected:", result.reason);
    }
  });
});

//////////////////////////////////////////////////////////////////

// promise.any

// Promise.any waits for the first promise to fulfill. In this case

const promise10 = new Promise((resolve, reject) =>
  setTimeout(reject, 1000, "First Promise Failed")
);
const promise20 = new Promise((resolve) =>
  setTimeout(resolve, 2000, "Second Promise")
);
const promise30 = new Promise((resolve) =>
  setTimeout(resolve, 3000, "Third Promise")
);

Promise.any([promise10, promise20, promise30])
  .then((value) => {
    console.log("First fulfilled promise:", value);
  })
  .catch((error) => {
    console.error("All promises were rejected", error);
  });

  //////////////////////////////////////////////////////////////

  // promise.race
  // Promise.race is exactly what it sounds like—a race where the first promise to settle wins, 
  // regardless of whether it’s fulfilled or rejected

  const promise14 = new Promise((resolve, reject) =>
    setTimeout(resolve, 1000, "First Promise")
  );
  const promise24 = new Promise((resolve, reject) =>
    setTimeout(reject, 500, "Second Promise Failed")
  );
  const promise34 = new Promise((resolve) =>
    setTimeout(resolve, 2000, "Third Promise")
  );

  Promise.race([promise14, promise24, promise34])
    .then((value) => {
      console.log("First promise settled:", value);
    })
    .catch((error) => {
      console.error("First promise rejected:", error);
    });
