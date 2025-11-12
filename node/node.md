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




















