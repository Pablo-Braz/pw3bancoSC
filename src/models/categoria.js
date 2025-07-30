import pool from "../database/data";

 export const cadastrar= async (categoria) => {
  const { tipo , icone, data_cadastro, data_alteracao } = categoria;
  const query = "INSERT INTO categoria (tipo , icone, data_cadastro, data_alteracao) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [tipo , icone, data_cadastro, data_alteracao];
  const result = await pool.query(query, values);
  return result.rows[0];
}