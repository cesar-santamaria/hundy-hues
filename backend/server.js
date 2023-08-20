const app = require("./app");
const client = require("./db/client");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5432;

app.use(morgan("dev"));

// render
app.use(
  cors({
    origin: "",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT} 🙉`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
