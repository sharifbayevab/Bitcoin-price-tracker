import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'username',
    host: 'db',
    database: 'my_postgres',
    password: 'password123',
    port: 5432,
});

app.get('/api/bitcoin-prices', async (req, res) => {
    try {
        const { selectedPeriod, startDate, endDate } = req.query;

        function isValidDate(dateString) {
            const date = new Date(dateString);
            return date instanceof Date && !isNaN(date);
        }

        let query = 'SELECT * FROM bitcoin_prices';
        const params = [];
        let whereConditions = [];

        if (isValidDate(startDate)) {
            whereConditions.push('date >= $' + (params.push(startDate)));
        }

        if (isValidDate(endDate)) {
            whereConditions.push('date <= $' + (params.push(endDate)));
        }

        if (selectedPeriod) {
            const intervalCondition = `CAST(EXTRACT(DAY FROM date::timestamp - '1970-01-01'::timestamp) AS INTEGER) % ${parseInt(selectedPeriod)} = 0`;
            whereConditions.push(intervalCondition);
        }

        if (whereConditions.length) {
            query += ' WHERE ' + whereConditions.join(' AND ');
        }

        const response = await pool.query(query, params);
        res.json(response.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
