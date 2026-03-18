// 1.Convert the string "123" to a number and add 7.  Output Example: 130
console.log("1)");
let str = "123";
console.log(Number(str) + 7);
console.log("================");

// 2. Check if the given variable is falsy and return "Invalid" if it is.  Input Example: 0 , Output Example: "Invalid"
console.log("2)");
let falsy = 0;
if (falsy) {
  console.log("valid");
} else {
  console.log("invalid");
}
console.log("================");

// 3.Use for loop to print all numbers between 1 and 10, skipping even numbers using continue
console.log("3)");
for (let i = 0; i < 10; i++) {
  if (i % 2 != 0) {
    console.log({ i });
  }
}
console.log("================");

// 4.Create an array of numbers and return only the even numbers using filter method.
console.log("4)");
let q4 = [1, 2, 3, 4, 5];
const evenNumbers = q4.filter((number) => number % 2 === 0);
console.log(evenNumbers);
console.log("================");

// 5. Use the spread operator to merge two arrays, then return the merged array. Input Example: [1, 2, 3], [4, 5, 6]  Output Example: [1, 2, 3, 4, 5, 6]
console.log("5)");
let q5_1 = [1, 2, 3];
let q5_2 = [4, 5, 6];
console.log(q5_1.concat(q5_2));
console.log("anoteher Solution:\n"[(q5_1,q5_2)]);
console.log("================");

// 6. Use a switch statement to return the day of the week given a number (1 = Sunday …., 7 = Saturday).   Input Example: 2  Output Example: “Monday”
console.log("6)");
let day = 2;
if (day == 1) {
  console.log("sunday");
} else if (day == 2) {
  console.log("Monday");
} else if (day == 3) {
  console.log("Tuesday");
} else if (day == 4) {
  console.log("wedensday");
} else if (day == 5) {
  console.log("Thrusday");
} else if (day == 6) {
  console.log("Friday");
} else if (day == 7) {
  console.log("Saturday");
}
console.log("================");

// 7. Create an array of strings and return their lengths using map method  Input: ["a", "ab", "abc"] Output Example: [1, 2, 3]
console.log("7)");
let q7 = ["a", "ab", "abc"];
for (let i = 0; i < q7.length; i++) {
  console.log(q7[i].length);
}
console.log("================");

// 8. Write a function that checks if a number is divisible by 3 and 5.   Input Example: 15 Output Example: “Divisible by both”
console.log("8)");
function div(number) {
  if (number % 2 == 0 && number % 5 == 0) {
    console.log("Number is divisble by 2 and 5");
  }
}
div(10);
console.log("================");

// 9. Write a function using arrow syntax to return the square of a number   Input Example: 5 Output Example: 25
console.log("9)");
let sq = (num) => {
  console.log(num ** 2);
};
sq(5);
console.log("================");

// 10. Write a function that destructures an object to extract values and returns a formatted string.  Input Example: const person = {name: 'John', age: 25}  Output Example: 'John is 25 years old'
console.log("10)");
const person = { name: "John", age: 25 };
console.log(person.name + " is " + person.age + " years old");
console.log("================");

// 11. Write a function that accepts multiple parameters (two or more) and returns their sum.  Input Example: 1, 2, 3, 4, 5  Output Example: 15
console.log("11)");
let sum = (num1, num2, num3) => {
  console.log(num1 + num2 + num3);
};
sum(10, 20, 50);
console.log("================");

// 12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message.  Output Example: “Success”
console.log("12)");
console.log("in the next Session");
console.log("================");

// 13. Write a function to find the largest number in an array.  Input Example: [1, 3, 7, 2, 4] Output Example: 7
console.log("13)");
let largest = (numbers) => {
  let largest_number;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > numbers[i + 1]) {
      largest_number = numbers[i];
    } else {
      largest_number = numbers[i + 1];
    }
  }
  console.log(largest_number);
};
console.log(largest([10, 20, 30, 787, 8]));
console.log("================");

// 14. Write a function that takes an object and returns an array containing only its keys.  Input Example: name: "John", age: 30} Output Example: ["name", "age"]
console.log("14)");
let personal_info = { name: "John", age: 30 };
let fun = (info) => {
  console.log(Object.keys(info));
};
console.log(fun(personal_info));
console.log("================");

// 15. Write a function that splits a string into an array of words based on spaces.  Input: "The quick brown fox" Output: ["The", "quick", "brown", "fox"]
console.log("15)");
let string = "The quick brown fox";
console.log(string.split(" "));
console.log("================");

/*

*1. What is the difference between forEach and for...of? When would you use each? 
Answer : 
for : is use to make a loop for make a something repeatedly for nimber of times
Simple example :
// print "Hello" for 5 times
for(let i=0;i<5;i++){
Console.log("Hello")
}

forEach : is a method inside array  use to make something for each elemnt in array , don't returns anything = return void(undefined)
Simple example :
// To add 1 for all elements in the array
let array  = [1,2,3,4]
array.forEach((element)=>{
  return element+1 
  })

  
*2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
Answer : 
Hoisting : is a JavaScript mechanism where variable and function declarations are moved to the top of their scope before code execution, allowing them to be used before they are declared.
Simple example : 
x=656
console.log(x+5);
var x

Temporal Dead Zone (TDZ) : is the "dead" time between the start of a block and the declaration of let/const variables, during which accessing them throws a ReferenceError.
Simple example : 
x=656
console.log(x+5);
let x


*3. What are the main differences between == and ===? 
Answer : 
Both are use to compare between two things (variable and another one or variable and value) but “===” compares value and data type not value only


*4. Explain how try-catch works and why it is important in async operations. 
Answer : 
 is JavaScript's primary mechanism for handling runtime errors gracefully instead of crashing your program.
Simple example :
try {
  const result = riskyOperation();
} catch (error) {
  console.error("Something went wrong:", error.message);
} finally {
  cleanup();
}

*5. What’s the difference between type conversion and coercion? Provide examples of each. 
Answer : 
Both transform a value from one type to another — the key difference is intent and control.
example :
Type Conversion you convert manually:

Number("42")
String(99)
Boolean(0)


Type Coercion JS converts automatically:
"5" + 2
"5" - 2 

*/
