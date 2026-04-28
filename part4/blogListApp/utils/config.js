require("dotenv").config();

let PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

//grafana log related
let LOG_INSTANCE_ID = process.env.LOG_INSTANCE_ID;
let LOG_API_KEY = process.env.LOG_API_KEY;

module.exports = { MONGODB_URI, PORT, LOG_INSTANCE_ID, LOG_API_KEY };
