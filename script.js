function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`Element ${i}: value ${array[i]}`);
  }
}

function printArray1(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`${i}: ${array[i]}`);
  }
}

function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

function filter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

function find(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
}

function some(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
}

function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
}

function reduce(array, callback, initialValue) {
  let acc = initialValue;
  let start = 0;

  if (acc === undefined) {
    acc = array[0];
    start = 1;
  }

  for (let i = start; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }

  return acc;
}

// ТЕСТЫ
printArray([10,20,30]);
printArray1([10,20,30]);

forEach([1,2,3], (e,i)=>console.log(e,i));

console.log(map([1,2,3], x=>x*2));
console.log(filter([1,2,3,4], x=>x%2===0));
console.log(find([1,2,3,4], x=>x>2));
console.log(some([1,3,5], x=>x%2===0));
console.log(every([2,4,6], x=>x%2===0));
console.log(reduce([1,2,3], (a,b)=>a+b, 0));