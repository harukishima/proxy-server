const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const config = require("./config");
// Create Express Server
const app = express();

// Configuration
const PORT = config.port;
const HOST = "0.0.0.0";
const API_SERVICE_URL = config.baseURL;

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

// Info GET endpoint
app.get("/info", (req, res, next) => {
  res.send(
    "This is a proxy service which proxies to Billing and Account APIs."
  );
});

app.use(
  "/proxy",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/proxy`]: "",
    },
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
