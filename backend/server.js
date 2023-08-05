const app = require("./app");
const client = require("./db/client");
const morgan = require("morgan");
const cors = require("cors");

const port = 5432;

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
    app.listen(port, () => {
      console.log(`App is listening on port: ${port} 🙉`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
