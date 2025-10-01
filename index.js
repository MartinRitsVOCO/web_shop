import express, { json, urlencoded } from 'express';

// import articleRouter from './routes/article.js';
// import authorRouter from './routes/author.js';

import sequelize from './util/db.js';

const app = express();
const _PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// app.use('/api/article', articleRouter);
// app.use('/api/author', authorRouter);

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection successful.")
    })
    .catch(error => {
        console.error('Database connection failed.', error)
    })

app.get('/', (req, res) => {
    res.send('<h1>Web Shop</h1>')
})

app.listen(_PORT, () => {
    console.log(`Server is running on http://localhost:${_PORT}`);
});