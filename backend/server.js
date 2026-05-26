import 'dotenv/config'
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// ─── Startup: Validate required env vars ──────────────────────────────────────
const REQUIRED_ENV = ["MONGODB_URI", "JWT_SECRET", "STRIPE_SECRET_KEY"];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`[FATAL] Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

// ─── App Config ───────────────────────────────────────────────────────────────
const app = express();
const port = process.env.PORT || 4000;

// ─── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5174",
  process.env.ADMIN_URL    || "http://localhost:5173",
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Sanitize incoming data to prevent NoSQL injection attacks
app.use(mongoSanitize());

// ─── Rate Limiters ────────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: "Too many authentication attempts, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Database Connection (once at startup) ────────────────────────────────────
connectDB()
  .then(() => console.log("[DB] Connected to MongoDB"))
  .catch((err) => {
    console.error("[DB] Connection failed:", err.message);
    process.exit(1);
  });

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api", globalLimiter);
app.use("/api/food", foodRouter);
app.use("/images", express.static(process.env.VERCEL ? "/tmp" : "uploads"));
app.use("/api/user", authLimiter, userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Delivery API is running" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.message && err.message.startsWith("CORS")) {
    return res.status(403).json({ success: false, message: err.message });
  }
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON in request body" });
  }
  console.error("[ERROR]", err.message || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`[SERVER] Running on http://localhost:${port}`);
});

export default app;