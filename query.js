import mysql from 'mysql2';

const db = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    database: 'openapi', 
    password: ""
});

export const getUsers = (req , res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
}

export const getUserById = (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
}

export const updateUserById = (req, res) => {
    const { name, email, age } = req.body;
    db.query(
        'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?', 
        [name, email, age, req.params.id], 
        (err, results) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json(results);
        }
    )
}

export const deleteUserById = (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
}

export const createUser = (req, res) => {
    const { name, email, age } = req.body;
    db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
}