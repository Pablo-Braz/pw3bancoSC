// *** Configuração do banco de dados ****
import dotenv from 'dotenv';
dotenv.config();

const developmentConfig = {
    host: "localhost",
    port: 3306,
    name: "lv_veiculos",
    dialect: "mysql",
    user: "root",
    password: ""
};

const productionConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};

export const db = process.env.MODE_ENV === 'production' ? productionConfig : developmentConfig;