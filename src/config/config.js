import dotenv from 'dotenv';

dotenv.config();

const developmentConfig = {
    host : "localhost",
    port: 3306,
    name: "lv_veiculos",
    dialect: "mysql",
    user:"root",
    password: "",
}

const productionConfig = {
    host : process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}

export const db = process.env.MODE_ENV === 'production' ? productionConfig : developmentConfig;