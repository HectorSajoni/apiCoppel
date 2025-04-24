import mysql from 'mysql2/promise'
import {
    DB_PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASSWORD,

    DB2_PORT,
    DB2_HOST,
    DB2_NAME,
    DB2_USER,
    DB2_PASSWORD,
} from './config.js'

const db = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
});
export default db;

export const db2 = await mysql.createConnection({
    host: DB2_HOST,
    user: DB2_USER,
    password: DB2_PASSWORD,
    database: DB2_NAME,
    port: DB2_PORT
});