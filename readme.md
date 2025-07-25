# cors
CORS (Cross-Origin Resource Sharing) – Common Interview Questions
CORS is a security mechanism that restricts cross-origin HTTP requests. It’s a frequent topic in web development interviews. Here are key questions and answers:

1. What is CORS?
Answer:

CORS is a browser security feature that allows servers to specify which external domains can access their resources.

It prevents malicious websites from making unauthorized requests to another domain (e.g., stealing data via APIs).

2. Why does CORS exist?
Answer:

Due to the Same-Origin Policy (SOP), browsers block requests to a different domain unless the server explicitly allows it.

CORS relaxes SOP by letting servers define allowed origins, methods (GET, POST), and headers.

3. How does CORS work?
Answer:

For simple requests (GET/POST with standard headers), the browser sends the request directly.

For non-simple requests (PUT, DELETE, custom headers), the browser first sends a preflight request (OPTIONS) to check permissions.

The server responds with CORS headers (Access-Control-Allow-Origin, Access-Control-Allow-Methods).

4. What are common CORS headers?
Answer:

Header	Purpose	Example
Access-Control-Allow-Origin	Specifies allowed domains	* (all) or https://example.com
Access-Control-Allow-Methods	Allowed HTTP methods	GET, POST, PUT
Access-Control-Allow-Headers	Allowed custom headers	Authorization, Content-Type
Access-Control-Allow-Credentials	Allows cookies/auth	true
5. What is a preflight request?
Answer:

An OPTIONS request sent by the browser before the actual request (for non-simple requests).

The server must respond with appropriate CORS headers to approve the request.

6. How to fix CORS errors in development?
Answer:

Backend Solution: Configure CORS headers on the server (e.g., in Express.js):

javascript
app.use(cors({ origin: "https://your-frontend.com" }));
Frontend Proxy: Use a proxy server (e.g., in vite.config.js or webpack).

Disable in Browser (Dev Only): Run Chrome with --disable-web-security (unsafe for production).

# expensive cal
import React, { memo, useCallback, useMemo, useState } from "react";

const ChildComp = memo(({ onAdd }) => {
  console.log("Child rendered");

  return <button onClick={onAdd}>Add Number </button>;
});

const WelcomeMessage = () => {
  const [number, setnumber] = useState([1, 2, 3, 4]);
  const [showEven, setShowEven] = useState(false);

  const filteredNumber = useMemo(() => {
    return showEven ? number.filter((num) => num % 2 === 0) : number;
  }, [number, showEven]);

  const addNumber = useCallback(() => {
    setnumber((prev) => [...prev, prev.length + 1]);
  }, [number]);
  return (
    <div>
      <h2>{showEven ? "Even Number" : "All Number"}</h2>
      <ul>
        {filteredNumber.map((num) => (
          <li key={num}>{num}</li>
        ))}
      </ul>
      <ChildComp onAdd={addNumber} />
      <button onClick={() => setShowEven((prev) => !prev)}>Toggle</button>
    </div>
  );
};

export default WelcomeMessage;


# render user list mind map
data,search,debounce,visibleCount
handleChange->setSearch and reset visble count to (5)
visibleUser ->filtered.slice(0,5)
filtered -> data.filter(user.include(debounced))
useEffect-> handler = setTimeout(setdeboucne(search)) return ()=>clear(handleer)

# todo
editId,edit,text
editId===id?<input value={editText} onChange/>

# pagination
products,currentPage 

# Array method
push,pop,map,filter,reduce,slice,splice,split

# SQL
DML --> create,alter,drop,truncate
DDL --> select,insert,update,delete
DCL --> grant,revoke

FROM

WHERE ← filters rows before grouping

GROUP BY

HAVING ← filters after aggregation

SELECT

ORDER BY

LIMIT

# joins
# INNER JOIN
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.dept_id;
✅ Returns only employees that belong to a department.

# 2. LEFT JOIN
SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.dept_id;
✅ Shows all employees, even if they have no department.

# RIGHT JOIN
SELECT e.name, d.dept_name
FROM employees e
RIGHT JOIN departments d ON e.dept_id = d.dept_id;
✅ Shows all departments, even if they have no employees.

# FULL OUTER JOIN
SELECT e.name, d.dept_name
FROM employees e
FULL OUTER JOIN departments d ON e.dept_id = d.dept_id;
✅ Combines results of LEFT and RIGHT JOIN.

#  Aggregation
SELECT SUM(salary) AS total_salary
FROM employees;

SELECT dept_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id;

SELECT dept_id, COUNT(*) AS emp_count
FROM employees
GROUP BY dept_id;

SELECT dept_id, COUNT(*) AS emp_count
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 5;


# Filtering 
SELECT *
FROM employees
WHERE salary > 50000;

-- Salary between range
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;

-- Specific departments
SELECT * FROM employees WHERE dept_id IN (1, 3, 5);

-- Name starts with 'A'
SELECT * FROM employees WHERE name LIKE 'A%';

SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3 OFFSET 2;




# Sort Array
function sortArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

console.log(sortArray([5, 3, 8, 1]));


# Find the Longest Word in a String in JavaScript?
function longestString(str) {
  let wordArr = str.split(" ");
  let longest = "";
  console.log(wordArr);

  for (let word of wordArr) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}
console.log(longestString("Vrushabh is from kolhapur maharashtra"));

# Capitalize the First Letter of Each Word in a Sentence in JavaScript?
function capitalWord(str) {
  let wordArr = str.split(" ");
  let capitalWord = "";
  for (let i = 0; i < wordArr.length; i++) {
    capitalWord =
      capitalWord +
      " " +
      wordArr[i].charAt(0).toUpperCase() +
      wordArr[i].slice(1);
  }
  return capitalWord;
}

console.log(capitalWord("hello world"));

# Calculate the factorial of a number using recursion in JavaScript?
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) { // Start from 2 (since 1! = 1)
    result  = result * i; 
  }
  return result;
}

console.log(factorial(4));



# Count Vowels in a String in JavaScript?
function countVowels(str) {
    let count = 0;
    const vowels = 'aeiouAEIOU'; 
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            count++;
        }
    }
    return count;
}

console.log(countVowels("hello geek"));


# palindrome check
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}

# Reverse Sentence
function revSentence(str){
    const wordArr = str.split('')
    let revWord=''
    for(let i=wordArr.length-1;i>=0;i--){
        revWord = revWord + '' +wordArr[i]
    }
    return revWord;
}

console.log(revSentence('my name is vrushabh'))

# reverse string
function reverseString(str) {
  return str.split('').reduce((rev, char) => char + rev, '');
}

console.log(reverseString("code")); // "edoc"

# Implement a debounce function in JavaScript that limits the frequency of a function’s execution when it’s called repeatedly within a specified time frame. 

function searchQuery(data){
    console.log(data)
}

const debounceSearch = debounce(searchQuery,800) 

document.getElementById('search').addEventListner('input',(e)=>{
    debounceSearch(e.target.value)
})


const debounce=(cb,d)=>{
    let timer;
    
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            cb(...args)
        },d)
    }
}



function getAns(str){
  let newStr = ''
  for(let i = str.length -1;i>=0;i--){
    newStr = newStr + str[i]
  }
  return newStr
}

console.log(getAns('vrushabh'))

# samllst and largest number in arr
function getAns(arr){
  let min = arr[0];
  let max = arr[0];
  for(let num of arr){
    if(num<min){
      min = num
    }
    if(num>max){
      max = num
    }
  }
  return {
    min,max
  }
}

console.log(getAns([2,8,3,4,9,6]))

# Write a function that takes an array of integers as input and returns a new array with only the unique elements. 
function getAns(arr){
  let newArr = []
  for(let num of arr){
    if(newArr.includes(num)){
      continue;
    }
    newArr.push(num)
  }
 return newArr
}

console.log(getAns([2,6,3,4,9,6]))

# prime number check (num divisble by itself or 1)
function isPrime(num) {
  if (num <= 1) return false; // Primes must be > 1
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false; // Found a divisor
  }
  return true;
}

console.log(isPrime(7));  // true
console.log(isPrime(10)); // false


# List Rednering with search
import React, { useCallback, useEffect, useMemo, useState } from "react";

const USERS_PER_PAGE = 5;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(USERS_PER_PAGE);
  const [search, setSearch] = useState("");

  const [debounced, setDebounced] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(search), 800);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
    setVisibleCount(USERS_PER_PAGE); // reset pagination on search
  }, []);

  const filteredUser = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(debounced.toLowerCase())
    );
  }, [debounced, users]);

  const visibleUsers = useMemo(() => {
    return filteredUser.slice(0, visibleCount);
  }, [filteredUser, visibleCount]);

  return (
    <div>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearch}
      />
      <br />
      {visibleUsers.map((user, index) => (
        <ol className="flex justify-between" key={index}>
          <p>{user.name}</p>
        </ol>
      ))}

      {visibleCount < filteredUser.length && (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => setVisibleCount((prev) => prev + USERS_PER_PAGE)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default UserList;



# Pagination
import React, { useEffect, useState } from "react";
import Products from "./Products";

const PAGE_SIZE = 12;

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const response = await data.json();
    console.log(response.products);
    setProducts(response.products);
  }

  const numberOfPages = Math.ceil(products.length / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  return products.length === 0 ? (
    "Products Not Avaialbale"
  ) : (
    <div>
      <h1>Pagination</h1>
      <div>
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        {
          //fill the array with undefined value
          // _ means we are ignoring 1st paramter of map method i.e current element
          new Array(numberOfPages).fill().map((_, i) => (
            <span
              key={i}
              onClick={() => handlePageChange(n)}
              className={`p-[5px] border cursor-pointer ${
                currentPage === i ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </span>
          ))
        }
        <button
          disabled={currentPage === numberOfPages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap">
        {products.slice(start, end).map((p) => (
          <Products key={p.id} img={p.thumbnail} title={p.title} />
        ))}
      </div>
    </div>
  );
};

export default Pagination;

# Tab Form

import Interest from "./Interest";
import Profile from "./Profile";

import React, { useState } from "react";
import Settings from "./Settings";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState({});

  const [data, setData] = useState({
    name: "vrushabh",
    age: 28,
    interest: ["coding", "traveling"],
    theme: "dark",
  });

  const tabs = [
    {
      title: "Profile",
      component: Profile,
      validate: () => {
        const obj = {};
        if (!data.name && data.name.length < 2) {
          obj.name = "Name is not valid";
        }
        if (!data.age && data.age < 18) {
          obj.name = "Age is not valid";
        }
        setError(obj);

        return Object.keys(obj).length > 0 ? false : true;
      },
    },
    {
      title: "Interest",
      component: Interest,
    },
    {
      title: "Settings",
      component: Settings,
    },
  ];

  const ActiveTabComp = tabs[activeTab].component;

  const handlePrev = () => {
    setActiveTab((prev) => prev - 1);
  };
  const handleNext = () => {
    console.log(error);
    
    if (tabs[activeTab].validate()) {
      setActiveTab((prev) => prev + 1);
    }
  };
  const handleSubmit = () => {};
  return (
    <>
      {tabs.map((tab, index) => (
        <span
          key={index}
          onClick={() => setActiveTab(index)}
          className="p-2 border"
        >
          {tab.title}
        </span>
      ))}
      <br />
      <div className="p-2 border mt-2 h-[300px]">
        <ActiveTabComp data={data} setData={setData} error={error} />
      </div>
      <div>
        {activeTab > 0 && <button onClick={handlePrev}>Prev</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </>
  );
};

export default TabForm;


# ToDo
import React, { useMemo, useState } from "react";


const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };

  

  const handleRemove = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ border: "1px solid black" }}
      />
      <button onClick={handleAdd}>Add</button>
      {Object.values(FILTERS).map((key) => (
        <button key={key} onClick={() => setFilter(key)}>
          {key}
        </button>
      ))}
      {todos.map((todo) => (
        <div className="flex gap-1" key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ border: "1px solid black" }}
              />
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => handleComplete(todo.id)}
              />
              <li
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  listStyle: "none",
                }}
              >
                {todo.text}
              </li>

              <button onClick={() => startEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button onClick={() => handleRemove(todo.id)}>Remove</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToDoList;

# Accordian
import React, { useState } from "react";

const articles = [
  {
    title: "Introduction to JavaScript",
    content:
      "JavaScript is a programming language commonly used in web development...",
  },
  {
    title: "CSS Styling Tips",
    content: "Here are some useful CSS tricks to improve your designs...",
  },
  {
    title: "React Basics",
    content:
      "React is a popular JavaScript library for building user interfaces...",
  },
  {
    title: "Node.js Fundamentals",
    content: "Node.js allows you to run JavaScript on the server side...",
  },
  {
    title: "Database Design Principles",
    content: "Learn the core concepts of efficient database design...",
  },
];

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return !articles || articles.length === 0 ? (
    <h1>No articles found</h1>
  ) : (
    <div>
      {articles.map((a, index) => (
        <div key={index}>
          <button onClick={() => handleToggle(index)}>{a.title}</button>
          {openIndex === index && <p>{a.content}</p>}
        </div>
      ))}
    </div>
  );
};

export default Accordian;


# Form Validation
import React, { useState } from "react";
const WelcomeMessage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    terms: false,
    category: "",
    gender: "",
  });
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};
    if (!data.username) newError.username = "Username required";
    if (!data.email) newError.email = "Email required";
    if (!data.password) newError.password = "Password required";
    if (!data.terms) newError.terms = "You must accept terms";
    if (!data.category) newError.category = "Select a category";
    if (!data.gender) newError.gender = "Select gender";
    return newError;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isFormValid = Object.keys(validate()).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
    } else {
      console.log("Submitted data:", data);
    }
  };

  const categories = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Fullstack", value: "fullstack" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Enter username"
        value={data.username}
        onChange={handleChange}
      />
      {error.username && <p style={{ color: "red" }}>{error.username}</p>}

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={data.email}
        onChange={handleChange}
      />
      {error.email && <p style={{ color: "red" }}>{error.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={data.password}
        onChange={handleChange}
      />
      {error.password && <p style={{ color: "red" }}>{error.password}</p>}

      <label>
        <input
          type="checkbox"
          name="terms"
          checked={data.terms}
          onChange={handleChange}
        />
        I agree to the terms
      </label>
      {error.terms && <p style={{ color: "red" }}>{error.terms}</p>}

      <select name="category" value={data.category} onChange={handleChange}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      {error.category && <p style={{ color: "red" }}>{error.category}</p>}

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        {error.gender && <p style={{ color: "red" }}>{error.gender}</p>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit form
      </button>
    </form>
  );
};

export default WelcomeMessage;
