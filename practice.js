// string is not array of character it is group/sequence of charchter so array method wont work on string but it
// behaves like array
// 2. String are immutable in nature

let s = "vrushabh";
// console.log(s.length);
// console.log(s.slice(0,2));
// console.log(s.slice(-4,s.length));

//substring cannot take negative index like slice
// console.log(s.substring(2, 6));

// toUppercase
// console.log(s.toUpperCase());

// concat
// console.log(s.concat(" ", "world"));

// trim
// console.log(s.trim());

// chartAt()
// console.log(s.charAt(2));

// for (let i = 0; i < s.length; i++) {
//   console.log(s.charAt(i));
// }

// reverse order
let rev = "";
for (let i = s.length - 1; i >= 0; i--) {
  rev += s.charAt(i);
}
console.log(rev);

// check palindrome
if (rev === s) {
  console.log("palindrome");
} else {
  console.log("not palindrome");
}
//or using two point method

let i = 0;
let j = s.length - 1;
let isPalindrome = true;
while (i < j) {
  if (s.charAt(i) !== s.charAt(j)) {
    isPalindrome = false;
    break;
  }
  i++;
  j--;
}
if (isPalindrome) {
  console.log("palindrome");
} else {
  console.log("not palindrome");
}

// toggle charchter

// let str = "AbCDeFGHik";
// let toggle = "";
// for (let i = 0; i < str.length - 1; i++) {
//   if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
//     toggle = toggle + String.fromCharCode(str.charCodeAt(i) + 32);
//   } else if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
//     toggle = toggle + String.fromCharCode(str.charCodeAt(i) - 32);
//   }
// }
// console.log(toggle);

// charchter occurance
let name = "naman";
let arr = new Array(128).fill(0);

for (let i = 0; i < name.length; i++) {
  let idx = name.charCodeAt(i);
  arr[idx] += 1;
}

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 0) {
    console.log(String.fromCharCode(i) + " appears " + arr[i] + " times");
  }
}
