const client = require("./client");

module.exports = {
  client,
  ...require("./modals/product"),
  ...require("./modals/order"),
  ...require("./modals/review"),
  ...require("./modals/order-items"),
  ...require("./modals/user"),
  ...require("./modals/favorite"),
};
