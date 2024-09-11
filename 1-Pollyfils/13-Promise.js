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
