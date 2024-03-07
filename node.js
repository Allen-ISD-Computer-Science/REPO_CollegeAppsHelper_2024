const sqlite3 = require('sqlite3').verbose();
//NOTE: This is only a temporary template that would connect to the database this is mainly serves as an example only.
// Open a database connection (or create a new one if not exist)
let db = new sqlite3.Database('colleges.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// Create a table
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT
)`);

// Insert some data
db.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['Pikachu', 30, 'ash@ketchum.com'], (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Pikachu added to the database.');
});

db.run(`INSERT INTO users (name, age, email) VALUES (?, ?, ?)`, ['LDR', 25, 'shades@ofcool.com'], (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('LDR added to the database.');
});

// Close the database connection 
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});
