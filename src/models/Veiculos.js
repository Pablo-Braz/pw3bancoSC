import pool from "../database/data";

 export const cadastrar= async (veiculo) => {
  const { modelo, marca, ano, preco } = veiculo;
  const query = "INSERT INTO veiculos (modelo, marca, ano, preco) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [modelo, marca, ano, preco];
  const result = await pool.query(query, values);
  return result.rows[0];
}