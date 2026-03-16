const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

// Hardcoded config — works without .env file
const MONGODB_URI = 'mongodb://127.0.0.1:27017/elderly_health_db';
const SESSION_SECRET = 'elderly_health_secret_key_2024';
const PORT = 3000;

const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.session.user || null;
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const healthRoutes = require('./routes/health');
const consultationRoutes = require('./routes/consultation');
const medicationRoutes = require('./routes/medication');
const emergencyRoutes = require('./routes/emergency');
const profileRoutes = require('./routes/profile');
const scienceRoutes = require('./routes/science');
const shopRoutes = require('./routes/shop');

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/health', healthRoutes);
app.use('/consultation', consultationRoutes);
app.use('/medication', medicationRoutes);
app.use('/emergency', emergencyRoutes);
app.use('/profile', profileRoutes);
app.use('/science', scienceRoutes);
app.use('/shop', shopRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <html><body style="font-family:Arial;text-align:center;padding:50px;background:#f0f4f8;">
      <h1 style="color:#e53e3e;">404 - Page Not Found</h1>
      <a href="/" style="color:#3182ce;text-decoration:none;">← Go Home</a>
    </body></html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Open your browser and visit: http://localhost:${PORT}`);
});
