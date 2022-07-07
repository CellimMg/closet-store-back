import express from "express";
import cors from "cors";
import chalk from 'chalk'

import authRouter from "./routes/authRouter.js";
import checkoutRouter from "./routes/checkoutRouter.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(checkoutRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(
    chalk.hex('#00ffff').bold(`Server is running on PORT: ${PORT}`)
  );
});