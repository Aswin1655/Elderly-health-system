# 🏥 ElderCare — Intelligent Health Management System

A full-stack Node.js + MongoDB web application for managing elderly health, based on the research paper:
**"Design and Optimization of an Intelligent Health Management Information System for Elderly People"**

---

## 📋 FEATURES

| Module | Description |
|--------|-------------|
| 🔐 Auth | Register, Login, Logout with secure password hashing |
| 📊 Health Monitor | Log & track vitals: heart rate, BP, blood sugar, SpO2, weight, temperature |
| 👨‍⚕️ Consultations | Book appointments with doctors (Video, Voice, Chat, In-Person) |
| 💊 Medications | Manage medications with daily reminder schedules |
| 🚨 Emergency | SOS button, emergency reporting, history log |
| 📚 Health Tips | Curated health articles by category (6 categories) |
| 🛒 Health Shop | Browse 12 health products with category filters |
| 👤 Profile | Edit personal info, emergency contacts, change password |

---

## ⚙️ STEP-BY-STEP SETUP IN VS CODE

### STEP 1 — Install Required Software

You need to install these **before** doing anything else:

#### A) Install Node.js
1. Go to: https://nodejs.org
2. Download the **LTS version** (the green button)
3. Run the installer and click **Next** through all steps
4. To verify: Open a terminal and type `node --version` → should show `v18.x.x` or higher

#### B) Install MongoDB Community Edition
1. Go to: https://www.mongodb.com/try/download/community
2. Select **Version**: Latest, **Platform**: Windows (or your OS), **Package**: MSI
3. Download and run the installer
4. Choose **Complete** installation
5. ✅ Check **"Install MongoDB as a Service"** (this makes it auto-start)
6. Click through and finish installation

**Verify MongoDB is running:**
- Press `Win + R`, type `services.msc`, press Enter
- Find **MongoDB** in the list — Status should be **Running**
- If not running: Right-click → Start

#### C) Install VS Code (if not installed)
1. Go to: https://code.visualstudio.com
2. Download and install

---

### STEP 2 — Open the Project in VS Code

1. Open **VS Code**
2. Click **File → Open Folder**
3. Navigate to and select the `elderly-health-system` folder
4. Click **Select Folder**

You should see all the project files in the left panel.

---

### STEP 3 — Open the Terminal in VS Code

- Press **Ctrl + `** (backtick key, top-left of keyboard)
  OR
- Click **Terminal → New Terminal** from the top menu

A terminal panel opens at the bottom of VS Code.

---

### STEP 4 — Install Project Dependencies

In the terminal, type this command and press Enter:

```bash
npm install
```

Wait for it to finish. You'll see a `node_modules` folder appear in the file panel.
This downloads all required packages (Express, Mongoose, etc.)

---

### STEP 5 — Seed Demo Data (Recommended)

This creates a demo user with sample health records so you can see the app working right away.

In the terminal, type:

```bash
node seed.js
```

You should see:
```
✅ Connected to MongoDB
✅ Demo user created: demo@eldercare.com / demo123
✅ Health records created (15 records)
✅ Consultations created
✅ Medications created
🎉 Seed complete!
```

---

### STEP 6 — Start the Application

In the terminal, type:

```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:3000
```

---

### STEP 7 — Open in Browser

Open your web browser (Chrome, Firefox, Edge) and go to:

```
http://localhost:3000
```

**Demo Login Credentials:**
- Email: `demo@eldercare.com`
- Password: `demo123`

---

## 🗂️ PROJECT STRUCTURE

```
elderly-health-system/
├── server.js              ← Main application entry point
├── package.json           ← Project dependencies
├── seed.js                ← Demo data generator
├── .env                   ← Environment variables
│
├── models/                ← MongoDB data schemas
│   ├── User.js
│   ├── HealthRecord.js
│   ├── Consultation.js
│   ├── Medication.js
│   ├── Emergency.js
│   └── Article.js
│
├── routes/                ← Page routes & logic
│   ├── auth.js            ← Login / Register / Logout
│   ├── dashboard.js       ← Home dashboard
│   ├── health.js          ← Health monitoring
│   ├── consultation.js    ← Doctor appointments
│   ├── medication.js      ← Medication manager
│   ├── emergency.js       ← Emergency help
│   ├── profile.js         ← User profile
│   ├── science.js         ← Health articles
│   └── shop.js            ← Health shop
│
├── middleware/
│   ├── auth.js            ← Login protection
│   └── layout.js          ← Shared HTML layout
│
└── public/
    ├── css/style.css      ← All styling
    └── js/main.js         ← Browser JavaScript
```

---

## 🔁 HOW TO STOP AND RESTART

**Stop the server:**
- Press `Ctrl + C` in the terminal

**Restart the server:**
```bash
npm start
```

---

## 🔧 FOR DEVELOPMENT (Auto-Restart on Changes)

Install nodemon globally once:
```bash
npm install -g nodemon
```

Then run:
```bash
npm run dev
```

This auto-restarts the server whenever you change a file.

---

## 🛑 TROUBLESHOOTING

### "MongoDB connection error"
- Make sure MongoDB service is running
- Press `Win + R` → type `services.msc` → find MongoDB → Start

### "Port 3000 already in use"
- Change the port in `.env` file: `PORT=3001`
- Then visit `http://localhost:3001`

### "Cannot find module 'express'"
- Run `npm install` again in the terminal

### Browser shows "This site can't be reached"
- Make sure you typed `npm start` and see the "Server running" message
- Use `http://localhost:3000` (not https)

---

## 📱 ALL PAGES & URLs

| Page | URL |
|------|-----|
| Login | http://localhost:3000/login |
| Register | http://localhost:3000/register |
| Dashboard | http://localhost:3000/dashboard |
| Health Monitor | http://localhost:3000/health |
| Add Vitals | http://localhost:3000/health/add |
| Consultations | http://localhost:3000/consultation |
| Book Appointment | http://localhost:3000/consultation/add |
| Medications | http://localhost:3000/medication |
| Emergency | http://localhost:3000/emergency |
| Health Tips | http://localhost:3000/science |
| Shop | http://localhost:3000/shop |
| My Profile | http://localhost:3000/profile |

---

Built with: Node.js · Express.js · MongoDB · Mongoose · Express-Session · Bcryptjs
