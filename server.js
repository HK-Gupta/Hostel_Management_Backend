const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/staffs", require("./routes/staffRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use(errorHandler);

app.listen(port, ()=> {
    console.log('Server running on port: ' + port)
});

// 50:22