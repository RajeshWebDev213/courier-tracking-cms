import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import shipmentRoutes from "./routes/shipmentRoutes.js"
import trackingRoutes from "./routes/trackingRoutes.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use("/api/auth",authRoutes);
app.use("/api/shipments",shipmentRoutes);
app.use("/api/tracking",trackingRoutes);

export default app;