import bycript from 'bcryptjs';
import db from '../db/connection.js'
import pool from "../database/data.js";

export const cadastrar = async (usuario,cx=null) =>{
    let cxlocal = cx;
    if(!cxlocal){
        cxlocal = await pool.getConnection();
    }
    try {
        const {  email, senha, nome, avatar } = usuario;
        const usuarioExistente = await consultarPorEmail(email);
        if (usuarioExistente) {
            throw new Error('Email já cadastrado');
        }

        // Hash da senha
        const salt = await bycript.genSalt(10);
        const senhaHash = await bycript.hash(senha, salt);

        const query = `INSERT INTO usuario ( email, senha, nome, avatar ) VALUES (?, ?, ?, ?)`;
        const [result] = await cxlocal.query(query, [ email, senhaHash, nome, avatar]);

            if (result.affectedRows === 0) {
                throw new Error("Erro ao cadastrar usuário");
            }
         const usuarioCadastrado = await consultarPorID(result.insertId);
         usuarioCadastrado.senha = undefined;
         return usuarioCadastrado;
    } catch (error) {
        throw error;
    } finally {
        if (!cx && cxlocal) {
            cxlocal.release();
        }
    }
}

export const consultarPorEmail = async (email,cx=null) => {
    let cxlocal = cx;
    if(!cxlocal){
        cxlocal = await pool.getConnection();
    }
    
    try {
        const query = 'SELECT * FROM usuario WHERE email = ?';
        const [rows] = await cxlocal.query(query, [email]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        if (!cxlocal && cxlocal) {
            cxlocal.release();
        }
    }
};

export const consultarPorID = async (id,cx=null) => {
    let cxlocal = cx;
    if(!cxlocal){
        cxlocal = await pool.getConnection();
    }
    try {
        const query = 'SELECT * FROM usuario WHERE id = ?';
        const [rows] = await cxlocal.query(query, [id]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
       if (!cxlocal && cxlocal) {
            cxlocal.release();
        }
    }
};

export const login = async (email, senha) => {
    const cx = await pool.getConnection();
    try {
        const usuario = await consultarPorEmail(email,cx);
        if (!usuario) {
            throw new Error('Usuário ou senha inválido');
        }
        const senhaValida = await bycript.compareSync(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Usuário ou senha inválido');
        }
        usuario.senha = undefined; // Remover a senha do objeto retornado
        return usuario;
    } catch (error) {
        throw error;
    } finally {
        if (cx) {
            cx.release();
        }
    }
}