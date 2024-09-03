// Debouncing is a technique that is used in programming to reduce the function invocation.
//
// It runs with the assumption that rather than invoking the functions on every action, 
// allows the user to complete their thought process and invoke the function only after a certain buffer between two actions.
//
// For example, if the user is typing something in the search box, rather than making a network request on every word that the user types, 
// we should allow the user to finish typing and only when he stops for X amount of time, the function to make a network request should be invoked.
//





/**
 * This function will be called at the interval of 400 ms
 *
 *  If you try to access it in between it will not work
 *
 *  This is example of Closure as well
 *
 */
function customDebounce(callback, delay = 400) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

//What are we doing here?
//1. Set the context and trailing arguments
//2. If not leading/trailing, return null
//3. If timer is done but leading is true, invoke the func execution
//4. If not, save the context for later execution
//5. clear the timer to avoid multiple timer instances
//6. call the timer if trailing is true n trailing args exists
//7. Reset the timer and args

// If trailing is enabled, the debounce will invoke after the delay just like classic implementation. 
// If leading is enabled, it will invoke at the beginning. 
// If both are enabled then it will invoke twice at the beginning and after the delay.
function customAdvancedDebounce(
  func,
  delay,
  option = { leading: false, trailing: true }
) {
  let timer = null; // same like basic debounce
  let trailingArgs = null; // as we require last arguments for trailing

  if (!option.leading && !option.trailing) return () => null; //if both false, return null

  return function(...args) {
    //returns a debounced function

    if (!timer && option.leading) {
      // timer done but leading true
      func.apply(this, args); //call func
    } else {
      trailingArgs = args; // arguments will be the last args
    }

    clearTimeout(timer); //clear timer for avoiding multiple timer instances

    timer = setTimeout(() => {
      if (option.trailing && trailingArgs) func.apply(this, trailingArgs); // trailingArgs is present and trailing is true

      trailingArgs = null; //reset last arguments
      timer = null; // reset timer
    }, delay);
  };
}
