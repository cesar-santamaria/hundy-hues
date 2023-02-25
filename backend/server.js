const app = require("./app");
const client = require("./db/client");
const morgan = require("morgan");

const port = 5432;

app.use(morgan("dev"));

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
