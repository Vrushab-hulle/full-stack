import { Router } from "express";
import {
  body,
  checkSchema,
  header,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { createUservalidationSchema } from "../utils/vaidationSchemas.js";
import { mockUsers } from "../mockUsers.js";
import { handleUserIndex } from "../utils/middlewares.js";

const userRouter = Router();

//QueryParams--->/api/users?filter=username&value=Bret
userRouter.get(
  "/api/users",
  query("filter").isString().notEmpty().withMessage("Must not be Empty"),
  (req, res) => {
    // console.log("req.session.id", req.session.id);
    // req.sessionStore.get(req.session.id, (err, sessionData) => {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   }
    //   console.log(sessionData);
    // });

    const result = validationResult(req);
    console.log(result);
    const { filter, value } = req.query;
    if (filter && value) {
      const user = mockUsers.filter((user) => user[filter].includes(value));
      res.send(user);
    }
    res.send(mockUsers);
  }
);

//post api
userRouter.post(
  "/api/users",
  checkSchema(createUservalidationSchema),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }
    //validated data from request
    const data = matchedData(req);
    console.log(data);
    const newUser = { id: mockUsers.length + 1, ...data };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  }
);

//Route Params
userRouter.get("/api/users/:id", handleUserIndex, (req, res) => {
  const { findUserIndex } = req;
  const user = mockUsers[findUserIndex];
  if (!user) return res.sendStatus(400);
  // console.log(user);
  res.send(user);
});

//to update the data completely
userRouter.put("/api/users/:id", handleUserIndex, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.status(200).send({ msg: "User Updated Succesfully" });
});

//to update the specific data
userRouter.patch("/api/users/:id", (req, res) => {
  const { params, body } = req;
  const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.status(200).send({ msg: "User Updated Succesfully" });
});

userRouter.delete("/api/users/:id", handleUserIndex, (req, res) => {
  const { findUserIndex } = req;
  const deletedUser = mockUsers.splice(findUserIndex, 1);
  return res.status(200).send({ msg: "User Deleted SuccesFully", deletedUser });
});

userRouter.get("/api/user/inbox", (req, res) => {
  if (!req.session.user) return res.statusCode(401);
  return res
    .status(200)
    .send({ msg: "Hey someone named xyz have sent you mail" });
});

export default userRouter;
