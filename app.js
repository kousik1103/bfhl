const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Your user details
const USER_ID = "your_name_ddmmyyyy";
const EMAIL = "your_email@example.com";
const ROLL_NUMBER = "21BDS0039";

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            throw new Error('Invalid input: data must be an array');
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        const highestLowercaseAlphabet = alphabets
            .filter(char => char.toLowerCase() === char)
            .sort((a, b) => b.localeCompare(a))
            .slice(0, 1);

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});