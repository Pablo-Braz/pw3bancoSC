import pool from '../database/data.js';
import crypto from 'crypto';

export const consultar = async (token) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT usuario, chave_token, validade FROM token WHERE chave_token = ? LIMIT 1;';
        const [dados] = await cx.query(cmdSql, [token]);
        return dados[0] || null;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

export const criar = async (usuario, validade, chave_token) => {
    let cx;
    try {
        const token = chave_token || crypto.randomBytes(32).toString('hex');
        cx = await pool.getConnection();
        const cmdSql = `INSERT INTO token (usuario, chave_token, validade)
                        VALUES (?, ?, ?)
                        ON DUPLICATE KEY UPDATE chave_token = VALUES(chave_token), validade = VALUES(validade);`;
        await cx.query(cmdSql, [usuario, token, new Date(validade)]);
        return { usuario, chave_token: token, validade: new Date(validade) };
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

export const extender = async (usuario, tempo_horas) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'UPDATE token SET validade = DATE_ADD(validade, INTERVAL ? HOUR) WHERE usuario = ?;';
        const [result] = await cx.query(cmdSql, [tempo_horas, usuario]);
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};

export const revogar = async (usuario) => {
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'DELETE FROM token WHERE usuario = ?;';
        await cx.query(cmdSql, [usuario]);
        return true;
    } catch (error) {
        throw error;
    } finally {
        if (cx) cx.release();
    }
};
