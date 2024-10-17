function throttle(func, limit) {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      }
    }
  }
  
  // Usage
  const log = () => console.log('Throttle function called!');
  const throttledLog = throttle(log, 2000);
  
  window.addEventListener('resize', throttledLog);
  