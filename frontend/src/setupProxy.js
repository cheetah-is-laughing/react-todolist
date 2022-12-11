import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app) {
  app.use(
    "/todos",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
