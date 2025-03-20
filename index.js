import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

import { 
    getUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById, 
    createUser 
} from './query.js';

const swaggerDocument = YAML.parse(fs.readFileSync('./user-api.yml', 'utf8'));



const app = express();
app.use(express.json());

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/v1/users', getUsers);
app.get('/v1/user/:id', getUserById);
app.put('/v1/user/:id', updateUserById);
app.delete('/v1/user/:id', deleteUserById);
app.post('/v1/user', createUser);

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));