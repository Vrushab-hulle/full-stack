/**
 * console.log([] == []);       // false
console.log({} == {});       // false
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN == NaN);     // false
console.log(NaN === NaN);    // false

- "" (empty string) is falsy.
- " " (string with a space) is truthy.

console.log([] == 0);  // true concered to primitive-->[].toString()-->""-->0      
console.log([] == false);    // true []-->''-->0 and false-->0
console.log([] == ![]);      // true ![]-->false and []-->''-->0
console.log([1,2] == "1,2"); // true
console.log([0] == 0);       // true
console.log([0] == false);   // true

 */

/**
 * scope is directly related to lexical env.
 * lexical env. is nothing but local scope + lexcial env of its parent
 * closure is function bundled along with its lexical env.
 * e.g module design pattern,currying,data hiding and encapsulation,memoization,setTimeout()
 * disadvantage : over consumption of memory,memory leak,freeze browser
 */

/**
 * Compile time is when code is translated into machine-readable form before execution, and compile-time errors are caught then.
Runtime is when the program is actually running, and runtime errors occur (like null references or undefined variables).
JIT (Just-In-Time compilation) combines both: it compiles code into bytecode first, then optimizes hot code into machine code at runtime.
JavaScript is traditionally an interpreted language, but modern JS engines (like V8) use JIT compilation to achieve
 near-compiled language performance.

 "Hot code" is code that runs very frequently (like loops or commonly called functions).
Modern JavaScript engines detect hot code and use JIT compilation to optimize it into machine code, improving performance.

parsing -->code goes to parsing stage where it is converted to AST 
compilation--> then at complation stage it has jit the ast from previous stage -->goes to interpreter which converts hi-level code to low level code,
  also complier works hand in hand to complie and form optimize code
execution-->code and memory phase
 */

//----------------------------------------------------------------------------------------------------------------------

/**
 * deboucning is a technique used for optimization where we basically executes the function when there is certain pause in event
 */
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = (query) => {
  console.log("searching for", query);
};

const debouncedsearch = debounce(search, 1000);
debouncedsearch("ha");
debouncedsearch("hard");
debouncedsearch("hard js");
debouncedsearch("hard js question");

/**
 * throttling is a optimzation technique where we excutes a function after a particular time frame is passed so in between timeframe
 * all the fn call will be ignored
 */

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
}

const senChatMessage = (query) => {
  console.log("searching for", query);
};

const messagWithSlowMode = throttle(senChatMessage, 2000);
messagWithSlowMode("hi");
messagWithSlowMode("hello");
messagWithSlowMode("hello ji");
messagWithSlowMode("hello ji kaise ho !!!");

//----------------------------------------------------------------------------------------------------------------------

/**
 * fetch vs axios
 * fetch is built in method, need manual error handling(does not handle http errors), we need to parse json
 * axios is external library, handle http error, no need json parser , extra feture(request cancelltion and interceptors)
 */
//----------------------------------------------------------------------------------------------------------------------
/**
 * Is JavaScript Object-Oriented?
 * 
 * js is Prototype-based object-oriented language
 * 
 * In classical OOP (Java, C++):
  Objects are created from classes (blueprints).
  Inheritance is class-based (class x extends y).

  In JavaScript:
  Objects are created from other objects (via prototypes).
  Inheritance is prototype-based (objects can inherit directly from other objects).
  ES6 introduced the class keyword, but it’s just syntactic sugar over prototypes

  🔹 JavaScript OOP features

    Encapsulation → bundling data (properties) and behavior (methods) inside objects.
    Inheritance → objects can inherit properties/methods from prototypes.
    Polymorphism → methods can be overridden in child objects.
    Abstraction → implementation details hidden behind methods

    In JavaScript, polymorphism happens when child objects override methods of parent objects, allowing the same method name (speak) 
    to behave differently depending on the actual object.
 */

//Example 1: Prototype-based OOP (traditional JS)
// Constructor function
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(this.name + " makes a sound.");
};

let dog = new Animal("Dog");
let cat = new Animal("cat"); //poylmorphism as cat can speak in different voice
dog.speak(); // "Dog makes a sound."

/**
 * 👉 Here:
Animal is a constructor function.
Methods are added to Animal.prototype.
dog inherits from Animal.prototype.
 */

class Animals {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + " makes a sound.");
  }
}

class Dog extends Animals {
  speak() {
    console.log(this.name + " barks.");
  }
}

let dogs = new Dog("Bruno");
dogs.speak(); // "Bruno barks."

/**
 * All objects (Animal, Dog, Cat) have a method speak().
    The method name is the same, but the behavior changes depending on the object → that’s runtime polymorphism.
 */

//👉 This looks like Java-style classes, but internally it still uses prototypes.

//---------------------------------------------------------------------------------------------------------------------------
//possible ways to create obj
/*
Use Object.assign when you want to copy/merge properties.
Use Object.create when you want to set up inheritance or control the prototype.
If you call a constructor function without the new keyword, JavaScript will treat it like a regular function — 
and this will not refer to a new object, but to the global object (in browsers, that's window)
*/

const obj = {
  name: "vrushabh",
};
const newObj = new Object();
// console.log("newObj", newObj);

const newObj1 = Object.create(obj);
// console.log("newObj1", newObj1);
// console.log("Prototype of newObj1", Object.getPrototypeOf(newObj1));

const newObj2 = Object.assign({}, obj);
// console.log("newObj2", newObj2);
// console.log("Prototype of newObj2", Object.getPrototypeOf(newObj2));

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const newObj3 = new Person("vrushab", 28);
// console.log("newObj3", newObj3);
// console.log("Prototype of newObj3", Object.getPrototypeOf(newObj3));

function Employee() {}
Employee.prototype.name = "Sudheer";
let object = new Employee();
// console.log("object", object);

class Persons {
  constructor(name) {
    this.name = name;
  }
}

const newObj4 = new Persons("rohit");
// console.log("newObj4", newObj4);

/*
What is a prototype chain
The prototype chain is a core concept in JavaScript’s inheritance model. It allows objects to inherit properties and methods from other
 objects. When you try to access a property or method on an object, JavaScript first looks for it on that object itself. 
 If it’s not found, the engine looks up the object's internal [[Prototype]] reference (accessible via Object.getPrototypeOf(obj) or 
 the deprecated __proto__ property) and continues searching up the chain until it finds the property or reaches the end (usually null).
*/

/*
What is the Difference Between call, apply, and bind
In JavaScript, call, apply, and bind are methods that allow you to control the context (this value) in which a function is executed. 
While their purposes are similar, they differ in how they handle arguments and when the function is invoked.

Key Points
call and apply are almost interchangeable; both invoke the function immediately, but differ in how arguments are passed.
Tip: "Call is for Comma-separated, Apply is for Array."
bind does not execute the function immediately. Instead, it creates a new function with the specified this value and optional arguments,
 which can be called later.
Use call or apply when you want to immediately invoke a function with a specific this context. Use bind when you want to create a 
new function with a specific this context to be invoked later.
*/

var employee1 = { firstName: "John", lastName: "Rodson" };
function invite(greeting1, greeting2) {
  console.log(
    greeting1 + " " + this.firstName + " " + this.lastName + ", " + greeting2
  );
}
invite.call(employee1, "Hello", "How are you?");
invite.apply(employee1, ["Hello", "How are you?"]);
let inviteEmployee1 = invite.bind(employee1);
inviteEmployee1("Hello", "How are you?");

//----------------------------------------------------------------------------------------------------------
/**
 * polyfills --> our implementation of inbuilt function
 * Call
 */
Function.prototype.myCall = (objectContext = {}, ...args) => {
  if (typeof this !== "function") {
    throw new Error("error");
  }
  objectContext.fn = this;
  objectContext.fn(...args);
};

Function.prototype.myApply = (context = {}, args = []) => {
  if (typeof this !== "function") {
    throw new Error();
  }
  if (Array.isArray(args)) {
    throw new Error();
  }
  context.fn = this;
  context.fn(...args);
};

Function.prototype.myBind = (context = {}, ...restArgs) => {
  const self = this;
  return function (...newArgs) {
    self.apply(context, [...restArgs, ...newArgs]);
  };
};
let printName = myName.myBind(object1, "kop");
printName("mh");

// Array.map((num,index,arr)=>{ })
Array.prototype.myMap = function (cb) {
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  // Validation 2: Check if `cb` is a function
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }

  let temp = [];
  //this here will refer to arr we mapped to
  for (let index = 0; index < this.length; index++) {
    //here map return each any every elemt of callback i.e why we are pushing everythng
    temp.push(cb(this[index], index, this));
  }
  return temp;
};

Array.prototype.myFilter = function (cb) {
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }
  let temp = [];

  //this here will refer to arr we mapped to
  for (let index = 0; index < this.length; index++) {
    if (cb(this[index], index, this)) {
      temp.push(this[index]);
    }
  }
  return temp;
};

// Array.reduce((acc,curr,index,arr)=>{ },intialValue)

Array.prototype.myReduce = function (cb, initialValue) {
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = initialValue;
  let startIndex = 0;

  // Handle case where no initialValue is provided
  if (initialValue === undefined) {
    acc = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }

  return acc;
};
//----------------------------------------------------------------------------------------------------------

/*
What is JSON and its common operations
JSON (JavaScript Object Notation) is a lightweight, text-based data format that uses JavaScript object syntax for structuring data
*/

// const jsonString = '{"name":"John","age":30}';
// const jsObj = JSON.parse(jsonString);

// const obj1 = { name: "Jane", age: 25 };
// const jsonStr = JSON.stringify(obj1);

/**
 * What is the purpose of the array slice method
 * start: The index at which extraction begins (inclusive).
   end (optional): The index before which to end extraction (exclusive). If omitted, extraction continues to the end of the array.
   The slice() method does not mutate (change) the original array; instead, it returns a new array containing the extracted elements.
 */

let arrayIntegers = [1, 2, 3, 4, 5];

let arrayIntegers1 = arrayIntegers.slice(0, 2);
let arrayIntegers2 = arrayIntegers.slice(2, 3);
let arrayIntegers3 = arrayIntegers.slice(4);
let arrayIntegers4 = arrayIntegers.slice(-3, -1);
// console.log(arrayIntegers);

/**
 * What is the purpose of the array splice method
 * The splice() method in JavaScript is used to add, remove, or replace elements within an array. Unlike slice(),
 * which creates a shallow copy and does not alter the original array, splice() modifies the original array in place and
 *  returns an array containing the removed elements.
 */

let arrayIntegersOriginal1 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal2 = [1, 2, 3, 4, 5];
let arrayIntegersOriginal3 = [1, 2, 3, 4, 5];

console.log(arrayIntegersOriginal1.splice(0, 2));
console.log(arrayIntegersOriginal2.splice(3));
console.log(arrayIntegersOriginal3.splice(3, 1, 45));
console.log(arrayIntegersOriginal3);

/**
 * Object
 * Key Types	    Only strings and symbols are valid keys
 * Size Property	No built-in way to get the number of keys; must use Object.keys(obj).length
 * Iterability	    Not directly iterable; must use Object.keys, Object.values, or Object.entries
 *
 * Map
 * Any value can be used as a key (objects, functions, primitives)
 * Use the .size property for the number of entries
 * Directly iterable with for...of, .keys(), .values(), .entries()
 */

for (let [key, value] of Object.entries(obj)) {
  // ✅ Works
  console.log(key, value);
}

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (let [key, value] of map) {
  // ✅ Works directly
  console.log(key, value);
}
// a 1
// b 2
// c 3

/**
 * What is the difference between == and === operators
 */

// 0 == false            // true      (loose equality, type coercion)
// 0 === false           // false     (strict equality, different types)
// 1 == "1"              // true      (string converted to number)
// 1 === "1"             // false     (different types)
// null == undefined     // true      (special case)
// null === undefined    // false     (different types)
// '0' == false          // true      ('0' is converted to 0)
// '0' === false         // false     (different types)
// NaN == NaN            // false     (NaN is never equal to itself)
// NaN === NaN           // false
// [] == []              // false     (different array objects)
// [] === []             // false
// {} == {}              // false     (different object references)
// {} === {}             // false

/**
 * What are lambda expressions or arrow functions
 *  Arrow functions do not have their own this, arguments, super, or new.target bindings. They inherit these from their surrounding (lexical)
    context.They are best suited for non-method functions, such as callbacks or simple computations.
    Arrow functions cannot be used as constructors and do not have a prototype property.
    They also cannot be used with new, yield, or as generator functions.
 */

/**
* What is a first class function
* In JavaScript, first-class functions(first-class citizens) mean that functions are treated like any other variable. That means:
You can assign a function to a variable.
You can pass a function as an argument to another function.
You can return a function from another function.
This capability enables powerful patterns like callbacks, higher-order functions, event handling, and functional programming in JavaScript.
For example, the handler function below is assigned to a variable and then passed as an argument to the addEventListener method.
*/

const handler = () => console.log("This is a click handler function");
document.addEventListener("click", handler);

/**
 * What is a first order function
A first-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value. 
i.e, It's a regular function that works with primitive or non-function values.
 */
const firstOrder = () => console.log("I am a first order function!");

/**
 * What is a higher order function
A higher-order function is a function that either accepts another function as an argument, returns a function as its result, or both.
In this example:
firstOrderFunc is a regular (first-order) function.
higherOrder is a higher-order function because it takes another function as an argument.
firstOrderFunc is also called a callback function because it is passed to and executed by another function.
 */

// First-order function (does not accept or return another function)
const firstOrderFunc = () => console.log("Hello, I am a first-order function");

// Higher-order function (accepts a function as an argument)
const higherOrder = (callback) => callback();

// Passing the first-order function to the higher-order function
higherOrder(firstOrderFunc);

/**
 * What is the currying function
 * Currying is the process of transforming a function with multiple arguments into a sequence of nested functions,
 *  each accepting only one argument at a time.
 * Encourages clean, modular code → You can split logic into smaller single-responsibility functions.
 */

const multiArgFunction = (a, b, c) => a + b + c;
console.log(multiArgFunction(1, 2, 3)); // Output: 6

const curryUnaryFunction = (a) => (b) => (c) => a + b + c;
console.log(curryUnaryFunction(1)); // Returns: function (b) => ...
console.log(curryUnaryFunction(1)(2)); // Returns: function (c) => ...
console.log(curryUnaryFunction(1)(2)(3)); // Output: 6

/**
 * A pure function always:
Returns the same output for the same input.
Has no side effects (doesn’t modify external state, global variables, files, DB, etc.).

An impure function:
Depends on external state OR
Changes something outside of itself (side effects).
 */

// Pure Function
function add(a, b) {
  return a + b; // Always returns the same result for given inputs
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (same output every time)

// let counter = 0;

// Impure Function
function increment() {
  // counter++;  // modifies external state
  // return counter;
}

console.log(increment()); // 1
console.log(increment()); // 2 (different output with same input!)

/**
 * What is the purpose of the let keyword
 * the let keyword in JavaScript is used to declare a block-scoped local variable. This means that variables declared with let are 
 * only accessible within the block, statement, or expression where they are defined. This is a significant improvement over the 
 * older var keyword, which is function-scoped 
 * 
 * Key Features of let:
  Block Scope: The variable exists only within the nearest enclosing block (e.g., inside an {} pair).
  No Hoisting Issues: While let declarations are hoisted, they are not initialized until the code defining them is executed. 
  Accessing them before declaration results in a ReferenceError (temporal dead zone).
  No Redeclaration: The same variable cannot be declared twice in the same scope with let.
 */

console.log(counter); //undefined for var and ref. error for let due to tdz

var counter = 30;
if (counter === 30) {
  let counter = 31;
  console.log(counter); // Output: 31 (block-scoped variable inside if-block)
}
console.log(counter); // Output: 30 (outer variable, unaffected by inner block)

function userDetails(username) {
  if (username) {
    console.log(salary); // undefined due to hoisting
    // console.log(age); // ReferenceError: Cannot access 'age' before initialization
    let age = 30;
    var salary = 10000;
  }
  console.log(salary); //10000 (accessible due to function scope)
  // console.log(age); //error: age is not defined(due to block scope)
}
userDetails("John");

/**
 * What is the Temporal Dead Zone
 * The Temporal Dead Zone (TDZ) refers to the period between the start of a block and the point where a variable declared with
 *  let or const is initialized. During this time, the variable exists in scope but cannot be accessed, and attempting to do so results
 *  in a ReferenceError.
 */

/**
 * What is an IIFE (Immediately Invoked Function Expression)
 * IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. 
 * The signature of it would be as below,
 The primary reason to use an IIFE is to obtain data privacy because any variables declared within the IIFE cannot be accessed by 
 the outside world. i.e, If you try to access variables from the IIFE then it throws an error as below,
*/

(function () {
  var message = "IIFE";
  console.log(message);
})();
// console.log(message); //Error: message is not defined

/**
 * How do you decode or encode a URL in JavaScript?
 * encodeURI() function is used to encode an URL. This function requires a URL string as a parameter and return that encoded string.
 * decodeURI() function is used to decode an URL. This function requires an encoded URL string as parameter and return that decoded string.
 */

let city = "New York, USA";
let url = `https://api.weather.com/getWeather?city=${city}`;
let encodedUrl = encodeURI(url);

console.log(encodedUrl); //https://api.weather.com/getWeather?city=New%20York,%20USA

// ✅ encodeURI safely encoded spaces into %20.
// ❌ But it did not encode ? and = and &, since they’re valid in a full URL.

/**
 * What is Hoisting
 * Hoisting is a JavaScript mechanism where variables, function declarations and classes are moved to the top of their scope before
 * code execution. Remember that JavaScript only hoists declarations, not initialisation. Let's take a simple example of variable hoisting,
 */

//---------------------------------------------------------------------------------------------------
/**
 * What are classes in ES6
 * In ES6, Javascript classes are primarily syntactic sugar over JavaScript’s existing prototype-based inheritance.
 * For example, the prototype based inheritance written in function expression as below,
 */

function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has " + this.color + " color";
};
const newBike = new Bike("ferrari", "red");
console.log(newBike.getDetails());

// class Bike {
//   constructor(color, model) {
//     this.color = color;
//     this.model = model;
//   }

//   getDetails() {
//     return this.model + " bike has" + this.color + " color";
//   }
// }

//---------------------------------------------------------------------------------------------------

/**
 * What are closures
 * A closure is the combination of a function bundled(enclosed) together with its lexical environment within which that function was declared.
 * i.e, It is an inner function that has access to the outer or enclosing function’s variables, functions and other data even after the 
 * outer function has finished its execution. The closure has three scope chains.
 *  Own scope where variables defined between its curly brackets
Outer function's variables
Global variables
*/

function outer(name) {
  setTimeout(() => {
    console.log("hii " + name);
  }, 2000);
  console.log("waiting for 2 sec");
}

// outer("vrushbah");

function Welcome(name) {
  var greetingInfo = function (message) {
    console.log(message + " " + name);
  };
  return greetingInfo;
}
var myFunction = Welcome("John");
myFunction("Welcome "); //Output: Welcome John
myFunction("Hello Mr."); //output: Hello Mr. John

//---------------------------------------------------------------------------------------------------
/**
 * What is scope in javascript
 * Scope is the accessibility of variables, functions, and objects in some particular part of your code during runtime.
 * In other words, scope determines the visibility of variables and other resources in areas of your code.
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is a Cookie
A cookie is a piece of data that is stored on your computer to be accessed by your browser. Cookies are saved as key/value pairs. 
For example, you can create a cookie named username as below,
When a user visits a web page, the user profile can be stored in a cookie.
Next time the user visits the page, the cookie remembers the user profile.
*/

/**
 * What are the differences between cookie, local storage and session storage
 *
 * Cookie
 * Accessed on client or server side: Both server-side & client-side. The set-cookie HTTP response header is used by server inorder
 * to send it to user.
 * Expiry: Manually configured using Expires option
 * Maximum data size:4KB
 * Accessible from:Any window
 * Sent with requests	Yes
 *
 * Local storage
 * client-side only
 * Forever until deleted
 * 5 MB
 * Any window
 * No
 *
 * Session storage
 * client-side only
 * until tab is closed
 * 5MB
 * Same tab
 * No
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is a promise
 * A Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value
 * A Promise can be in one of three states:
pending: Initial state, neither fulfilled nor rejected.
    fulfilled: The operation completed successfully.
    rejected: The operation failed (e.g., due to a network error).
    
    Why do you need a promise
    Handle asynchronous operations.
    Provide a cleaner alternative to callbacks.
    Avoid callback hell.
    Make code more readable and maintainable. 
    
    Why do we need callbacks
    The callbacks are needed because javascript is an event driven language. That means instead of waiting for a response, 
    javascript will keep executing while listening for other events.

    What are the main rules of promise
    A promise must follow a specific set of rules:
    A promise is an object that supplies a standard-compliant .then() method
    A pending promise may transition into either fulfilled or rejected state
    A fulfilled or rejected promise is settled and it must not transition into any other state.
    Once a promise is settled, the value must not change.

    What is promise chaining
    The process of executing a sequence of asynchronous tasks one after another using promises is known as Promise chaining.

    A Promise is in one of these states:
    pending: initial state, neither fulfilled nor rejected.
    fulfilled: meaning that the operation was completed successfully.
    rejected: meaning that the operation failed.

    // 💡 async function always returns a promise, even if I return a simple string from below
    function, async keyword will wrap it under Promise and then return.
    */

//    const promise = new Promise((resolve, reject) => {
//      setTimeout(() => {
//        resolve("I'm a Promise!");
//       }, 5000);
// });

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value!!");
  }, 3000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved value by p2!!");
  }, 2000);
});

// 📌 Promise.then/.catch way
function getData() {
  // JS engine will not wait for promise to be resolved
  p.then((res) => console.log(res));
  console.log("Hello There!");
}
getData();
// First `Hello There!` would be printed and then after 3 secs 'Promise resolved value!!' will be printed.

// 📌 async-wait way:
async function handlePromise() {
  // JS Engine will waiting for promise to resolve.
  const val = await p;
  console.log("Hello There!");
  console.log(val);
}
handlePromise();
// This time `Hello There!` won't be printed immediately instead after 3 secs `Hello There!` will be printed followed by 'Promise resolved value!!'
// 💡 So basically code was waiting at `await` line to get the promise resolve before moving on to next line.
// Above is the major difference between Promise.then/.catch vs async-await

// promise
// .then((value) => console.log(value)) // Logs after 5 seconds: "I'm a Promise!"
// .catch((error) => console.error(error)) // Handles any rejection
// .finally(() => console.log("Done")); // Runs regardless of success or failure

async function handlePromise() {
  console.log("Hi");
  const val = await p;
  console.log("Hello There!");
  console.log(val);
  const val2 = await p;
  console.log("Hello There! 2");
  console.log(val2);
}
handlePromise();
/* In above code example, will our program wait for 2 time or will it execute parallely.
📌 `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises
will be resolved so ('Hello There!' 'Promise resolved value!!' 'Hello There! 2' 'Promise
resolved value!!') will get printed immediately.*/

async function handlePromise() {
  console.log("Hi");
  const val = await p;
  console.log("Hello There!");
  console.log(val);
  const val2 = await p2;
  console.log("Hello There! 2");
  console.log(val2);
}
handlePromise();
/**
 * // 📌 `Hi` printed instantly -> now code will wait for 3 secs -> After 3 secs both promises
will be resolved so ('Hello There!' 'Promise resolved value!!' 'Hello There! 2' 'Promise
resolved value by p2!!') will get printed immediately. So even though `p2` was resolved
after 2 secs it had to wait for `p` to get resolved

in reverse case p2 first and then p

// 📌 `Hi` printed instantly -> now code will wait for 2 secs -> After 2 secs ('Hello
There!' 'Promise resolved value by p2!!') will get printed and in the subsequent second
i.e. after 3 secs ('Hello There! 2' 'Promise resolved value!!') will get printed
 */

/**
 * promise.all() 
 * resolve --> result in array [val1,val2,val3]
 * reject --> return first rejected promise [err]
 * 
 * promise.allSettled()
 * resolve --> [val1,val2,val3]
 * reject --> [val1,err,val2]
 * 
 * promise.race()
 * first fullfilled promise either resoved or rejected
 * 
 * promise.any()
 * seek for first reolved promise
 *  But what if all promises got failed, so the returned result will be aggregated error i.e. [err1, err2, err3].
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is the purpose of double exclamation
The double exclamation or negation(!!) ensures the resulting type is a boolean. If it was falsey (e.g. 0, null, undefined, etc.), 
  it will be false, otherwise, it will be true.
  */

//---------------------------------------------------------------------------------------------------
/**
  * What is the purpose of the delete operator
The delete operator is used to delete the property as well as its value.
   */
var user = { firstName: "John", lastName: "Doe", age: 20 };
delete user.age;

console.log(user); // {firstName: "John", lastName:"Doe"}

//---------------------------------------------------------------------------------------------------
/**
 * What is the difference between null and undefined
 * Null:
 * It is an assignment value which indicates that variable points to no object.
 * Type of null is object
 * Indicates the absence of a value for a variable
 *
 * Undefined
 * It is not an assignment value where a variable has been declared but has not yet been assigned a value.
 * Type of undefined is undefined
 * Indicates absence of variable itself
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is eval
 * The eval() function evaluates JavaScript code represented as a string.
 */
console.log(eval("1 + 2")); //  3

//---------------------------------------------------------------------------------------------------
/**
 * What is the difference between window and document
 * It is the root level element in any web page
 * It has methods like alert(), confirm() and properties like document, location
 *
 * It is the direct child of the window object. This is also known as Document Object Model (DOM)
 * It provides methods like getElementById, getElementsByTagName, createElement etc
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is isNaN
The isNaN() function is used to determine whether a value is an illegal number (Not-a-Number) or not.
 */
isNaN("Hello"); //true
isNaN("100"); //false

//---------------------------------------------------------------------------------------------------
/**
 * What are the differences between undeclared and undefined variables
 * undeclared	
    These variables do not exist in a program and are not declared
    If you try to read the value of an undeclared variable, then a runtime error is encountered
   undefined
    These variables declared in the program but have not assigned any value
    If you try to read the value of an undefined variable, an undefined value is returned.
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is an event flow
 * Event flow refers to the order in which events are handled in the browser when a user interacts with elements on a webpage like 
 * clicking, typing, hovering, etc.
 * 
 * When you click an element that is nested in various other elements, before your click actually reaches its destination, 
 * or target element, it must trigger the click event for each of its parent elements first, starting at the top with the global window object.
 * 
 * Hence, there are three phases in JavaScript’s event flow:
    Event Capturing(Top to Bottom): The event starts from the window/document and moves down the DOM tree toward the target element.
    Target phase: The event reaches the target element — the element that was actually interacted with.
    Event Bubbling(Bottom to Top): The event then bubbles back up from the target element to the root.
 */
//---------------------------------------------------------------------------------------------------
/**
 * What is event capturing
 * Event capturing is a phase of event propagation in which an event is first intercepted by the outermost ancestor element, 
 * then travels downward through the DOM hierarchy until it reaches the target (innermost) element.
   To handle events during the capturing phase, you need to pass true as the third argument to the addEventListener method.
 */

const parent = document.querySelector("div");
const child = document.querySelector(".child");

// Capturing phase: parent listener (runs first)
parent.addEventListener(
  "click",
  function () {
    console.log("Parent (capturing)");
  },
  true
); // `true` enables capturing

// Bubbling phase: child listener (runs after)
child.addEventListener("click", function () {
  console.log("Child (bubbling)");
});

/**
 * What is event bubbling
 * Event bubbling is a type of event propagation in which an event first triggers on the innermost target element
 * (the one the user interacted with), and then bubbles up through its ancestors in the DOM hierarchy — eventually reaching
 *  the outermost elements, like the document or window.
 *
 * By default, event listeners in JavaScript are triggered during the bubbling phase, unless specified otherwise.
 */

//---------------------------------------------------------------------------------------------------
/**
 * What is same-origin policy
The same-origin policy is a policy that prevents JavaScript from making requests across domain boundaries. 
An origin is defined as a combination of URI scheme, hostname, and port number. If you enable this policy then it prevents a malicious
 script on one page from obtaining access to sensitive data on another web page using Document Object Model(DOM).
 */
//---------------------------------------------------------------------------------------------------

/**
 * Is JavaScript a compiled or interpreted language
 * JavaScript is an interpreted language, not a compiled language. An interpreter in the browser reads over the JavaScript code,
 * interprets each line, and runs it. Nowadays modern browsers use a technology known as Just-In-Time (JIT) compilation,
 *  which compiles JavaScript to executable bytecode just as it is about to run.
 */
//---------------------------------------------------------------------------------------------------

/**
 * What is the use of stopPropagation method
 * The stopPropagation method is used to stop the event from bubbling up the event chain.
 */

function firstFunc(event) {
  alert("DIV 1");
  // event.stopPropagation();
}

function secondFunc() {
  alert("DIV 2");
}

//---------------------------------------------------------------------------------------------------

/**
 * What is BOM
 * The Browser Object Model (BOM) allows JavaScript to "talk to" the browser. It consists of the objects navigator, history,
 * screen, location and document which are children of the window
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is an event delegation
 * Event delegation is a technique for listening to events where you delegate a parent element as the listener for all of the events
 *  that happen inside it.
 *
 * For example, if you wanted to detect field changes inside a specific form, you can use event delegation technique,
 */
// var form = document.querySelector("#registration-form");

// // Listen for changes to fields inside the form
// form.addEventListener(
//   "input",
//   function (event) {
//     // Log the field that was changed
//     console.log(event.target);
//   },
//   false
// );
//---------------------------------------------------------------------------------------------------

/**
 * Why do you need JSON
  When exchanging data between a browser and a server, the data can only be text. Since JSON is text only, it can easily be sent to and
  from a server, and used as a data format by any programming language.
 */
//---------------------------------------------------------------------------------------------------

/**
 * How do you check whether a string contains a substring
 */

var mainString = "hello",
  subString = "hell";
console.log(mainString.includes(subString));

//---------------------------------------------------------------------------------------------------

/**
 * How do you check if a key exists in an object
 * "key" in obj;
 * !("key" in obj);
 *
 *  You can use hasOwnProperty to particularly test for properties of the object instance (and not inherited properties)
 * obj.hasOwnProperty("key"); // true
 */

//---------------------------------------------------------------------------------------------------
/**
 * How do you loop through or enumerate javascript object
 */
var newObject = {
  k1: "value1",
  k2: "value2",
  k3: "value3",
};

for (var key in newObject) {
  if (newObject.hasOwnProperty(key)) {
    console.log(key + " -> " + newObject[key]); // k1 -> value1 ...
  }
}
//---------------------------------------------------------------------------------------------------

/**
 * How do you test for an empty object
 * // Since date object length is 0, you need to check constructor check as well
 * Object.entries(obj).length === 0 && obj.constructor === Object; */
//---------------------------------------------------------------------------------------------------

/**
 * What is an arguments object
 * The arguments object is an Array-like object accessible inside functions that contains the values of the arguments passed to
 *  that function. For example, let's see how to use arguments object inside sum function,
 */
function sum() {
  var total = 0;
  for (var i = 0, len = arguments.length; i < len; ++i) {
    total += arguments[i];
  }
  return total;
}

sum(1, 2, 3); // returns 6

//Note: You can't apply array methods on arguments object. But you can convert into a regular array as below.

// let argsArray = Array.prototype.slice.call(arguments);
//---------------------------------------------------------------------------------------------------

/**
 * How do you make first letter of the string in an uppercase
 */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * How do you display the current date in javascript
 */
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0! so we do +1
let yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;
document.write(today);

/**
 * You can use Math.random() with Math.floor() to return random integers. For example, if you want generate random integers between 1 to 10,
 *  the multiplication factor should be 10,
Note: Math.random() returns a random number between 0 (inclusive), and 1 (exclusive)
 * 
 */
Math.floor(Math.random() * 10) + 1; // returns a random integer from 1 to 10
Math.floor(Math.random() * 100) + 1; // returns a random integer from 1 to 100

//---------------------------------------------------------------------------------------------------

/**
 * What is the way to find the number of parameters expected by a function
 *
 */
function sum(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4;
}
sum.length; // 4 is the number of parameters expected.
console.log(3 - "3");

//---------------------------------------------------------------------------------------------------

/**
 * What is the freeze method
The freeze() method is used to freeze an object. Freezing an object does not allow adding new properties to an object, prevents removing, 
and prevents changing the enumerability, configurability, or writability of existing properties. i.e. It returns the passed object and 
does not create a frozen copy.

Remember freezing is only applied to the top-level properties in objects but not for nested objects

What are the differences between the freeze and seal methods
If an object is frozen using the Object.freeze() method then its properties become immutable and no changes can be made in them whereas
 if an object is sealed using the Object.seal() method then the changes can be made in the existing properties of the object.
 */

const objs = {
  prop: 100,
};

Object.freeze(objs);
objs.prop = 200; // Throws an error in strict mode

console.log(objs.prop); //100
//---------------------------------------------------------------------------------------------------

/**
 * What is a rest parameter
 * Rest parameter is an improved way to handle function parameters which allows us to represent an indefinite number of arguments as an array.
 *  The syntax would be as below,
 * 
 * What happens if you do not use rest parameter as a last argument
The rest parameter should be the last argument, as its job is to collect all the remaining arguments into an array. For example, 
if you define a function like below it doesn’t make any sense and will throw an error.
 */
function f(a, b, ...theArgs) {
  // ...
}
// function someFunc(a,…b,c){
// //You code goes here
// return;
// }
//---------------------------------------------------------------------------------------------------

/**
How do you copy properties from one object to other
 * Object.assign(target, ...sources);

As observed in the  code, there is a common property(b) from source to target so it's value has been overwritten.
 */

const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const returnedTarget = Object.assign(target, source);

console.log(target); // { a: 1, b: 3, c: 4 }

console.log(returnedTarget); // { a: 1, b: 3, c: 4 }

//---------------------------------------------------------------------------------------------------

/**
 * How do you create an object with a prototype
 * The Object.create() method is used to create a new object with the specified prototype object and properties.
 */

const users = {
  name: "John",
  printInfo: function () {
    console.log(`My name is ${this.name}.`);
  },
};

const admin = Object.create(users);
console.log(admin);

admin.name = "Nick"; // Remember that "name" is a property set on "admin" but not on "user" object
admin.printInfo(); // My name is Nick

//---------------------------------------------------------------------------------------------------

/**
 * What is an anonymous function
An anonymous function is a function without a name! Anonymous functions are commonly assigned to a variable name or used as a callback function
. The syntax would be as below,
 */

(function (optionalParameters) {
  //do something
});

const myFunctions = function () {
  //Anonymous function assigned to a variable
  //do something
};

[1, 2, 3].map(function (element) {
  //Anonymous function used as a callback function
  //do something
});

//---------------------------------------------------------------------------------------------------

/**
 * What are primitive data types
A primitive data type is data that has a primitive value (which has no properties or methods). There are 7 types of primitive data types.
string
number
boolean
null
undefined
bigint
symbol
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is an error object
An error object is a built in error object that provides error information when an error occurs.
 It has two properties: name and message. For example, the below function logs error details,
 */

try {
  greeting("Welcome");
} catch (err) {
  console.log(err.name + "<br>" + err.message);
}

//---------------------------------------------------------------------------------------------------

/**
 * What is Intl?

Intl is a built-in global object in JavaScript (introduced in ECMAScript Internationalization API).
It provides language-sensitive (locale-aware) functionality:
Number formatting
Date & time formatting
Currency formatting
String comparison
Plural rules
In short: Intl helps format data for different languages and regions 🌍.
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is the event loop
 *
 * The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not the call stack
 * is empty. If the call stack is empty and there are pending events in the event queue, the event loop dequeues the event from the event
 * queue and pushes it to the call stack. The call stack executes the event, and any additional events generated during the execution are
 * added to the end of the event queue.
 *
 * What is the event queue
 *
 * The event queue follows the queue data structure. It stores async callbacks to be added to the call stack.
 * It is also known as the Callback Queue or Macrotask Queue.
 *
 * Whenever the call stack receives an async function, it is moved into the Web API. Based on the function, Web API executes it and
 * awaits the result. Once it is finished, it moves the callback into the event queue (the callback of a promise is moved into the
 * microtask queue).
 *
 * The event loop constantly checks whether or not the call stack is empty. Once the call stack is empty and there is a callback in the
 *  event queue, the event loop moves the callback into the call stack. But if there is a callback in the microtask queue as well, it is
 * moved first. The microtask queue has a higher priority than the event queue.
 *
 */

//---------------------------------------------------------------------------------------------------

/**
 * What happens if you write constructor more than once in a class
 * The "constructor" in a class is a special method and it should be defined only once in a class. i.e, If you write a constructor
 *  method more than once in a class it will throw a SyntaxError error.
 *
 * You can use the super keyword to call the constructor of a parent class. Remember that super() must be called before using this reference.
 *  Otherwise it will cause a reference error. Let's the usage of it,
 */
class Rectangle {}
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = "Square";
  }

  get area() {
    return this.width * this.height;
  }

  set area(value) {
    this.area = value;
  }
}

//---------------------------------------------------------------------------------------------------

/**
 * What are the different methods to find HTML elements in DOM
If you want to access any element in an HTML page, you need to start with accessing the document object. 
Later you can use any of the below methods to find the HTML element,

document.getElementById(id): It finds an element by Id
document.getElementsByTagName(name): It finds an element by tag name (returns an node list)
document.getElementsByClassName(name): It finds an element by class name (returns an node list)
document.querySelector(cssSelector): It finds an element by css selector
document.querySelectorAll(cssSelector): It finds all elements by css selector (returns a node list)
 */

//---------------------------------------------------------------------------------------------------

/**
 * Why do we call javascript as dynamic language
JavaScript is a loosely typed or a dynamic language because variables in JavaScript are not directly associated with any particular 
value type, and any variable can be assigned/reassigned with values of all types.
 */
let age = 50; // age is a number now
age = "old"; // age is a string now
age = true; // age is a boolean

//---------------------------------------------------------------------------------------------------

/**
 * List down some of the features of ES6
 * Below are the list of some new features of ES6,
    Support for constants or immutable variables
    Block-scope support for variables, constants and functions
    Arrow functions
    Default parameters
    Rest and Spread Parameters
    Template Literals
    Multi-line Strings
    Destructuring Assignment
    Enhanced Object Literals
    Promises
    Classes
    Modules
 */

//---------------------------------------------------------------------------------------------------

/**
 * Do all objects have prototypes
  No. All objects have prototypes except two exceptions:

  Object.prototype itself — This is the base object in the prototype chain, and its prototype is null.
  Objects created with **Object.create(null)** — These are deliberately created with no prototype, so they don’t inherit from Object.prototype.
  All other standard objects do have a prototype.
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is the difference between Shallow and Deep copy
 * 
 * ways to create shallow copy
 * {...obj}
 * Object.assign({},obj)
 * 
 * Ways to Create Deep Copy in JavaScript
    structuredClone() (modern, Node 17+, browsers)
    JSON.parse(JSON.stringify(obj)) (simple but loses methods, dates, etc.)
 * 
 */
var empDetails = {
  name: "John",
  age: 25,
  expertise: "Software Developer",
};
// var empDetailsShallowCopy = empDetails; //shared reference
var empDetailsShallowCopy = Object.assign({}, empDetails); //Shallow copying! or {...empDetails} also work
empDetailsShallowCopy.name = "Johnson";
console.log("empDetails", empDetails);

//---------------------------------------------------------------------------------------------------

/**
 * What is the output of below function calls
 */
const circle = {
  radius: 20,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};
console.log(circle.diameter());
console.log(circle.perimeter());

/**
 * The output is 40 and NaN. Remember that diameter is a regular function, whereas the value of perimeter is an arrow function.
 * The this keyword of a regular function(i.e, diameter) refers to the surrounding scope which is a class(i.e, Shape object).
 * Whereas this keyword of perimeter function refers to the surrounding scope which is a window object. Since there is no radius property
 *  on window objects it returns an undefined value and the multiple of number value returns NaN value.
 *
 */
//---------------------------------------------------------------------------------------------------

/**
 * What happens with negating an array
 *
 * If you prepend the additive(+) operator on falsy values(null, undefined, NaN, false, ""), the falsy value converts to a number value zero.
 */

console.log(![]); // false
console.log(["a"] + ["b"]); // "ab"
console.log([] + []); // ""
console.log(![] + []); // "false", because ![] returns false.

console.log(+null); // 0
console.log(+undefined); // NaN
console.log(+false); // 0
console.log(+NaN); // NaN
console.log(+""); // 0

//---------------------------------------------------------------------------------------------------

/**
 * How do you map the array values without using map method
You can map the array values without using the map method by just using the from method of Array. Let's map city names from Countries array,

How do you create an array with some data
You can create an array with some data or an array with the same values using fill method.

*/

const countries = [
  { name: "India", capital: "Delhi" },
  { name: "US", capital: "Washington" },
  { name: "Russia", capital: "Moscow" },
  { name: "Singapore", capital: "Singapore" },
  { name: "China", capital: "Beijing" },
  { name: "France", capital: "Paris" },
];

const cityNames = Array.from(countries, ({ capital }) => capital);
console.log(cityNames); // ['Delhi, 'Washington', 'Moscow', 'Singapore', 'Beijing', 'Paris']

var newArray = new Array(5).fill("0");
console.log(newArray); // ["0", "0", "0", "0", "0"]

const user1 = { name: "John", id: 1, city: "Delhi" };
console.dir(user1);

//---------------------------------------------------------------------------------------------------

/**
 * What is AJAX
AJAX stands for Asynchronous JavaScript and XML and it is a group of related technologies(HTML, CSS, JavaScript, XMLHttpRequest API etc) 
used to display data asynchronously. i.e. We can send data to the server and get data from the server without reloading the web page.

What are the different ways to deal with Asynchronous Code
Below are the list of different ways to deal with Asynchronous code.

Callbacks
Promises
Async/await
Third-party libraries such as async.js,bluebird etc
 */
//---------------------------------------------------------------------------------------------------

/**
 * What is microtask
A microtask is a type of JavaScript callback that is scheduled to run immediately after the currently executing script and before the 
next event loop tick. Microtasks are executed after the current task completes and before any new tasks (macrotasks) are run. 
This ensures a fast and predictable update cycle.
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is heap
 *
 * Heap(Or memory heap) is the memory location where objects are stored when we define variables. i.e, This is the place where all the
 * memory allocations and de-allocation take place. Both heap and call-stack are two containers of JS runtime. Whenever runtime comes
 *  across variables and function declarations in the code it stores them in the Heap.
 *
 */
//---------------------------------------------------------------------------------------------------

var myPrimitive = 30;
var myNonPrimitive = {};
function isPrimitive(val) {
  return Object(val) !== val;
}

console.log(isPrimitive(myPrimitive));

console.log(isPrimitive(myNonPrimitive));
//---------------------------------------------------------------------------------------------------

/**
 * What is the difference between function and class declarations
The main difference between function declarations and class declarations is hoisting. 
The function declarations are hoisted but not class declarations.

const user = new User(); // ReferenceError
class User {}

const user = new User(); // No error
function User() {}
 */

//---------------------------------------------------------------------------------------------------

/**
 * What are the differences between for...of and for...in statements
 */

let person = { name: "Alex", age: 25 };

//Best used for objects, not arrays.
for (let key in person) {
  console.log(key, ":", person[key]);
}

//Best used for arrays, strings, collections.
for (let [key, value] of Object.entries(person)) {
  console.log(key, ":", value);
}
//---------------------------------------------------------------------------------------------------

/**
 * What is pass by value and pass by reference?
 * Pass-by-value creates a new space in memory and makes a copy of a value. Primitives such as string, number,
 *  boolean etc will actually create a new copy.
 *
 * Pass by reference doesn't create a new space in memory but the new variable adopts a memory address of an initial variable.
 *
 */
let a = 5;
let b = a;

b++;
console.log(a, b); //5, 6
//---------------------------------------------------------------------------------------------------

/**
 * What is the purpose of the this keyword in JavaScript?
 *
 * The this keyword in JavaScript refers to the object that is executing the current function.
 * Its value is determined by how a function is called, not where it is defined.
 *
 * In a regular function, this refers to the global object(window in browser and global in nodejs) for non-strict mode.
 * In strict mode, it's value is undefined.
 *
 * In a method, this refers to the object that owns the method (person in the case).
 *
 * Arrow functions do not have their own this binding; they inherit it from their surrounding (lexical) context.
 *
 * When used with new, this refers to the newly created object.
 */

console.log(this);

function displayThis() {
  console.log(this);
}

displayThis();

const persons = {
  name: "John",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

persons.greet();

const objs1 = {
  age: 42,
  regular: function () {
    console.log(this.age);
  },
  arrow: () => {
    console.log(this.age);
  },
};
objs1.regular(); // 42 (this refers to obj)
objs1.arrow(); // undefined (this refers to the outer scope, not obj)

function Person(name) {
  this.name = name;
}

const p1 = new Person("Sudheer");
console.log(p1.name); // Sudheer

//---------------------------------------------------------------------------------------------------

/**
 * What are the phases of execution context?
 * 
 * The execution context has two phases:

Creation phase: In this phase, the JavaScript engine creates the execution context and sets up the script's environment. 
This includes creating the variable object and the scope chain.

Execution phase: In this phase, the JavaScript engine executes the code in the execution context.

The execution context is created when a function is called. The function's code is then executed in the execution context. 
When the function returns, the execution context is destroyed.
 */

//---------------------------------------------------------------------------------------------------

/**
 * What are the possible reasons for memory leaks?
Memory leaks can lead to poor performance, slow loading times and even crashes in web applications. 
Some of the common causes of memory leaks are listed below,

The execessive usage of global variables or omitting the var keyword in local scope.
Forgetting to clear the timers set up by setTimeout or setInterval.
Closures retain references to variables from their parent scope, which leads to variables might not garbage collected even they 
are no longer used.
 */

//---------------------------------------------------------------------------------------------------

/**
 * How do you create polyfills for map, filter and reduce methods?
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is the difference between map and forEach functions?
 * 
 *  Executes a function for each element in an array.
    Does not return a new array → always returns undefined.
    Typically used for side effects (e.g., logging, updating external variables).

    🔹 map()
    Executes a function for each element in an array.
    Returns a new array with the results.
    Used for transformation (e.g., doubling numbers, converting formats).
 */

let arr = [1, 2, 3];

let doubled = arr.map((num) => {
  return num * 2;
});

console.log(doubled); // [2, 4, 6]

//---------------------------------------------------------------------------------------------------

/**
 * What are the different ways to execute external scripts?

There are three different ways to execute external scripts,

async: The script is downloaded in parallel to parsing the page, and executed as soon as it is available even before parsing completes. 
The parsing of the page is going to be interuppted once the script is downloaded completely and then the script is executed. 
Thereafter, the parsing of the remaining page will continue.

<script src="demo.js" async></script>

defer: The script is downloaded in parallel to parsing the page, and executed after the page has finished parsing.

<script src="demo.js" defer></script>

Neither async or defer: The script is downloaded and executed immediately by blocking parsing of the page until the script execution 
is completed.

Note: You should only use either async or defer attribute if the src attribute is present.
 */

/**
 * What is Lexical Scope?
Lexical scope is the ability for a function scope to access variables from the parent scope.
 */

//---------------------------------------------------------------------------------------------------

/**
 * What is the difference between substring and substr methods?
 * 
 * substring(start, end)
    Parameters:
    start: The index to start extracting (inclusive).
    end: The index to stop extracting (exclusive).

    Behavior:
    If start > end, it swaps the arguments.
    Negative values are treated as 0.

    substr(start, length) (Deprecated)
    Parameters:
    start: The index to start extracting.
    length: The number of characters to extract.

    Behavior:
    If start is negative, it counts from the end of the string.
    If length is omitted, it extracts to the end of the string.
 */
//---------------------------------------------------------------------------------------------------

/**
 * What are shadowing and illegal shadowing?
 * 
 * Both shadowing and illegal shadowing refer to how variable names can "hide" or override others within nested scopes.
 * 
 * Shadowing occurs when a variable declared within a certain scope (like a function or block) has the same name as a variable declared
 *  in an outer scope. The inner variable shadows the outer one — meaning, the inner variable takes precedence in its own scope.
 * 
      let a = 10;
      {
        var a = 20; // SyntaxError: Identifier 'a' has already been declared
        console.log(a);
      }
 * 
 */

let x = 10;

function func() {
  let x = 20; // Shadows the outer 'x'
  console.log(x); // 20
}

func();
console.log(x); // 10

//---------------------------------------------------------------------------------------------------
