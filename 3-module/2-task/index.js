let arr = [5, 3, 8, 1];
function filterRange(arr, a, b) {
  return arr.filter(item => item >= Math.min(a, b) && item <= Math.max(a, b));
}
let filtered = filterRange(arr, 1, 4);

console.log(filtered); 
console.log(arr);