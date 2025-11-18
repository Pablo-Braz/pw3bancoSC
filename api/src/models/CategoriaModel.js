import pool from '../database/data.js';

export const cadastrar = async (categoria) => {
  const cx = await pool.getConnection();
  try {
    const query = 'INSERT INTO categoria (nome, descricao) VALUES (?, ?)';
    const [result] = await cx.query(query, [categoria.nome, categoria.descricao]);
    return result.insertId;
  } finally {
    if (cx) cx.release();
  }
};

export const listar = async (search = '') => {
  const cx = await pool.getConnection();
  try {
    let query = 'SELECT id, nome, descricao FROM categoria';
    const params = [];
    if (search) {
      query += ' WHERE nome LIKE ? OR descricao LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }
    const [rows] = await cx.query(query, params);
    return rows;
  } finally {
    if (cx) cx.release();
  }
};

export const buscarPorId = async (id) => {
  const cx = await pool.getConnection();
  try {
    const query = 'SELECT id, nome, descricao FROM categoria WHERE id = ?';
    const [rows] = await cx.query(query, [id]);
    return rows[0] || null;
  } finally {
    if (cx) cx.release();
  }
};

export const atualizar = async (id, dados) => {
  const cx = await pool.getConnection();
  try {
    const query = 'UPDATE categoria SET nome = ?, descricao = ? WHERE id = ?';
    const [result] = await cx.query(query, [dados.nome, dados.descricao, id]);
    return result.affectedRows > 0;
  } finally {
    if (cx) cx.release();
  }
};

export const deletar = async (id) => {
  const cx = await pool.getConnection();
  try {
    const query = 'DELETE FROM categoria WHERE id = ?';
    const [result] = await cx.query(query, [id]);
    return result.affectedRows > 0;
  } finally {
    if (cx) cx.release();
  }
};
