/**
 * This function will calculate the depth of the array
 *
 * if current depth is greater than the max depth it will basically update
 * the max depth.
 *
 * catch - maxDepth = depth
 */
function getMaxDepth(arr) {
  let maxDepth = 1;
  for (let item of arr) {
    if (Array.isArray(item)) {
      let depth = getMaxDepth(item) + 1;
      if (depth > maxDepth) {
        maxDepth = depth;
      }
    }
  }
  return maxDepth;
}

/**
 * While implementing this polltyfil make sure to add depth and output as default param format
 * otherwise the recurssion will not work properly
 *
 * Catch is here we are updating maxDepth to depth, if it depth goes beyond actual maxDepth
 * It will override the default depth param value.
 * and it will not go beyond the actual depth of the array
 *
 * catch- depth = maxDepth
 */
Array.prototype.customFlat = function (depth = 1, output = []) {
  // calculate depth of array
  let maxDepth = getMaxDepth(this);

  if (depth > maxDepth) {
    depth = maxDepth;
  }

  if (depth <= 1) {
    output.push(...this);
    return output;
  }

  for (let item of this) {
    if (Array.isArray(item)) {
      item.customFlat(depth - 1, output);
    } else {
      output.push(item);
    }
  }
  return output;
};

const arr = [1, 2, 3, 4, [5, 6, [7, 8, 9, [23, 65, [69, 89]]]]];
console.log(arr.customFlatten(2));
