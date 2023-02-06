import express from "express";
import morgan from "morgan";

const app = express();
const port = 8000;

app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`App is listening on port ${port} 🙉`);
});
