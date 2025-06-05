function sumSalary(salaries) {
  // ваш код...
  let sum = 0;
  for (let k in salaries) {
    if(typeof(salaries[k]) === 'number' && isFinite(salaries[k])) {
      sum += salaries[k];
    }
  }
  return sum;
}

let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
}

console.log(sumSalary(salaries));