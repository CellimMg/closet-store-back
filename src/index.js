import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js"
import productsRouter from "./routes/productsRouter.js"
import cartRouter from "./routes/cartRouter.js"


const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(checkoutRouter);
app.use(productsRouter);
app.use(cartRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    "Service Running!"
  );
});