function primeOrFactors(num) {
/\*\*

- Determines if a number is prime. If prime, returns the number; otherwise,
  returns its prime factors.
-
- @param {number} num The number to check. Must be an integer greater than 1.
- @returns {number | number[]} The number itself if prime, otherwise an array of
  its prime factors. Returns an error message if input is invalid.
  \*/

// Input validation
if (!Number.isInteger(num) || num <= 1) {
return "Invalid input: Number must be an integer greater than 1.";
}

// Check for primality
let isPrime = true;
for (let i = 2; i <= Math.sqrt(num); i++) {
if (num % i === 0) {
isPrime = false;
break;
}
}

if (isPrime) {
return num;
} else {
// Find prime factors
const factors = [];
let divisor = 2;
let tempNum = num;

while (tempNum > 1) {
while (tempNum % divisor === 0) {
factors.push(divisor);
tempNum /= divisor;
}
divisor++;
}
return factors;
}
}

// Example usage:
console.log(primeOrFactors(7)); // Output: 7 (prime)
console.log(primeOrFactors(12)); // Output: [2, 2, 3]
console.log(primeOrFactors(1)); // Output: Invalid input: Number must be an
integer greater than 1.
console.log(primeOrFactors(15)); // Output: [3, 5]
console.log(primeOrFactors(99)); //Output: [3, 3, 11]
console.log(primeOrFactors(2)); //Output: 2
console.log(primeOrFactors(3.14));//Output: Invalid input: Number must be an
integer greater than 1.

````

```javascript
/**
* Determines if a number is prime and returns either the number itself (if
prime) or its prime factorization.
*
* @param {number} num The number to check. Must be an integer greater than 1.
* @returns {number|Array<number>} The number itself if prime, otherwise an array
  of its prime factors. Throws an error for invalid input.
  * @throws {Error} If the input is invalid (not an integer, less than or equal
  to 1).
  */
  function primeOrFactors(num) {
  // Input validation: Thorough error handling is crucial for robust functions.
  if (!Number.isInteger(num)) {
  throw new Error("Input must be an integer.");
  }
  if (num <= 1) {
  throw new Error("Input must be an integer greater than 1.");
  }

  //Efficient primality test. Optimization for even numbers.
  if (num <= 3) return num; // 2 and 3 are prime.
  if (num % 2 === 0 || num % 3 === 0) return [2,3].filter(x => num%x ===0); //
  Handle multiples of 2 and 3 immediately

  // Optimized primality test: Check divisibility only by numbers of the form 6k
  ± 1
  for (let i = 5; i * i <= num; i += 6) {
  if (num % i === 0 || num % (i + 2) === 0) {
  //Found a factor, start factorization.
  const factors = [];
  let tempNum = num;

  //Prime factorization: Find prime factors and their multiplicities.
  for (let j = 2; j <= tempNum; j++) {
  while (tempNum % j === 0) {
  factors.push(j);
  tempNum /= j;
  }
  }
  return factors; //Return the array of factors.
  }
  }

  return num; // If no factors found, the number is prime.
  }

  //Example Usage with robust error handling.

  const testCases = [2, 3, 4, 5, 6, 7, 100, 97, 101, 0, -5, 1, 3.14, "hello"];

  testCases.forEach(num => {
  try {
  const result = primeOrFactors(num);
  console.log(`Input: ${num}, Output: ${JSON.stringify(result)}`);
  } catch (error) {
  console.error(`Error for input ${num}: ${error.message}`);
  }
  });

````

```

```
