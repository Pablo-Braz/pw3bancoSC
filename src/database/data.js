import mysql from 'mysql2/promise';
import { db } from '../config/config.js';

const poll = mysql.createPool({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50,
    connectTimeout:10000,
});

export default poll;