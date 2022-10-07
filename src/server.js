const express = require("express");
const cors = require("cors");
const PORT = 5000;
require("./db/connection"); // establishing database connection

// import routes
const categoryRoutes = require("./routes/category.routes");
const productionRoutes = require("./routes/product.routes");
const { errorMiddleware } = require("./middlewares/error");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/category", categoryRoutes);
app.use("/api/product", productionRoutes);
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
