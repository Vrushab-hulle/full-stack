import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import { connectDb } from "./db/connectDb.js";
import routes from "./routes/index.js";
import { middlewareExample } from "./utils/middlewares.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(middlewareExample);
//register global routes folder in index file
app.use(express.json()); //allows us to parse incoming request:req.body
app.use(cookieParser()); //allows us to parse incoming cookie
app.use(routes);

app.listen(port, () => {
  connectDb();
  console.log(`server is up on port ${port}`);
});

//------------------------------------------------------------------------
//Returns middleware that only parses json and only
// looks at requests where the Content-Type header matches the type option.
// app.use(express.json());

//here is helloworld is passed to cookieParser function as a signed cokkie
//if kept empty then its an unsigned cookie
// app.use(cookieParser("helloworld"));
// app.use(
//   session({
//     secret: "bob the builder",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 60000 * 60,
//     },
//   })
// );

// app.use(passport.initialize())
// app.use(passport.session())

// app.use(routes);

// const PORT = process.env.PORT || 8000;

// //enabling middleware for specific route
// app.get("/", middlewareExample, (req, res) => {
//   //here signed key is not mandatory if we want our cookie to be signed i.e
//   //  which generted some unique value then we can use signed along with the
//   // cookieParser("helloworld") is also required
//   // res.cookie("hello", "world", { maxAge: 60000 * 60 * 2, signed: true });

//   console.log(req.session.id);
//   req.session.visited = true;

//   res.status(201).send({ msg: "Hello World" });
// });

// app.post("/api/auth", (req, res) => {
//   const { username, password } = req.body;

//   const findUser = mockUsers.find(
//     (user) => user.username.toLowerCase() === username.toLowerCase()
//   );
//   if (!findUser || findUser.password !== password)
//     return res.status(404).send("Bad credential");

//   req.session.user = findUser;

//   return res.status(200).send(findUser);
// });

// app.get("/api/auth/status", (req, res) => {
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send("Not Authenticated");
// });
