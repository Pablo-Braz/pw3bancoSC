// *** Configuração do banco de dados ****
import dotenv from 'dotenv';
dotenv.config();

const developmentConfig = {
    host: "db",
    port: 3306,
    name: "l_v",
    dialect: "mysql",
    user: "lv_user",
    password: "lv_password"
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