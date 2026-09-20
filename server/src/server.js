import connectDB from "./config/db.js"
import dotenv from "dotenv"
import app from "../src/app.js"

dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.json({
    message: "Courier Tracking API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});