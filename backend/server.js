const express = require("express");
const connectDB = require("./config/mongodb");
const urlRoutes = require("./routes/UrlRoutes");
const userRoutes = require("./routes/UserRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv");
const path = require("path");

const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/", urlRoutes);
app.use("/", userRoutes);

// -----------------deployment-----------------

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -----------------deployment-----------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
