import express from "express"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import shipmentRoutes from "./routes/shipmentRoutes.js"
import trackingRoutes from "./routes/trackingRoutes.js"
import serviceRoutes from "./routes/serviceRoutes.js"
import galleryRoutes from "./routes/galleryRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminSettingsRoutes from "./routes/adminSettingsRoutes.js"


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth",authRoutes);
app.use("/api/shipments",shipmentRoutes);
app.use("/api/tracking",trackingRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/gallery",galleryRoutes)
app.use("/api/admin", adminRoutes);
app.use("/api/users",userRoutes);
app.use("/api/admin/settings", adminSettingsRoutes)

export default app;