import { Router } from "express";

const productRouter = Router();


productRouter.get("/api/products", (req, res) => {
  return res.send([{ id: 123, name: "laptop", price: 50000 }]);
});

export default productRouter;
