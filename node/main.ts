import express from 'express'

import morgan from 'morgan'

import dotenv from 'dotenv'

import { createConnection } from "typeorm";

import { indexRouter } from "./src/view/inedx";

dotenv.config();

createConnection().then(connection => {
    console.log('数据库连接成功！');
}).catch(error => {
    console.log('数据库连接失败:', error);
});

const app = express()

const port = process.env.ROOT_PORT

app.use(express.json())

app.use(morgan('combined'));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
})

app.use(indexRouter)

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`)
})