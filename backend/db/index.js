import client from "./client";

export default {
  client,
  ...require("./modals/product"),
  ...require("./modals/order"),
  ...require("./modals/review"),
  ...require("./modals/order-items"),
  ...require("./modals/user"),
  ...require("./modals/favorite"),
};
