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

app.get('/v1/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).send("Success");
        res.json(results);
    });
});