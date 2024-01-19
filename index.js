const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
require('dotenv').config();

const port = 3000;
const app = express();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
  });
  db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/addDataForm', (req, res) => {
    res.render('form');
});

app.post('/addData', async (req, res) => {
    try {
        const { sno, date, particular, amt, dataType } = req.body;
        const tableName = dataType === 'expense' ? 'expense' : 'income';
        const insertQuery = `INSERT INTO ${tableName} (sno, date, particular, amt) VALUES ($1, $2, $3, $4)`;
        await db.query(insertQuery, [sno, date, particular, amt]);

        res.redirect('/');
    } catch (error) {
        console.error('Error adding data to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Display the data
app.get('/', async (req, res) => {
    try {
        const expenseQuery = 'SELECT * FROM expense';
        const expenseResult = await db.query(expenseQuery);
        const expenseData = expenseResult.rows;
        const incomeQuery = 'SELECT * FROM income';
        const incomeResult = await db.query(incomeQuery);
        const incomeData = incomeResult.rows;

        res.render('index', { expenseData, incomeData });
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/analytics', async (req, res) => {
    try {
        const expenseTotalAmt = await db.query("SELECT amt FROM expense");
        const expenseData = expenseTotalAmt.rows.map(row => row.amt);

        const sumOfExpense = expenseData.reduce((total, value) => total + value, 0);

        const incomeTotalAmt = await db.query("SELECT amt FROM income");
        const incomeData = incomeTotalAmt.rows.map(row => row.amt);

        const sumOfIncome = incomeData.reduce((total, value) => total + value, 0);

        const totalProfit = Math.max(sumOfIncome - sumOfExpense, 0);
        const totalLoss = Math.max(sumOfExpense - sumOfIncome, 0);

        res.render('analytics.ejs', {
            expenseData,
            incomeData,
            totalProfit,
            totalLoss,
            sumOfExpense,
            sumOfIncome,
        });
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/removeExpense', async (req, res) => {
    try {
        const { sno } = req.body;
        const deleteQuery = 'DELETE FROM expense WHERE sno = $1';
        await db.query(deleteQuery, [sno]);
        res.redirect('/');
    } catch (error) {
        console.error('Error removing expense:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/removeIncome', async (req, res) => {
    try {
        const { sno } = req.body;
        const deleteQuery = 'DELETE FROM income WHERE sno = $1';
        await db.query(deleteQuery, [sno]);
        res.redirect('/');
    } catch (error) {
        console.error('Error removing expense:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
