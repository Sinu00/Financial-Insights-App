# Nasar AlOtaibi Pvt Ltd - Expense Tracker

...

## Getting Started
...

### Set Up PostgreSQL Locally:
1. Create a PostgreSQL database locally named 'world'.
2. Update PostgreSQL connection details in the `index.js` file.

### Set Up PostgreSQL on Render:
1. Create a PostgreSQL database on Render.
2. Add the external connection string to `.env` file:
    ```env
    DBConnLink=your-connection-string
    ```

### Import Sample Data:
1. Navigate to the 'data' folder.
2. Two CSV files, `income.csv` and `expense.csv`, are provided.
3. Import these files into your PostgreSQL database to create two tables, 'expense' and 'income':
    ```bash
    psql -h your-render-db-host -U your-render-db-user -d your-render-db-name -a -f expense.csv
    psql -h your-render-db-host -U your-render-db-user -d your-render-db-name -a -f income.csv
    ```

### Run the Application Locally:
```bash
node index.js
Access the Application: Open your browser and navigate to http://localhost:3000.

## Dependencies
- Express
- Body-parser
- pg (PostgreSQL client for Node.js)
- EJS (Embedded JavaScript templates)
- dotenv
- pdfkit

## Contributing
Feel free to contribute to the development of this project. Submit bug reports, suggest new features, or create pull requests.
```

Make sure to replace placeholders like `your-username`, `your-repo`, and `your-connection-string` with the actual values
