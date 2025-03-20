import express from 'express';
import mysql from 'mysql2';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

const swaggerDocument = YAML.parse(fs.readFileSync('./user-api.yml', 'utf8'));

const db = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    database: 'openapi', 
    password: ""
});

const app = express();
app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/v1/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

app.get('/v1/user/:id', (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.put('/v1/user/:id', (req, res) => {
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
});

app.delete('/v1/user/:id', (req, res) => {
    db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.post('/v1/user', (req, res) => {
    const { name, email, age } = req.body;
    db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));