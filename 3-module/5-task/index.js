function getMinMax(str) {
  let items = str.split(' ');
  let numbers = items
    .map(item => parseFloat(item)) 
    .filter(item => !isNaN(item)); 
  
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}

const inputData = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';

console.log(getMinMax(inputData));
