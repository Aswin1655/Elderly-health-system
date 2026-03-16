/**
 * SEED SCRIPT - Run this once to populate demo data
 * Usage: node seed.js
 */
const mongoose = require('mongoose');

// Hardcoded config — no .env needed
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/elderly_health_db';
process.env.SESSION_SECRET = 'elderly_health_secret_key_2024';
const User = require('./models/User');
const HealthRecord = require('./models/HealthRecord');
const Consultation = require('./models/Consultation');
const Medication = require('./models/Medication');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing demo data
    await User.deleteMany({ email: 'demo@eldercare.com' });
    const existing = await User.findOne({ email: 'demo@eldercare.com' });
    if (existing) {
      await HealthRecord.deleteMany({ user: existing._id });
      await Consultation.deleteMany({ user: existing._id });
      await Medication.deleteMany({ user: existing._id });
    }

    // Create demo user
    const user = new User({
      name: 'Ramesh Kumar',
      email: 'demo@eldercare.com',
      password: 'demo123',
      age: 68,
      gender: 'Male',
      phone: '9876543210',
      bloodGroup: 'B+',
      address: 'Sector 12, Hyderabad, Telangana',
      emergencyContact: 'Sunita Kumar (Daughter)',
      emergencyPhone: '9988776655'
    });
    await user.save();
    console.log('✅ Demo user created: demo@eldercare.com / demo123');

    // Create health records
    const records = [];
    for (let i = 14; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      records.push({
        user: user._id, date,
        heartRate: Math.floor(Math.random() * 20) + 68,
        bloodPressureSystolic: Math.floor(Math.random() * 30) + 115,
        bloodPressureDiastolic: Math.floor(Math.random() * 15) + 72,
        bloodSugar: Math.floor(Math.random() * 40) + 95,
        bloodOxygen: Math.floor(Math.random() * 4) + 96,
        weight: 72.5,
        temperature: (36.2 + Math.random() * 0.8).toFixed(1),
        notes: i === 0 ? 'Feeling good today' : ''
      });
    }
    await HealthRecord.insertMany(records);
    console.log('✅ Health records created (15 records)');

    // Create consultations
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    await Consultation.create([
      {
        user: user._id, doctorName: 'Dr. Priya Sharma', specialty: 'Cardiologist',
        date: futureDate, time: '10:30 AM', symptoms: 'Occasional chest tightness and mild breathlessness on exertion',
        mode: 'Video', status: 'Scheduled'
      },
      {
        user: user._id, doctorName: 'Dr. Rajesh Kumar', specialty: 'General Physician',
        date: new Date(Date.now() - 7 * 86400000), time: '09:00 AM',
        symptoms: 'Routine annual checkup', diagnosis: 'Overall health is satisfactory. Blood pressure slightly elevated.',
        prescription: 'Continue Amlodipine 5mg. Reduce sodium intake. Follow up in 3 months.',
        mode: 'In-Person', status: 'Completed'
      }
    ]);
    console.log('✅ Consultations created');

    // Create medications
    await Medication.create([
      {
        user: user._id, name: 'Amlodipine', dosage: '5mg', frequency: 'Once Daily',
        times: ['Morning (8:00 AM)'], prescribedBy: 'Dr. Rajesh Kumar',
        startDate: new Date(Date.now() - 30 * 86400000), instructions: 'Take with or without food',
        active: true
      },
      {
        user: user._id, name: 'Metformin', dosage: '500mg', frequency: 'Twice Daily',
        times: ['Morning (8:00 AM)', 'Evening (6:00 PM)'], prescribedBy: 'Dr. Anita Verma',
        startDate: new Date(Date.now() - 60 * 86400000), instructions: 'Take with meals',
        active: true
      },
      {
        user: user._id, name: 'Calcium + Vitamin D3', dosage: '1 tablet', frequency: 'Once Daily',
        times: ['Night (10:00 PM)'], prescribedBy: 'Dr. Suresh Patel',
        startDate: new Date(Date.now() - 90 * 86400000), instructions: 'Take after dinner',
        active: true
      }
    ]);
    console.log('✅ Medications created');

    console.log('\n🎉 Seed complete! Login with: demo@eldercare.com / demo123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
