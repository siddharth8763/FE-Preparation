function add(...args) {
  let sum = args.reduce((acc, curr) => acc + curr, 0);

  function next(...moreArgs) {
    if (moreArgs.length === 0) {
      return sum;
    } else {
      sum += moreArgs.reduce((acc, curr) => acc + curr, 0);
      return next;
    }
  }

  return next;
}

const result1 = add(1, 2, 3)(4, 5)(6)(7)(8, 9)(10)(); //55;
const result2 = add(1, 2)(3)(4)(); //10
const result3 = add(1, 2, 3)(4)(5)(); //15
const result4 = add(1)(); //1

console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
