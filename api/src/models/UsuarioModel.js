import pool from '../database/data.js';
import bcrypt from 'bcryptjs';

export const consultar = async (filtro = '') => {
    let cx;
    try {
        cx = await pool.getConnection();
    const cmdSql = 'SELECT id,nome,email FROM usuario WHERE nome LIKE ?;';
        const [dados, meta_dados] = await cx.query(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const consultarPorId = async (id) => {
    let cx;
    try {
        cx = await pool.getConnection();
    const cmdSql = 'SELECT id,nome,email FROM usuario WHERE id = ?;';
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const consultarPorEmail = async (email) => {
    let cx;
    try {
        cx = await pool.getConnection();
    const cmdSql = 'SELECT id,nome,email FROM usuario WHERE email = ?;';
        const [dados, meta_dados] = await cx.query(cmdSql, [email]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const login = async (email, senha)=>{
    let cx;
    try {
        cx = await pool.getConnection();
        const cmdSql = 'SELECT * FROM usuario WHERE email = ?;';
        const [result, meta_dados] = await cx.query(cmdSql, [email]);
        if(result[0]){
            let usuario = result[0];
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if(senhaValida){
                usuario.senha = "";
                return usuario
            }
        }
        return false;
    } 
    catch (error) {
        throw error;     
    }
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
}

export const cadastrar = async (usuario) => {
    let cx;
    try {        
        const {nome,email,senha} = usuario;
        const cmdSql = 'INSERT INTO usuario (nome,email,senha) VALUES (?, ?, ?);';
        cx = await pool.getConnection();
        const hashSenha = await bcrypt.hash(senha, 10);
        await cx.query(cmdSql, [nome,email,hashSenha]);

        const [result] = await cx.query('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;
 
    const [dados, meta_dados] = await cx.query('SELECT id,nome,email FROM usuario WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    } finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const alterar = async (usuario) => {
    let cx;
    try {
        const camposPermitidos = ['nome', 'email', 'senha'];
        const valores = [];
        let sets = [];
        for (const key of camposPermitidos) {
            if (usuario[key] !== undefined) {
                if (key === 'senha') {
                    const hashSenha = await bcrypt.hash(usuario[key], 10);
                    valores.push(hashSenha);
                } else {
                    valores.push(usuario[key]);
                }
                sets.push(`${key} = ?`);
            }
        }
        if (sets.length === 0) return [];
        const cmdSql = `UPDATE usuario SET ${sets.join(', ')} WHERE id = ?;`;
        valores.push(usuario.id);
        cx = await pool.getConnection();     
        const [execucao] = await cx.query(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados, meta_dados] = await cx.query('SELECT id,nome,email FROM usuario WHERE id = ?;', usuario.id);
            return dados;
        }
        return [];

    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};

export const deletar = async (id) => {
    let cx;
    try {
        const cmdSql = 'DELETE FROM usuario WHERE id = ?;';
        cx = await pool.getConnection();
        const [dados, meta_dados] = await cx.query(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 
    finally {
        if (cx) cx.release(); // Libere a conexão após o uso
    }
};