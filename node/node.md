# Core Node.js Concepts

`Key Features of Node.js`
    Runtime Environment -  Node.js provides a **runtime environment** to execute JavaScript code outside the browser

    Event Driven Architecture - This design allows it to manage multiple tasks without waiting for one to complete before starting another.

    Asynchronous I/O (Non-blocking I/O) - Node.js performs **asynchronous I/O operations**, meaning tasks like reading/writing files or making network requests do not block the execution of other operations.  

`Node.js Code Conversion: High-Level to Machine Code`
    Parsing - 
    1. V8 reads the JavaScript code and checks for **syntax errors**
    2. Converts the code into an **Abstract Syntax Tree (AST)**   

    Intermediate Representation (IR) Generation - 
    1. The AST is transformed into an **Intermediate Representation (IR)**, a lower-level, platform-independent form of the code.  

    Just-In-Time (JIT) Compilation
    1. The IR is compiled into **machine code** dynamically at runtime. 
    2. V8 continuously **optimizes the machine code** based on runtime performance, ensuring efficient execution.  

`Asynchronous Javascript`
Asynchronous programming allows multiple tasks to run independently of each other. In asynchronous code, a task can be initiated, and while waiting for it to complete, other tasks can proceed. This non-blocking nature helps improve performance and responsiveness, especially in web applications.

`sync and async`
Node.js leverages the V8 engine and libuv library to provide efficient handling of both synchronous and asynchronous operations.

`V8 Engine`
- **Purpose**: Executes JavaScript code.
- **Behavior**: Runs JavaScript synchronously in a single thread, processing one line of code at a time.

`libuv Library`
- **Purpose**: Manages asynchronous operations, including I/O tasks, timers, and more.
- **Behavior**: Handles non-blocking operations and manages the event loop, allowing Node.js to perform tasks asynchronously without blocking the main thread.

The integration of V8 and libuv enables Node.js to handle multiple tasks efficiently, combining synchronous and asynchronous processing in a single-threaded environment.


`Understanding libuv and event loop`

🧠 How It Works (Step-by-Step)

Call Stack
When your JS code runs, function calls are pushed to the call stack and executed one by one.

Async Operations
When Node encounters something asynchronous (e.g., setTimeout, DB query, file read):
It offloads the task to libuv thread pool or OS kernel.
The main thread continues executing without waiting.

Callback Queue
When the async task finishes, its callback is placed into the callback queue.

Event Loop
The event loop continuously checks:
If the call stack is empty
If callbacks are waiting in the queue
If yes → it moves the next callback to the call stack → executes it.

The event loop in LIBUV operates in four major phases:

1  **Timers Phase:** In this phase, all callbacks that were set using  `setTimeout` or `setInterval` are executed. These timers are checked, and if their time has expired, their corresponding callbacks are added to the callback queue for execution.

2  **Poll Phase:** After timers, the event loop enters the Poll phase, which is crucial because it handles I/O callbacks. For instance, when you perform a file read operation using `fs.readFile` , the callback associated with this I/O operation will be executed in this phase. The Poll phase is responsible for handling all I/O related tasks, making it one of the most important phases in the event loop.

3  **Check Phase:** Next is the Check phase, where callbacks scheduled by the `setImmediate` function are executed. This utility API allows you to execute callbacks immediately after the Poll phase, giving you more control over the order of operations.

4  **Close Callbacks Phase:** Finally, in the Close Callbacks phase, any callbacks associated with closing operations, such as socket closures, are handled. This phase is typically used for cleanup tasks, ensuring that resources are properly released.

Event Loop Cycle with process.nextTick() and Promises
if there are any nested nestTicks all that will be executed one after other then it will move to next phase

- One More Important Note
*When the event loop is empty and there are no more tasks to execute, it enters the `poll phase` and essentially waits for incoming events*

***************************************
const fs = require("fs");
const a = 999;

setImmediate(() => console.log("setImmediate"));
fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log(data)
})
setTimeout(() => console.log("set timeout"), 0);
function printA() {
    console.log("a=" + a);
}
printA()
console.log("Last line of program")

a=10
Last line of program
<contents of file.txt>
setImmediate
set timeout
***************************************



***************************************
const fs = require("fs");
const a = 999;

setImmediate(() => console.log("setImmediate"));
Promise.resolve("promise").then(console.log)
fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log(data);
})
setTimeout(() => console.log("setimeout"), 0)
process.nextTick(() => console.log("Process.nexttick"))
function printA() {
    console.log("a:" + a);
}
printA();
console.log("last line of program")

a:999
last line of program
Process.nexttick
promise
<contents of file.txt>
setImmediate
setimeout

***************************************

***************************************
const fs = require("fs");
setImmediate(() => console.log("1st setImmediate"));
setTimeout(() => console.log("1st timer"), 0)
Promise.resolve("promise").then(console.log)

fs.readFile("./file.txt", "utf-8", (err, data) => {
    setTimeout(() => console.log("2nd timer"), 0)
    process.nextTick(() => console.log("2nd Process.nexttick"))
    setImmediate(() => console.log("2nd setImmediate"));
    console.log(data);
})

process.nextTick(() => console.log("1st Process.nexttick"))
console.log("last line of program") 

last line of program
1st Process.nexttick
promise
<contents of file.txt>
2nd Process.nexttick
1st setImmediate
2nd setImmediate
1st timer
2nd timer
***************************************


***************************************

const fs = require("fs")

setImmediate(() => console.log("setimmediate"));
setTimeout(() => console.log("settimeout"));
Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log(data);
})

process.nextTick(() => {
    process.nextTick(() => console.log("inner nexttick"));
    console.log("process.nexttick")
})

console.log("last line of program");

last line of program
process.nexttick
inner nexttick
Promise
<contents of file.txt>
setimmediate
settimeout

***************************************

`Thread pool in libuv`

Whenever there's an asynchronous task, V8 offloads it to libuv. For example, when reading a file, libuv uses one of the threads in its thread pool. The file system (fs) call is assigned to a thread in the pool, and that thread makes a request to the OS. While the file is being read, the thread in the pool is fully occupied and cannot perform any other tasks. Once the file reading is complete, the engaged thread is freed up and becomes available for other operations. For instance, if you're performing a cryptographic operation like hashing, it will be assigned to another thread. There are certain functions for which libuv uses the thread pool.

The threads are required for some specfic task to perform not always. such as fs,dns.lookup,crypto,user specified input for such task there is need of threads

In Node.js, the default size of the thread pool is 4 threads:
    UV_THREADPOOL_SIZE=4

Q Suppose you have a server with many incoming requests, and users are hitting APIs. Do these APIs use the thread pool?
 A : No.

 1 **DON'T BLOCK THE MAIN THREAD**
 - Don't use sync methods
 - Don't do operations on heavy JSON Object it will make load on main thread.
 - Avoid complex Regular Expression.
 - Avoid Complex calculations and big or infinite loops.

`What is the difference between process.nextTick() and setImmediate()?`

1. process.nextTick()
Runs immediately after the current JavaScript execution finishes.
It runs before the Event Loop continues to the next phase.
Higher priority than Promises and setImmediate().

2. setImmediate()
Runs at the end of the current Event Loop cycle.
Specifically runs during the Check phase.
Executes after I/O callbacks.

`How does Node.js handle child processes?`

Node.js is single-threaded for JavaScript execution, but it can still run other programs or scripts in parallel using child processes.
This is helpful for tasks that are CPU-heavy or need external system commands (like running Python scripts, shell commands, etc.).

✅ How Child Processes Work in Node.js
Node.js uses the child_process module to create and manage child processes.
A child process runs independently of the main Node event loop and can communicate back via:
stdin (input stream)
stdout (output stream)
stderr (error stream)
This allows Node to delegate work without blocking the main JavaScript thread.

| Method    | Description                                        | Use Case                             |
| --------- | -------------------------------------------------- | ------------------------------------ |
| `exec()`  | Runs a command in a shell and buffers output       | Good for small output                |
| `spawn()` | Starts a process as a stream                       | Good for large / continuous output   |
| `fork()`  | Creates a new Node.js process and allows messaging | Communication between Node processes |

`What are streams in Node.js and when to use them?`

✅ What Are Streams?
A Stream in Node.js is a continuous flow of data that can be read or written piece-by-piece, without loading it all into memory.

Think of a stream like watching a video on YouTube:
The whole video isn't downloaded first.
You start watching while the rest is still loading.

Without streams (bad approach):

const data = fs.readFileSync("bigfile.txt"); // loads whole file into memory!

If the file is 2GB, your server needs 2GB of RAM just to read it — not scalable.

With streams:

const fs = require("fs");
const stream = fs.createReadStream("bigfile.txt");
stream.on("data", chunk => console.log("Received chunk:", chunk));

📌 Only small chunks load at a time → low memory usage.

🚦 Types of Streams

| Type          | Purpose                       | Example                                    |
| ------------- | ----------------------------- | ------------------------------------------ |
| **Readable**  | You can **read** data from it | `fs.createReadStream()`, HTTP request body |
| **Writable**  | You can **write** data to it  | `fs.createWriteStream()`, HTTP response    |
| **Duplex**    | Read + write                  | TCP sockets                                |
| **Transform** | Modify data while streaming   | `zlib.createGzip()` (compression)          |

🧷 Key Benefits of Streams

| Benefit              | Explanation                                   |
| -------------------- | --------------------------------------------- |
| **Memory Efficient** | Only small chunks are processed at a time     |
| **Faster**           | Start processing before all data is available |
| **Scalable**         | Can handle big data and many clients          |

🏁 Final Summary

Streams allow Node.js to process large amounts of data efficiently by handling it in small chunks rather than loading everything into memory at once.
Use streams for large files, network communication, real-time processing, and data transformation.

`Explain the module system (CommonJS vs ES Modules)`

Modules help you organize code into separate files so it’s easier to maintain and reuse.

Node.js supports two main module systems:
| Module System        | Default in                                | Syntax Style                 |
| -------------------- | ----------------------------------------- | ---------------------------- |
| **CommonJS (CJS)**   | Node.js (older and still widely used)     | `require` / `module.exports` |
| **ES Modules (ESM)** | Modern JavaScript (and Node.js from v14+) | `import` / `export`          |


| Feature        | CommonJS                   | ES Modules                      |
| -------------- | -------------------------- | ------------------------------- |
| Import syntax  | `require()`                | `import`                        |
| Export syntax  | `module.exports`           | `export`                        |
| Execution      | **Synchronous**            | **Async / Static analysis**     |
| File extension | `.js` by default           | `.mjs` or `"type": "module"`    |
| When Used      | Mostly in Node.js projects | Modern JS + Node newer projects |

`How does require() work internally?`

| Step | What Node Does                         |
| ---- | -------------------------------------- |
| 1    | Resolves file path                     |
| 2    | Checks cache                           | This prevents re-reading or re-running the same module.
| 3    | Reads module from disk                 | If not cached, Node reads the file from disk (except .node which is binary).
| 4    | Wraps code in a function               |
| 5    | Executes the function                  |
| 6    | Returns `module.exports` and caches it |

1) Resolve the Module Path

Node first determines what file you are referring to.
If you write ./myModule, Node tries in order:
./myModule.js
./myModule.json

If it is a directory, Node looks for index.js
If you write require("express"), Node checks:
The node_modules folder in current directory
Then parent directories, up to root

2. Check the Module Cache

Node has an internal cache: require.cache.
If the module was already required earlier:
return cachedModule.exports;

This prevents re-reading or re-running the same module.
This is why require() is fast after the first time.

3. Read the Module File

If not cached, Node reads the file from disk (except .node which is binary).

const fs = require("fs");
const code = fs.readFileSync(filename, "utf8");

4. Wrap the Module in a Function

Node wraps your module in a function before executing:
(function (exports, require, module, __filename, __dirname) {
    // Your module code here
});

So inside any module, exports, require, module etc. are not global, they are just function parameters.

5. Execute the Function

Node runs this wrapped function.
Anything assigned to module.exports is what require() returns.

6. Store the Export in Cache

After execution, Node stores the result in require.cache so future require calls don’t run the file again.

`What is the purpose of package.json and package-lock.json?`

Purpose of package.json:

It defines the project’s metadata (name, version, description, etc.).
It lists project dependencies and their version ranges (like ^ or ~).
It also holds scripts that can be run (e.g., npm start, npm build).
Essentially, it is used to manage and share the project’s configuration and dependencies.

Purpose of package-lock.json:

It locks the exact versions of each installed dependency, including nested dependencies.
Ensures consistent installs across different machines and environments.
Speeds up installation by providing a direct dependency tree.

In short:
package.json defines what you want,
package-lock.json defines exactly what you got.

`What are Buffer objects and their use cases?`

In Node.js, a Buffer is a temporary memory space used to handle raw binary data. Since JavaScript normally deals with text or structured data, Buffers provide a way to work with data that is not directly in string format, such as files, images, audio streams, or network packets.

Buffers are especially important in Node.js because Node works heavily with I/O operations. When data comes in from a file system or a network socket, it often arrives as a stream of bytes. A Buffer lets us store and manipulate those bytes efficiently.

const fs = require("fs");

const data = fs.readFileSync("image.png");
console.log(data); // This is a Buffer containing raw binary data

`How does middleware work in Express?`

Middleware in Express is essentially a function that sits in the request–response cycle. It has access to the request object, the response object, and the next() function. Middleware can perform operations like logging, authentication, parsing request bodies, handling errors, and then either end the response or pass control to the next middleware in the chain.

function middleware(req, res, next) {
  // work with req or res
  next(); // passes control to the next middleware
}

Types of Middleware:
Application-level middleware
Attached using app.use() or app.get() etc.

Router-level middleware
Used on a specific router instance.

Built-in middleware
Example: express.json(), express.urlencoded() for parsing request bodies.

Third-party middleware
Example: morgan for logging, cors for handling cross-origin requests.

Error-handling middleware
This has four parameters: (err, req, res, next). It handles errors.
app.use((err, req, res, next) => {
  res.status(500).send("Something broke");
});

`Explain the request-response cycle in Express`

The request–response cycle in Express starts when a client sends a request. The request moves through middleware functions, which can read or modify the request. When Express finds a matching route, it runs that route handler and sends a response back to the client. If no route matches, it returns 404. If errors occur, the error-handling middleware manages them.

`What is the difference between app.use() and app.get()?`

The difference between app.use() and app.get() in Express is mainly about scope and purpose.

app.use() is used to register middleware. It runs for all HTTP methods (GET, POST, PUT, etc.) and can match any path, depending on how it is defined. It is mainly used for tasks like logging, authentication, body parsing, or setting headers.

app.get() is used to define a route handler for only GET requests to a specific path. It is used to send a response to the client for that route.

app.get("/home", (req, res) => {
  res.send("This is the home page");
});

app.get() is used to handle GET requests for a specific route.
app.use() often calls next() to pass control forward, while app.get() generally ends the request by sending a response.

`How to handle errors in Express applications`
In Express, errors are handled using a special type of middleware called error-handling middleware. It has four parameters instead of three:

This function gets triggered whenever an error is passed to next(err) anywhere in the app. Express sees that next() has an argument and automatically skips all normal middleware and routes, jumping directly to the error handler.

app.get("/user", (req, res, next) => {
  try {
    // Some logic that may fail
    throw new Error("User not found");
  } catch (err) {
    next(err); // forwards error to error handling middleware
  }
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

*** Error handling middleware should be defined last, after all routes and middleware.***

2. Synchronous Error Handling
For synchronous code, Express automatically catches errors:
javascriptapp.get('/user/:id', (req, res) => {
  const user = JSON.parse(req.params.id); // If this throws, Express catches it
});

// Or use a wrapper function
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
}));

`What are route parameters vs query parameters`

app.get('/users/:id', (req, res) => {
  console.log(req.params.id); // 10
});

/users?role=admin&active=true
app.get('/users', (req, res) => {
  console.log(req.query.role);   // admin
  console.log(req.query.active); // true
});

Route parameters are used to identify a specific resource and are part of the URL path, accessed using req.params. Query parameters are used to filter or modify the request and appear after ? in the URL, accessed using req.query.

`How to serve static files in Express`

Serving static files (HTML, CSS, JavaScript, images, etc.) in Express is straight forward using the built-in express.static middleware.

const express = require('express');
const app = express();

// Serve files from 'public' directory
app.use(express.static('public'));

app.listen(3000);


If there is a file public/logo.png, you can now access it directly in the browser as:

http://localhost:3000/logo.png

How it works:

express.static() tells Express to look in a specific folder for static files.
The server does not need route handlers for each file.
Express will match the request with the files in that folder automatically.

`Explain Express Router and modular routing`

express.Router() creates a modular route handler that can be used as middleware. It helps organize routes into separate files/modules.

**/routes/users folder -->**
const express = require('express');
const userRouter = express.Router();

userRouter.get('/id', (req, res) => {
  res.send('user data');
});
module.exports = userRouter;

**/routes/index folder -->**
const routes = express.Router()
routes.use(userRouter)

**/index.js --->**
app.use(routes)

`How to implement CORS in Express?`

CORS (Cross-Origin Resource Sharing) is a security mechanism that allows or restricts resources on a web server to be requested from another domain. Here's how to implement it in Express.

CORS is needed when your frontend (e.g., http://localhost:3000) needs to make requests to your backend API on a different origin (e.g., http://localhost:5000). Browsers block these cross-origin requests by default for security.

- npm install cors

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes and origins
app.use(cors());

3. CORS with Specific Origin

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cors(corsOptions));


4. CORS with Multiple Origins

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://myapp.com',
  'https://www.myapp.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Allow cookies to be sent
};

app.use(cors(corsOptions));


app.use(cors(corsOptions));

6. Enable CORS for Specific Routes

const express = require('express');
const cors = require('cors');
const app = express();

// CORS disabled by default

// Enable CORS only for this route
app.get('/api/public', cors(), (req, res) => {
  res.json({ message: 'Public API with CORS' });
});

9. CORS with Environment-Based Configuration

const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://myapp.com', 'https://www.myapp.com']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

**Frontend (with credentials):**

// Fetch API
fetch('http://localhost:5000/api/user', {
  credentials: 'include' // Send cookies
});

// Axios
axios.get('http://localhost:5000/api/user', {
  withCredentials: true
});

Common CORS Headers Explained:
Header Description
Access-Control-Allow-Origin         Specifies which origins can access the resource
Access-Control-Allow-Methods        Specifies allowed HTTP methods
Access-Control-Allow-Headers        Specifies allowed request headers
Access-Control-Allow-Credentials    Indicates whether cookies can be sent
Access-Control-Expose-Headers       Headers that can be accessed by client
Access-Control-Max-Age              How long preflight results can be cached

A preflight request is an HTTP OPTIONS request that browsers automatically send before a real request (like POST, PUT, DELETE) when:


🧠 Background: What Are "Headers"?
When a client (like your React frontend) sends an HTTP request to your Express backend, it often includes headers — small pieces of metadata that describe the request.

Example:
POST /api/user HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Authorization: Bearer abc123

Here:
Content-Type → tells the server the format of the body (e.g., JSON)
Authorization → commonly used to send tokens (JWTs, API keys, etc.)
🚨 The Problem (Why allowedHeaders Matters)
When making cross-origin requests, browsers don’t allow just any headers to be sent.

If your frontend tries to send custom or sensitive headers (like Authorization), the browser first sends a preflight OPTIONS request to check:
“Hey server, am I allowed to send these headers?”
If the server does not respond with those headers in Access-Control-Allow-Headers,
the browser blocks the actual request for security reasons.

Key Points:
✅ Use the cors package for easy implementation
✅ Never use origin: '*' with credentials: true (security risk)
✅ Always whitelist specific origins in production
✅ Set credentials: true when using cookies or auth headers
✅ Handle preflight OPTIONS requests properly
✅ Use environment variables for origin configuration
✅ Remember: CORS is a browser security feature, not server security
✅ Postman/curl don't enforce CORS (only browsers do)

`How to handle file uploads in Express`
we can give example of multer library 


`How do you implement JWT authentication?`

1. first we cna create a signup route
 - we will check if email is already present 
    yes --> throw err
    no --> we will save the user along with password and other data
 while saving password we need to hash that password using bcrypt libaray
 - we will set the cookie and pass the token generated from the id and seceret key using jwt sign
 - we will then send status of user added succesfully

 2. for login page
 - we will first check user is present or not
 - we will then check the password is correct or not
 - after verifying both we will get jwt using the userId and we then set it to the res.cookie

 3. accesing all the routes after looging
 - in this for e.g if user tries to acces /profile we need to verfiy the user first these is where token cames into actions 
 - we will use authMiddleware so in that function we just verify the token from the req and seceret key and find the userId if that id is present in the db then the user is valid user to access the resourece
 - we will then pass the req to next handler using next() function

 Two main method 
 1. jwt.sign()
 1. jwt.verify()

`Explain session-based vs token-based authentication`

“Session-based authentication stores user login info on the server, while token-based authentication (like JWT) stores it on the client. Session-based is stateful and needs server memory; token-based is stateless and scales better.”

🧩 1. What is Session-based Authentication?

Flow:
The user logs in with username/password.
Server verifies credentials and creates a session (usually a record in memory or DB) with the user’s info.
Server sends back a session ID stored in a cookie on the client.
On each request, the browser automatically sends this cookie.
The server uses the session ID to look up the user in the session store.

✅ Pros:
Simple and secure (since data stays server-side).
Sessions can be invalidated easily (logout just removes from store).

❌ Cons:
Requires server-side storage — not ideal for scaling horizontally.


🔐 2. What is Token-based Authentication (JWT)

Flow:
The user logs in with username/password.
Server verifies credentials and issues a token (JWT) signed with a secret key.
Client stores the token (e.g., in localStorage or cookie).
On each request, the client sends Authorization: Bearer <token>.
The server verifies the token signature — no DB lookup needed.


✅ Pros:
Stateless: no session storage required.
Easier to scale across multiple servers.
Works great for APIs and mobile clients.

❌ Cons:

Harder to revoke tokens before expiry.
Must store tokens securely on client (avoid XSS/localStorage issues).
If the secret key is leaked, all tokens are compromised.

“Even though both methods may use cookies, in session-based authentication the cookie only stores a session ID that maps to data on the server, so the server is stateful. In token-based authentication, the cookie can hold the entire JWT, which contains user info and is self-verifiable, so the server doesn’t need to store any session data — it’s stateless. That’s the key difference.”

`What is bcrypt and why use it for passwords`

bcrypt is a password-hashing function designed to securely store passwords by converting them into irreversible, cryptographically strong hashes.

It’s not just “encryption”; it’s a one-way hashing algorithm — meaning you can verify a password but you can never get the original password back from the hash.

⚙️ 3. How bcrypt works (step-by-step):

When a user registers:
bcrypt generates a random salt.
Combines the password + salt.
Applies multiple rounds of hashing (default cost factor controls how many).
Stores the resulting hash (including the salt and cost).

When a user logs in:
bcrypt takes the input password and the stored salt.
Recomputes the hash.
Compares it with the stored hash.

✅ If they match → password is correct.
❌ Otherwise → authentication fails.

`How to prevent common security vulnerabilities (SQL injection, XSS, CSRF)?`

🧩 1. SQL Injection

SQL Injection happens when user input is directly concatenated into SQL queries, allowing attackers to execute arbitrary SQL commands.
const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;
If someone enters:
' OR 1=1 --

➡️ It becomes
SELECT * FROM users WHERE username = '' OR 1=1 --'
and returns all users.

✅ How to prevent it:

1. Use parameterized queries / prepared statements

const query = 'SELECT * FROM users WHERE username = ?';
connection.execute(query, [req.body.username]);

2. Use ORM or query builder (e.g. Sequelize, Prisma, TypeORM).

3. Validate and sanitize all inputs.

“SQL injection is prevented by never concatenating user input into queries — always use parameterized queries so the input is treated as data, not code.”


💬 2. Cross-Site Scripting (XSS)

XSS allows attackers to inject malicious JavaScript into web pages viewed by other users — often through forms or URLs.

Example (❌ vulnerable HTML):
<div>Welcome, ${req.query.name}</div>

If user enters:
<script>alert('Hacked')</script>

➡️ Script runs in every user’s browser.

✅ How to prevent it:
1. Escape output when rendering user input:
Use frameworks that auto-escape (like React, Angular, Vue).
In server-rendered pages, sanitize before rendering (npm package: dompurify, xss).

2. Never trust user input, even if it comes from your DB.

3. Set HTTP headers:
Content-Security-Policy (CSP)
X-XSS-Protection

4. Validate input (reject unexpected HTML/script tags).

🔄 3. Cross-Site Request Forgery (CSRF)

CSRF tricks a logged-in user’s browser into sending a malicious request to your server — e.g., transferring money, changing email, etc.

Because the browser automatically sends cookies, your server may think it’s a valid user.

Example attack:
A malicious site contains:
<img src="https://bank.com/transfer?to=hacker&amount=1000" />

If you’re logged in to bank.com, your cookies are sent automatically.

Use SameSite cookies:
res.cookie('token', value, { sameSite: 'strict' });

🧠 Interview Tip:
“CSRF works because browsers automatically send cookies with cross-site requests. We prevent it using anti-CSRF tokens, SameSite cookies, and by validating the origin or referrer headers.”


`What is helmet.js and why is it important?`

import express from "express";
import helmet from "helmet";

const app = express();

// Use Helmet to secure the app
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Secure app using Helmet.js!");
});

app.listen(3000, () => console.log("Server running on port 3000"));

🔒 Why Helmet.js Is Important

Protects Against Common Attacks
Helps safeguard your app from XSS, clickjacking, MIME sniffing, and other vulnerabilities.

Promotes Best Security Practices
Automatically applies recommended security headers that developers might otherwise overlook.

Easily Configurable
You can enable, disable, or customize each security header as needed.

Essential for Production Apps
When deploying Node.js apps to production, Helmet is one of the simplest and most effective first steps toward better security.

`How to implement rate limiting?`

rate limiting is a key security and performance measure that helps protect your server from abuse, such as brute-force attacks, denial-of-service (DoS), or API overuse.

Rate limiting restricts how many requests a client (usually identified by IP address) can make to your server within a certain time period.

For example:
“Allow each IP to make 100 requests per 15 minutes. If they exceed this, block them temporarily.”

npm install express-rate-limit

import express from "express";
import rateLimit from "express-rate-limit";

const app = express();

// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable the deprecated `X-RateLimit-*` headers
});

// Apply the rate limit to all requests
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Welcome! Rate limiting is active.");
});

app.listen(3000, () => console.log("Server running on port 3000"));

⚙️ 2. Applying Rate Limiting to Specific Routes
You can apply different limits to different routes:

app.post("/login", loginLimiter, (req, res) => {
  res.send("Login endpoint");
});

`How to secure API endpoints?`

1. Use HTTPS (TLS Encryption)
Always serve your API over HTTPS, never plain HTTP.

4. Validate and Sanitize Inputs
Always validate all input data (from body, params, and query strings) to prevent attacks like SQL injection or XSS.

Use libraries like:
express-validator
joi
yup

2. Implement Authentication
Use JWT (JSON Web Tokens)
JWT is one of the most common methods for securing REST APIs.

3. Use Authorization
Even after authentication, ensure users can only access resources they’re allowed to.
if (req.user.role !== "admin") {
  return res.status(403).json({ message: "Access denied" });
}

5. Use Helmet.js for Security Headers

Helmet adds headers that protect against many common attacks:

import helmet from "helmet";
app.use(helmet());

Prevents clickjacking
Enforces HTTPS
Stops MIME sniffing
Adds CSP (Content Security Policy)

6. Apply Rate Limiting
Limit how many requests a client can make in a given time window:

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

7. Enable CORS Properly

Control which origins can access your API.
import cors from "cors";

const corsOptions = {
  origin: ["https://your-frontend.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};
app.use(cors(corsOptions));

8. Hide Stack Traces and Server Info
Never expose internal errors or server details to clients.

app.use((err, req, res, next) => {
  console.error(err.stack); // Log internally
  res.status(500).json({ message: "Something went wrong!" }); // Generic message
});


9. Use Parameterized Queries (SQL Databases)

If your API talks to a database:
db.query("SELECT * FROM users WHERE email = ?", [email]);

Avoid string concatenation in SQL queries to prevent SQL injection.

`What is HTTPS and how to implement it?`

HTTPS (HyperText Transfer Protocol Secure) is the secure version of HTTP, where:

Communication between client (browser) and server (backend) is encrypted using TLS (Transport Layer Security).
It ensures that data transmitted (like passwords, tokens, or personal info) cannot be read, modified, or intercepted by attackers.

🧩 How HTTPS Works (in simple terms)

Server has an SSL/TLS certificate, issued by a trusted Certificate Authority (CA).
Client (browser) connects to the server and receives the certificate.
The browser verifies that the certificate is valid and matches the domain.
Both client and server agree on encryption keys.
All data is encrypted before being transmitted.
So even if someone intercepts the network traffic, they can’t read it.


| Step | Description                                               |
| ---- | --------------------------------------------------------- |
| 1️⃣  | Obtain SSL/TLS certificate (Let’s Encrypt or self-signed) |
| 2️⃣  | Use `https.createServer()` in Node.js with key and cert   |
| 3️⃣  | Redirect HTTP traffic to HTTPS                            |
| 4️⃣  | Use NGINX or proxy in production                          |
| 5️⃣  | Test and renew certificates regularly                     |

`How to handle sensitive data (API keys, secrets)?`

use .env for devlopment and during production enviorment

# Performance & Scalability

`Performance & Scalability`

| Concept               | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| **Single Thread**     | Runs JS code in one thread (no true parallelism for JS itself) |
| **Event Loop**        | Manages asynchronous callbacks efficiently                     |
| **libuv Thread Pool** | Handles background I/O and CPU-heavy tasks                     |
| **Non-blocking I/O**  | Allows thousands of concurrent connections                     |
| **Worker Threads**    | Enables true multi-threaded JS for heavy tasks                 |
| **Cluster**           | Spawns multiple processes to utilize all CPU cores             |

Thread Pool (for Heavy Operations)
While JS runs on one thread, libuv uses a thread pool (default 4 threads) for heavy or blocking operations like:
File system I/O
DNS lookups
Some crypto operations

You can configure this via:
set UV_THREADPOOL_SIZE=8

🧠 Node.js achieves concurrency not by running multiple threads of JS,
but by using an event-driven, non-blocking architecture that can handle many I/O operations concurrently.

` What is PM2 and how does it help in production?`

PM2 (Process Manager 2) is a production-grade process manager for Node.js applications.
It helps you run, monitor, and manage your Node.js apps efficiently — keeping them alive forever, even if they crash.

Think of PM2 as a “supervisor” for your Node processes.

| Feature                              | Description                                                    |
| ------------------------------------ | -------------------------------------------------------------- |
| 🔁 **Process Management**            | Starts, stops, restarts Node apps easily                       |
| ⚡ **Auto-Restart**                   | Automatically restarts apps if they crash                      |
| 🧩 **Load Balancing (Cluster Mode)** | Runs multiple instances of your app to use all CPU cores       |
| 📊 **Monitoring**                    | Tracks CPU, memory, and uptime for each process                |
| 📂 **Logging**                       | Consolidates logs for all apps (stdout, stderr)                |
| 🧱 **Startup Scripts**               | Keeps apps running even after system reboot                    |
| ☁️ **PM2 Plus / Enterprise**         | Cloud-based real-time monitoring and alerting                  |
| 🔒 **Environment Management**        | Easily switch between development, staging, production configs |

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `pm2 start app.js`      | Start your app                        |
| `pm2 list`              | List all managed apps                 |
| `pm2 restart app_name`  | Restart app                           |
| `pm2 stop app_name`     | Stop app                              |
| `pm2 delete app_name`   | Delete app from PM2                   |
| `pm2 logs`              | Show logs (stdout + stderr)           |
| `pm2 monit`             | Monitor CPU/memory usage in real-time |
| `pm2 describe app_name` | View detailed info about an app       |



🌍 PM2 + NGINX (Best Production Combo)

Typical production setup:
NGINX → acts as a reverse proxy (handles HTTPS, routing, load balancing)
PM2 → manages your Node.js processes

`How to optimize Node.js application performance?`

1. Use Asynchronous, Non-Blocking Code
Best Practices

Always use async/await or Promises instead of blocking code.
Avoid synchronous APIs like fs.readFileSync, crypto.pbkdf2Sync, etc.

❌ Bad
const data = fs.readFileSync('file.txt'); // blocks event loop
✅ Good
const data = await fs.promises.readFile('file.txt');


2. Use Clustering to Utilize All CPU Cores

Node.js apps run on a single CPU core by default.
Use PM2 or Node’s built-in cluster module to run multiple instances.

Example with PM2:
pm2 start app.js -i max

`Explain memory leaks and how to detect them`

`How to implement caching strategie`

`Explain horizontal vs vertical scaling`

Scaling is how you increase the capacity of your application to handle more users, traffic, or data.
There are two main approaches:

🧱 1️⃣ Vertical Scaling (Scale Up)
Definition
Adding more power to a single server.

❗ Means:
More CPU cores
More RAM
Faster SSD
More network bandwidth

📌 Example
You have a Node.js server with:
2 CPU cores
4 GB RAM

Vertical scaling = upgrade to:
8 cores
32 GB RAM

✔️ Advantages
Easy to implement (no code changes)
No need for load balancers
Good for small apps

❌ Disadvantages
There’s a hardware limit (can’t scale forever)
Single-point of failure
Downtime during upgrade
Expensive after a point

2️⃣ Horizontal Scaling (Scale Out)
Definition
Adding more servers to handle load in parallel.

❗ Means:
Instead of 1 big machine → many smaller machines
Requests are load-balanced across them

📌 Example
Instead of 1 Node.js server with 8 cores, run:
4 Node.js instances on 4 different servers
Each handles part of the traffic.

✔️ Advantages
High scalability (can add infinite servers)
High availability (if one server crashes, others work)
Better performance for distributed systems

❌ Disadvantages
More complex architecture
Requires:
Load balancers (NGINX, AWS ELB)
Distributed caches (Redis)
Stateless APIs
Harder to debug

`What are Worker Threads and when to use them?`
Node.js normally runs JavaScript in a single thread (the event loop).
This is great for I/O tasks but bad for CPU-heavy work, because heavy computation will block the event loop and slow down your entire app.

👉 Worker Threads allow Node.js to run JavaScript in parallel threads.

They enable:
Parallel execution of CPU-intensive tasks
Offloading heavy calculations from the main thread
Keeping the event loop responsive
Worker Threads became stable in Node.js 12+.

Use them only for CPU-intensive tasks, such as:

✔️ Good Use Cases

Heavy calculations (math, loops, encryption, compression)
Image / video processing
Data transformation and parsing
Hashing large files (PBKDF2, bcrypt)
Converting PDFs, Excel, or CSV processing

❌ Not Needed For

Database queries
API calls
File I/O
Network operations
Any other I/O tasks
Those are already efficiently handled by Node's event loop.


Why Worker Threads?

Because Node.js is single-threaded, so a heavy operation like this:
for (let i = 0; i < 1e10; i++) {}

will block your server and make all API requests slow.
By offloading it to a worker thread, your main thread stays free to handle incoming requests.


| Concept              | Explanation                                               |
| -------------------- | --------------------------------------------------------- |
| What are they?       | Parallel threads inside Node.js                           |
| Why?                 | Avoid blocking the event loop during CPU-heavy tasks      |
| Good for             | CPU work like hashing, image processing, data parsing     |
| Not good for         | Database queries, API calls, file I/O                     |
| Compare with cluster | Workers: parallel computation, Cluster: parallel requests |

# Node.js Internals

`How does Node.js handle I/O operations internally?`

Excellent question! This tests your understanding of Node.js architecture and how it achieves non-blocking I/O. Let me break down the internals:

## Node.js Architecture Overview

```
┌─────────────────────────────────────────┐
│        Your JavaScript Code             │
│         (Single Thread)                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           V8 Engine                     │
│      (JavaScript Runtime)               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Node.js Bindings                │
│        (C++ Integration)                │
└──────────────┬──────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
┌─────▼─────┐    ┌─────▼─────┐
│  libuv    │    │   Other   │
│ (Event    │    │ C++ APIs  │
│  Loop &   │    │ (crypto,  │
│ Thread    │    │  zlib)    │
│  Pool)    │    │           │
└───────────┘    └───────────┘
      │
┌─────▼──────────────────────────┐
│    Operating System            │
│    (Kernel I/O APIs)           │
└────────────────────────────────┘
```

## The Core Components

### 1. **libuv - The Heart of Node.js I/O**

libuv is a **C library** that provides:
- Event loop implementation
- Asynchronous I/O operations
- Thread pool for operations that can't be done asynchronously
- Cross-platform abstraction layer

### 2. **Two Types of I/O Operations**

Node.js handles I/O in two different ways depending on the operation:

#### A. **Non-blocking I/O (Kernel Async I/O)**

```javascript
// Network operations, file system operations (on some platforms)
const fs = require('fs');

// This uses kernel async I/O - NO thread pool
fs.readFile('file.txt', (err, data) => {
  console.log('File read complete');
});
```

**How it works:**
```
1. JavaScript calls fs.readFile()
2. Node.js delegates to libuv
3. libuv uses OS kernel async APIs (epoll/kqueue/IOCP)
4. Kernel performs I/O in the background
5. Kernel notifies libuv when complete
6. libuv adds callback to event loop
7. JavaScript callback executes
```

#### B. **Thread Pool Operations**

Some operations **cannot be done asynchronously** by the OS, so they use a thread pool:

```javascript
// These operations use the thread pool:
// - fs.* (file system operations) on some platforms
// - dns.lookup()
// - crypto operations (pbkdf2, randomBytes, etc.)
// - zlib compression

const crypto = require('crypto');

// This uses thread pool (default: 4 threads)
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
  console.log('Hash complete');
});
```

**How it works:**
```
1. JavaScript calls crypto.pbkdf2()
2. Node.js delegates to libuv
3. libuv assigns work to a thread from thread pool
4. Worker thread performs blocking operation
5. When complete, result is queued in event loop
6. JavaScript callback executes on main thread
```

## Event Loop Phases (Detailed)

```javascript
   ┌───────────────────────────┐
┌─>│        timers             │ <- setTimeout, setInterval callbacks
│  └─────────────┬─────────────┘
│                │
│  ┌─────────────▼─────────────┐
│  │   pending callbacks       │ <- System error callbacks
│  └─────────────┬─────────────┘
│                │
│  ┌─────────────▼─────────────┐
│  │    idle, prepare          │ <- Internal operations
│  └─────────────┬─────────────┘
│                │
│  ┌─────────────▼─────────────┐
│  │        poll               │ <- NEW I/O events, execute I/O callbacks
│  │                           │    (most callbacks execute here)
│  └─────────────┬─────────────┘
│                │
│  ┌─────────────▼─────────────┐
│  │        check              │ <- setImmediate() callbacks
│  └─────────────┬─────────────┘
│                │
│  ┌─────────────▼─────────────┐
│  │   close callbacks         │ <- socket.on('close', ...)
│  └─────────────┬─────────────┘
│                │
└────────────────┘
```

## Practical Example - How Network Request Works

```javascript
const http = require('http');

// 1. Main thread executes this
http.get('http://example.com', (res) => {
  // 6. Callback executes on main thread
  res.on('data', (chunk) => {
    // 8. Data callback executes on main thread
    console.log(chunk);
  });
});

// 2. Main thread continues (non-blocking)
console.log('Request sent, continuing...');
```

**Internal flow:**

```
Main Thread (V8)              libuv              Operating System
     │                          │                       │
     │  http.get()              │                       │
     ├─────────────────────────>│                       │
     │                          │  epoll_ctl()          │
     │                          ├──────────────────────>│
     │                          │                       │
     │  continues execution     │                       │ DNS lookup
     │  (non-blocking)          │                       │ TCP connection
     │                          │                       │ Send HTTP request
     │                          │                       │
     │                          │  epoll_wait()         │
     │                          │  (waiting for events) │
     │                          │<──────────────────────┤
     │                          │  "data available"     │
     │                          │                       │
     │  callback queued         │                       │
     │<─────────────────────────┤                       │
     │  callback executes       │                       │
```

## Thread Pool Configuration

```javascript
// Default thread pool size: 4
// Can be changed with environment variable:
process.env.UV_THREADPOOL_SIZE = 8; // Must be set before any I/O

const crypto = require('crypto');

// These will run concurrently on thread pool
for (let i = 0; i < 10; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
    console.log(`Hash ${i} complete`);
  });
}

// First 8 run in parallel (thread pool size = 8)
// Remaining 2 wait for threads to become available
```

## Operations Using Thread Pool vs Kernel Async I/O

### **Thread Pool (UV_THREADPOOL_SIZE - default 4):**
```javascript
// File system operations
fs.readFile()
fs.writeFile()

// DNS lookups
dns.lookup() // Uses getaddrinfo() - blocking

// Crypto operations
crypto.pbkdf2()
crypto.randomBytes()
crypto.scrypt()

// Compression
zlib.deflate()
zlib.gzip()
```

### **Kernel Async I/O (No thread pool):**
```javascript
// Network operations
http.request()
net.createConnection()
tls.connect()

// DNS queries (not lookups)
dns.resolve() // Uses c-ares library - async

// Pipes, TTY
process.stdin
process.stdout
```

## Performance Implications

### Example: CPU-bound vs I/O-bound

```javascript
const crypto = require('crypto');
const https = require('https');

console.time('Crypto operations');
// Uses thread pool - limited by UV_THREADPOOL_SIZE
for (let i = 0; i < 10; i++) {
  crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
    if (i === 9) console.timeEnd('Crypto operations');
  });
}

console.time('Network operations');
// Uses kernel async I/O - NOT limited by thread pool
for (let i = 0; i < 100; i++) {
  https.get('https://example.com', (res) => {
    if (i === 99) console.timeEnd('Network operations');
  });
}

// Network operations complete much faster!
// They don't compete for thread pool resources
```

## Event Loop in Action - Complete Flow

```javascript
const fs = require('fs');

console.log('1: Synchronous start');

// Goes to timers phase
setTimeout(() => {
  console.log('2: setTimeout');
}, 0);

// Goes to check phase
setImmediate(() => {
  console.log('3: setImmediate');
});

// I/O operation
fs.readFile(__filename, () => {
  console.log('4: fs.readFile callback');
  
  setTimeout(() => {
    console.log('5: setTimeout inside readFile');
  }, 0);
  
  setImmediate(() => {
    console.log('6: setImmediate inside readFile');
  });
  
  process.nextTick(() => {
    console.log('7: nextTick inside readFile');
  });
});

process.nextTick(() => {
  console.log('8: nextTick');
});

console.log('9: Synchronous end');

/* Output:
1: Synchronous start
9: Synchronous end
8: nextTick                    <- nextTick queue
2: setTimeout                  <- Timer phase (order may vary)
3: setImmediate               <- Check phase (order may vary)
4: fs.readFile callback       <- Poll phase (I/O callback)
7: nextTick inside readFile   <- nextTick queue
6: setImmediate inside readFile <- Check phase (always before timer when inside I/O)
5: setTimeout inside readFile  <- Next timer phase
*/
```

## Under the Hood: Platform Differences

### **Linux - epoll**
```c
// libuv uses epoll on Linux
int epoll_fd = epoll_create1(0);
epoll_ctl(epoll_fd, EPOLL_CTL_ADD, socket_fd, &event);
epoll_wait(epoll_fd, events, MAX_EVENTS, timeout);
```

### **macOS - kqueue**
```c
// libuv uses kqueue on macOS
int kq = kqueue();
kevent(kq, &change_list, 1, NULL, 0, NULL);
kevent(kq, NULL, 0, &event_list, 1, &timeout);
```

### **Windows - IOCP**
```c
// libuv uses IOCP on Windows
HANDLE iocp = CreateIoCompletionPort(INVALID_HANDLE_VALUE, NULL, 0, 0);
GetQueuedCompletionStatus(iocp, &bytes, &key, &overlapped, timeout);
```

## Blocking vs Non-blocking Example

```javascript
const fs = require('fs');

// ❌ BLOCKING - Stops event loop!
console.log('Before sync read');
const data = fs.readFileSync('large-file.txt');
console.log('After sync read');
// Event loop is BLOCKED during file read

// ✅ NON-BLOCKING - Event loop continues
console.log('Before async read');
fs.readFile('large-file.txt', (err, data) => {
  console.log('Async read complete');
});
console.log('After async read (file still reading)');
// Event loop processes other events while file is being read
```

## Interview Key Points

**1. Node.js is single-threaded for JavaScript execution, but multi-threaded for I/O:**
- Main thread runs JavaScript (V8)
- libuv manages thread pool for certain operations
- Kernel handles network I/O asynchronously

**2. Not all async operations use the thread pool:**
- Network operations use kernel async I/O (epoll/kqueue/IOCP)
- File system, crypto, DNS lookups use thread pool

**3. Thread pool size matters:**
- Default: 4 threads
- Can be increased via `UV_THREADPOOL_SIZE`
- Only affects operations that use thread pool

**4. Event loop delegates to libuv:**
- libuv provides cross-platform async I/O
- Handles both kernel async I/O and thread pool operations
- Returns results to event loop for callback execution

**5. This is why Node.js excels at I/O-bound tasks:**
- Thousands of concurrent network connections without blocking
- But CPU-intensive tasks still block the main thread

This demonstrates deep understanding of Node.js internals and architecture!

` Explain the difference between process.nextTick() and setImmediate()`

Excellent question! This is a **classic Node.js interview question** that tests deep understanding of the event loop. Let me break it down:

## Quick Answer

- **`process.nextTick()`** - Executes **before** the event loop continues (highest priority)
- **`setImmediate()`** - Executes in the **check phase** of the event loop (next iteration)


```
   ┌───────────────────────────┐
┌─>│           timers          │ <- setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ <- I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ <- internal use
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ <- incoming connections, data
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ <- setImmediate() callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │ <- socket.on('close', ...)
│  └─────────────┬─────────────┘
│                │
│     process.nextTick() runs HERE (between every phase)
└────────────────┘
```

## Execution Order Example

```javascript
console.log('1: Start');

setImmediate(() => {
  console.log('2: setImmediate');
});

process.nextTick(() => {
  console.log('3: nextTick');
});

console.log('4: End');

// Output:
// 1: Start
// 4: End
// 3: nextTick        <- Executes BEFORE event loop continues
// 2: setImmediate    <- Executes in next event loop iteration
```

## Detailed Comparison

### process.nextTick()

```javascript
// Executes IMMEDIATELY after current operation
// Before ANY I/O events (even before timers with 0 delay)

process.nextTick(() => {
  console.log('nextTick callback');
});

setTimeout(() => {
  console.log('setTimeout 0ms');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

// Output:
// nextTick callback
// setTimeout 0ms
// setImmediate
```

**Characteristics:**
- Runs **before** the event loop continues
- Has **highest priority**
- Multiple `nextTick` callbacks form a **queue that must complete** before moving on
- Can **starve the event loop** if used recursively

### setImmediate()

```javascript
// Executes in the CHECK phase of event loop
// After I/O events are processed

setImmediate(() => {
  console.log('setImmediate callback');
});

// Output depends on when it's called
```

**Characteristics:**
- Runs in the **check phase** of the event loop
- Executes **after I/O events**
- Better for **deferring work** without blocking
- **Cannot starve** the event loop

## I/O Context Matters!

The order between `setTimeout(0)` and `setImmediate()` **depends on context**:

### Outside I/O Cycle (Non-deterministic)

```javascript
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

// Output: Can be either order!
// Why? Depends on system performance when entering event loop
```

### Inside I/O Cycle (Deterministic)

```javascript
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);

  setImmediate(() => {
    console.log('immediate');
  });
});

// Output: ALWAYS
// immediate
// timeout
// 
// Why? setImmediate is checked right after poll phase
```

## Practical Use Cases

### 1. process.nextTick() - Emit events after construction

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    
    // ❌ Wrong: Listener not registered yet
    // this.emit('event');
    
    // ✅ Correct: Allow listener registration first
    process.nextTick(() => {
      this.emit('event');
    });
  }
}

const emitter = new MyEmitter();
emitter.on('event', () => {
  console.log('Event fired!');
});
```

### 2. setImmediate() - Break up long operations

```javascript
// ❌ Blocks event loop
function processArray(arr) {
  arr.forEach(item => {
    // Heavy computation
    doHeavyWork(item);
  });
}

// ✅ Yields to event loop between batches
function processArrayAsync(arr, callback) {
  const chunk = arr.splice(0, 100);
  
  chunk.forEach(item => {
    doHeavyWork(item);
  });
  
  if (arr.length > 0) {
    setImmediate(() => processArrayAsync(arr, callback));
  } else {
    callback();
  }
}
```

### 3. process.nextTick() - Error handling pattern

```javascript
function asyncOperation(data, callback) {
  if (!data) {
    // ✅ Consistent async behavior
    process.nextTick(() => {
      callback(new Error('Data required'));
    });
    return;
  }
  
  // Actual async work
  fs.readFile(data, callback);
}
```

## Recursion Danger with nextTick

```javascript
// ❌ DANGEROUS: Starves event loop!
let count = 0;
function recurseNextTick() {
  if (count < 1000000) {
    count++;
    process.nextTick(recurseNextTick);
  }
}
recurseNextTick();
// Event loop is BLOCKED until all nextTick callbacks complete

// ✅ SAFE: Allows event loop to process I/O
let count2 = 0;
function recurseImmediate() {
  if (count2 < 1000000) {
    count2++;
    setImmediate(recurseImmediate);
  }
}
recurseImmediate();
// Event loop processes I/O between each callback
```

## Complete Execution Order

```javascript
console.log('1: Sync');

setTimeout(() => console.log('2: setTimeout 0'), 0);

setImmediate(() => console.log('3: setImmediate'));

process.nextTick(() => console.log('4: nextTick'));

Promise.resolve().then(() => console.log('5: Promise'));

console.log('6: Sync');

// Output:
// 1: Sync
// 6: Sync
// 4: nextTick          <- nextTick queue
// 5: Promise           <- Microtask queue
// 2: setTimeout 0      <- Timer phase
// 3: setImmediate      <- Check phase
```

## Priority Order (Highest to Lowest)

1. **Synchronous code**
2. **`process.nextTick()` queue**
3. **Microtasks (Promises)**
4. **Event loop phases** (timers → I/O → check/setImmediate)

## Interview Tips - When to Use What

| Scenario | Use |
|----------|-----|
| Execute before ANY I/O | `process.nextTick()` |
| Emit events after construction | `process.nextTick()` |
| Consistent async behavior | `process.nextTick()` |
| Break up CPU-intensive tasks | `setImmediate()` |
| Defer work after I/O | `setImmediate()` |
| Avoid starving event loop | `setImmediate()` |

## Key Interview Points

1. **`nextTick` runs between event loop phases, `setImmediate` runs IN a phase**
2. **`nextTick` can starve I/O, `setImmediate` cannot**
3. **Inside I/O callbacks, `setImmediate` always runs before `setTimeout(0)`**
4. **Microtasks (Promises) run after `nextTick` but before event loop phases**

This demonstrates deep understanding of Node.js internals!


# Edgcase in express

`What happens during middleware error propagation?`

## How Error Propagation Works

When an error occurs in middleware, Express **skips all regular middleware** and jumps directly to **error-handling middleware**.

```javascript
// Regular middleware (will be skipped on error)
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next(new Error('Something went wrong!')); // Error triggered
});

app.use((req, res, next) => {
  console.log('Middleware 3'); // ❌ SKIPPED
  next();
});

// Error-handling middleware (4 parameters!)
app.use((err, req, res, next) => {
  console.log('Error handler'); // ✅ Executed
  res.status(500).json({ error: err.message });
});
```

**Output:**
```
Middleware 1
Middleware 2
Error handler
```

## Key Rules

### 1. **Passing Errors to next()**

```javascript
// ✅ Correct: Pass error to next()
app.get('/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return next(new Error('User not found')); // Propagates error
      }
      res.json(user);
    })
    .catch(next); // Shorthand for .catch(err => next(err))
});
```

### 2. **Async/Await Error Handling**

```javascript
// ❌ Wrong: Unhandled promise rejection
app.get('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id); // If this throws, no error handler catches it
  res.json(user);
});

// ✅ Correct: Wrap in try-catch
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    next(err); // Propagates to error handler
  }
});

// ✅ Better: Use express-async-handler
const asyncHandler = require('express-async-handler');

app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error('User not found');
  res.json(user);
}));
```

### 3. **Error Handler Signature (4 parameters)**

```javascript
// ❌ Won't catch errors (only 3 params)
app.use((req, res, next) => {
  console.log('Not an error handler');
});

// ✅ Error handler (4 params required)
app.use((err, req, res, next) => {
  console.log('This is an error handler');
  res.status(500).send(err.message);
});
```

## Multiple Error Handlers

Error handlers are **also processed in order**:

```javascript
// First error handler
app.use((err, req, res, next) => {
  console.log('Error Handler 1');
  if (err.type === 'database') {
    return res.status(500).json({ error: 'Database error' });
  }
  next(err); // Pass to next error handler
});

// Second error handler (catch-all)
app.use((err, req, res, next) => {
  console.log('Error Handler 2');
  res.status(500).json({ error: err.message });
});
```

## Common Patterns

### Pattern 1: Custom Error Classes

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Centralized error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      name: err.name,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});
```

### Pattern 2: Async Wrapper

```javascript
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
app.get('/user/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
}));
```

### Pattern 3: 404 Handler

```javascript
// Regular routes
app.get('/users', getUsers);
app.post('/users', createUser);

// 404 handler (after all routes)
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// Error handler (must be last)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});
```

## Critical Interview Points

**1. Synchronous vs Asynchronous Errors:**
- Synchronous errors (thrown in route handlers) are **automatically caught**
- Asynchronous errors (in promises/async) must be **explicitly passed to next()**

```javascript
// Synchronous - automatically caught
app.get('/sync', (req, res) => {
  throw new Error('Sync error'); // ✅ Caught by Express
});

// Asynchronous - must manually propagate
app.get('/async', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Async error')); // ✅ Must call next()
  }, 100);
});
```

**2. Calling next() multiple times:**
```javascript
app.get('/bad', (req, res, next) => {
  res.send('Response sent');
  next(new Error('Error')); // ❌ Error: Can't set headers after they're sent
});
```

**3. Default error handler:**
If no custom error handler is defined, Express uses a default one that sends stack traces in development.

## Pro Tip for Interviews

Mention that in **Express 5** (upcoming), async route handlers will automatically catch rejected promises without needing try-catch or wrappers!

This shows you understand the full error handling lifecycle in Express!

 `What is express.json() vs express.urlencoded()?`

Excellent question! These are both **built-in middleware functions** in Express for parsing incoming request bodies. Here's the difference:

## express.json()

Parses incoming requests with **JSON payloads** (Content-Type: application/json)

```javascript
app.use(express.json());

// Handles this request:
// POST /api/users
// Content-Type: application/json
// Body: {"name": "John", "age": 30}

app.post('/api/users', (req, res) => {
  console.log(req.body); // { name: 'John', age: 30 }
});
```

## express.urlencoded()

Parses incoming requests with **URL-encoded payloads** (Content-Type: application/x-www-form-urlencoded) - typically from HTML forms

```javascript
app.use(express.urlencoded({ extended: true }));

// Handles this request:
// POST /api/users
// Content-Type: application/x-www-form-urlencoded
// Body: name=John&age=30

app.post('/api/users', (req, res) => {
  console.log(req.body); // { name: 'John', age: '30' }
});
```

## The `extended` Option

**`extended: false`** - Uses `querystring` library (simpler, only supports basic key-value pairs)

**`extended: true`** - Uses `qs` library (supports nested objects, arrays, rich data)

```javascript
// extended: true allows nested objects
// name[first]=John&name[last]=Doe
// → { name: { first: 'John', last: 'Doe' } }

// extended: false doesn't parse nested objects
// → { 'name[first]': 'John', 'name[last]': 'Doe' }
```

## Common Setup

```javascript
// Typical API setup
app.use(express.json()); // For API clients sending JSON
app.use(express.urlencoded({ extended: true })); // For HTML forms
```

## Interview Tip
Interviewers often ask **when you'd use each**:
- **JSON**: REST APIs, modern SPAs, mobile apps
- **URL-encoded**: Traditional HTML forms, legacy systems

Without these middleware, `req.body` would be `undefined`!

 `How does Express handle route precedence?`
Great question! Express handles route precedence based on **the order in which routes are defined** in your code. Here's how it works:

## Route Matching Order

Express processes routes **sequentially from top to bottom**. The first route that matches the incoming request will handle it, and subsequent routes won't be checked (unless you call `next()`).

```javascript
app.get('/users/admin', (req, res) => {
  res.send('Admin user');
});

app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id}`);
});

// GET /users/admin → Returns "Admin user"
```

If you reverse the order:

```javascript
app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id}`);
});

app.get('/users/admin', (req, res) => {
  res.send('Admin user'); // This will NEVER be reached
});

// GET /users/admin → Returns "User admin" (treated as ID)
```

## Key Rules

**Specificity doesn't matter, only order matters** - More specific routes should be defined before generic/parameterized routes

**Route parameters are greedy** - `/:id` will match anything, including "admin"

**Regex routes** - Follow the same order-based precedence

**Middleware affects flow** - If middleware doesn't call `next()`, the request stops there

## Best Practices

```javascript
// ✅ Correct order: specific → generic
app.get('/users/me', getMyProfile);
app.get('/users/admin', getAdminPanel);
app.get('/users/:id', getUserById);

// Router-level precedence
app.use('/api/v1', v1Router);  // Checked first
app.use('/api/v2', v2Router);  // Checked second
```

This is a common interview question because it tests your understanding of Express's middleware chain!

 `Explain the difference between app.param() and route parameters`

**Route parameters** define dynamic values in a URL, while **`app.param()`** is middleware that runs **whenever a specific route parameter appears**.

---

## 1️⃣ **Route Parameters**

Used to capture dynamic values from the URL.

### Example

```js
app.get("/user/:id", (req, res) => {
  res.send(req.params.id);
});
```

`/user/10` → `req.params.id = "10"`

---

## 2️⃣ **app.param()**

Middleware that runs **automatically** whenever a certain parameter (like `:id`) is present in any route.

### Example

```js
app.param("id", (req, res, next, id) => {
  console.log("ID received:", id);
  req.userId = Number(id);
  next();
});

app.get("/user/:id", (req, res) => {
  res.send(req.userId);
});
```

### What happens

`app.param()` intercepts and processes `:id` before the route handler.

---

## **In short (interview-ready)**

* **Route parameters** extract values from the URL.
* **`app.param()`** runs middleware whenever that parameter is used, useful for validation, transformations, or DB lookups.

app.param("userId", async (req, res, next, userId) => {
  req.user = await User.findById(userId);
  if (!req.user) return res.status(404).send("User not found");
  next();
});

app.get("/users/:userId", (req, res) => {
  res.send(req.user);
});



`How does Express handle async errors without try-catch?`
const wrap = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

app.get("/user", wrap(async (req, res) => {
  const data = await db.getUser();
  res.send(data);
}));
In short: Express doesn’t catch async errors unless you use try-catch or a wrapper that forwards errors to next().

`What happens if you call res.send() twice?`

Calling **`res.send()` twice** in Express causes an error because the response is already finished.

### **Example**

```js
app.get("/", (req, res) => {
  res.send("First response");
  res.send("Second response");   // ❌
});
```

### **What happens**

* The **first `res.send()`** sends the response and closes the connection.
* The **second `res.send()`** triggers:

  ```
  Error: Can't set headers after they are sent.
  ```

### **Why**

Once headers/body are sent, Express cannot modify or resend them.

### **How to avoid**

Use:

* `return res.send(...)`
* Or ensure only one response path gets executed.



# Security Vulnerabilities

`What is timing attack in password comparison?`
   A timing attack in password comparison is a side-channel attack where an attacker measures how long your system takes to compare two values (like passwords, tokens, hashes) and uses those tiny time differences to guess the correct value one character at a time.

`Explain JWT vulnerabilities (none algorithm, weak secret)`

**JWT vulnerabilities** often come from **misconfiguring algorithms** or using a **weak secret**.

---

## 1️⃣ `alg: "none"` Vulnerability

If the server incorrectly allows tokens with `alg: "none"`, an attacker can **remove the signature** and still get accepted as valid.

### Example

Original JWT header:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Attacker changes it to:

```json
{
  "alg": "none",
  "typ": "JWT"
}
```

And sends a token like:

```text
header.payload.
```

(no signature part)

If the backend code blindly accepts `alg: "none"`:

```js
jwt.verify(token, secret, { algorithms: ["HS256", "none"] }); // ❌ bad
```

The attacker can forge **any user**, even admin.

### Mitigation

* Explicitly **disallow `none`**.
* Always specify allowed algorithms:

```js
jwt.verify(token, secret, { algorithms: ["HS256"] }); // ✅
```

---

## 2️⃣ Weak Secret (HS256 with Guessable Key)

For symmetric algorithms like `HS256`, a **weak or short secret** can be brute-forced.

### Example

```js
const secret = "12345"; // ❌ weak
jwt.sign({ role: "admin" }, secret, { algorithm: "HS256" });
```

An attacker:

* Captures a valid token
* Brute-forces the secret offline
* Once the secret is known, they can sign **any token** (e.g., make themselves admin).

### Mitigation

* Use **strong, long random secrets** (e.g., 32+ bytes).
* Store secrets securely (env vars, secret manager).
* Prefer asymmetric algorithms (`RS256`) when possible, so public key is used for verification.

---

**In one line for interview:**

> JWT can be vulnerable if `alg: none` is accepted (no signature check) or if a weak secret is used for HS256, allowing attackers to forge valid tokens.


`What is dependency confusion attack?`

**Dependency Confusion Attack** happens when an attacker uploads a malicious package to a public registry (like npm) using the **same name** as an internal/private package your company uses.
Your build system then **accidentally downloads the attacker’s package** instead of the internal one.

### **Example**

Your project depends on:

```
@company/utils
```

But this package is only available in your private npm registry.

If the attacker uploads a public package named:

```
@company/utils
```

with a **higher version**, npm may pull the attacker’s package because:

* Public registry is checked first
* Higher version number wins

### **Impact**

* Remote code execution during build
* Sensitive data theft (tokens, credentials)
* Supply-chain compromise

### **Prevention**

* Enforce private registry priority
* Use `npm config set always-auth=true`
* Namespace internal packages clearly
* Block installation from public registry for internal names


**CSRF (Cross-Site Request Forgery)** is an attack where a victim’s browser is tricked into sending unwanted requests to a website where they are already logged in.

### **Simple Example**

If a user is logged into a banking site, an attacker can trick them into clicking:

```html
<img src="https://bank.com/transfer?to=attacker&amount=5000" />
```

The browser sends the request **with the user's cookies**, causing an unauthorized money transfer.

### **Impact**

* Unwanted actions (transfer money, change email/password, delete account)
* Performed **as the logged-in user**

### **Prevention**

* CSRF Tokens (unique per request/form)
* SameSite cookies (`SameSite=Lax` or `Strict`)
* Double-submit cookie pattern
* Requiring re-authentication for critical actions


`What is server-side request forgery (SSRF)?`

Server-Side Request Forgery (SSRF) is a vulnerability where an attacker tricks the server into making unintended HTTP requests to internal or external URLs.

Key Idea

The attacker controls a URL input, and the server uses it to make a request.

Example
// Vulnerable Node.js code
app.get("/fetch", async (req, res) => {
  const data = await fetch(req.query.url);  // attacker controls this
  res.send(await data.text());
});


Attacker sends:
/fetch?url=http://localhost:8080/admin
The server will fetch internal services that the attacker should never access.

Impact
Access internal APIs
Read cloud metadata (AWS/GCP keys)
Perform internal port scanning

Prevention
Whitelist allowed URLs
Block internal IP ranges
Never fetch URLs directly from user input