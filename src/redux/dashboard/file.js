// 2
// The function filterByN receives an array of integers, a number and a parameter (greater, less).
//Print a new array, where all elements will be greater / less than this number
// By default, the number is 0, the parameter is greater.

// const filterNums = (arr, number = 0, parameter = "greater") => {
//   if (parameter === "greater") {
//     return arr.filter((value) => value > number);
//   }
//   return arr.filter((value) => value < number);
// };
// console.log(filterNums([-2, 2, 3, 0, 43, -13, 6], -33, "less"));

//3
// Find the maximum interval between two consecutive arguments.
// const maxInterv = (...arg) => {
//   if (arg.length < 2) {
//     return 0;
//   }
//   let max = Math.abs(arg[0] - arg[1]);
//   for (let i = 1; i < arg.length - 1; i++) {
//     const interv = Math.abs(arg[i] - arg[i + 1]);
//     if (interv > max) {
//       max = interv;
//     }
//   }
//   return max;
// };
// console.log(maxInterv(3, 5, 2, 7, 11, 0, -2));

//4
//The function takes any number of strings and returns the sum of their lengths.
// const sumOfLen = (...arg) => {
//   return arg.join("").length;
// };
// console.log(sumOfLen("hello", "hi")); //7

//5
//Write a function combineArray(arr1, arr2), which takes 2 arrays, and returns a new array consisting only of numeric elements of arrays arr1 and arr2.

// function combineArray(arr1, arr2) {
//   const numericArr1 = arr1.filter((value) => typeof value === "number");
//   const numericArr2 = arr2.filter((value) => typeof value === "number");
//   return [...numericArr1, ...numericArr2];
// }
// console.log(combineArray([12, "User01", 22, true, -8], ["Index", 6, null, 15]));

//6
// Implement the longestLogin(loginList) function, which takes an array of user logins loginList  and returns the longest login.
// If the logins of the same length are the longest in the array, the login element with the largest index is returned.
// Tip: You can use the reduce() method to solve the task.

// function longestLogin(loginList) {
//   let login = loginList[0];
//   for (let i = 1; i < loginList.length - 1; i++) {
//     if (login.length <= loginList[i].length) {
//       login = loginList[i];
//     }
//   }
//   return login;
// }

// function longestLogin(loginList) {
//   if (loginList.length === 0) {
//     return null;
//   }

//   return loginList.reduce((longest, current) => {
//     return current.length >= longest.length ? current : longest;
//   }, loginList[0]);
// }

// let test = longestLogin(["serg22", "tester_2", "Prokopenko", "guest"]); //  Prokopenko
// console.log(test);
// longestLogin(["user1", "user2", "333", "user4", "aa"]); //  user4

//7
// Implement the processArray(arr, factorial) function, which takes the first parameter of the array arr,
// and the second parameter the function factorial and processes each element of the array arr with the function factorial,
// returning a new array(the source array arr does not change)

//The function factorial(n) calculates and returns the factorial of the number n. For example factorial(4) returns 24.

// function factorial(n) {
//   return n != 1 ? n * factorial(n - 1) : 1;
// }

// function processArray(arr, factorial) {
//   return arr.map((el) => factorial(el));
// }

// let test = processArray([1, 2, 3, 4, 5], factorial); // [1, 2, 6, 24, 120]
// console.log(test);

//8
// const func = require("./Checker.js");

// function overloadedFunc(arg1 = [1, 2, 3], arg2 = 2, defaultFunction = func) {
//   if (typeof defaultFunction !== "function") {
//     if (Array.isArray(arg1) && typeof arg2 === "number") {
//       return arg1.map((val) => val * arg2);
//     } else if (typeof arg1 === "number" && typeof arg2 === "number") {
//       return arg1 * arg2;
//     } else {
//       return arg1 * arg2;
//     }
//   }

//   return defaultFunction(arg1, arg2);
// }

//1
//Please, implement a function combineFunctions that takes any number of functions as an argument and returns a function that is a composition of the arguments.

// const combineFunctions = (...funcs) => {
//   return function (x) {
//     return funcs.reduce((acc, currFunc) => currFunc(acc), x);
//   };
// };

//2
//Please, implement a function getLanguages.
// The function takes an array of students as a first parameter
// and a condition on a student (function)
// getLanguages should return an array of languages from students that satisfy a condition.

// function getLanguages(students, condition = () => true) {
//   return students.reduce((languages, student) => {
//     if (condition(student)) {
//       languages.push(...student.languages);
//     }
//     return languages;
//   }, []);
// }
