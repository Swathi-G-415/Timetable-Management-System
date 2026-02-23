const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Connection error", err));

const entrySchema = new mongoose.Schema({
    subject: String,
    staff: String,
    time: String,
    day: String
});

const Entry = mongoose.model('Entry', entrySchema);

app.get('/api/timetable', async (req, res) => {
    const entries = await Entry.find();
    res.json(entries);
});

app.post('/api/timetable', async (req, res) => {
    const newEntry = new Entry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
