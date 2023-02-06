const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 8000;

app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`App is listening on port ${port} 🙉`);
});
