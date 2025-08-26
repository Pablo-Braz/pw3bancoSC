export const consultarPorId = async (id) => {
    const cx = await pool.getConnection();
    try {
        const query = 'SELECT * FROM veiculo WHERE id = ?';
        const [rows] = await cx.query(query, [id]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    } finally {
        if (cx) {
            cx.release();
        }
    }
};
import pool from "../database/data.js";


export const cadastrar = async (veiculo) => {    
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Desestruturar o objeto veiculo
        const { 
            modelo,
            ano_fabricacao,
            ano_modelo,
            cor,
            num_portas,
            fotos,
            categoria_id,
            montadora_id,
            tipo_cambio,
            tipo_direcao } = veiculo; 

        // Query para inserir um novo veículo
        const query = `INSERT INTO veiculo (modelo, ano_fabricacao, ano_modelo, cor, num_portas, fotos, categoria_id, montadora_id, tipo_cambio, tipo_direcao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Executar a query com os valores do veículo
        const [result] = await cx.query(query,[modelo,ano_fabricacao,ano_modelo,cor,num_portas,fotos,categoria_id,montadora_id,tipo_cambio,tipo_direcao]);
    
        // Verificar se a inserção foi bem-sucedida
        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar veículo");
        } 
        // Retornar o ID do veículo inserido
        return result.insertId; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally{
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
}

export const consultarTodos = async (search) => {
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Query para consultar todos os veículos
        let query = `SELECT * FROM veiculo`;
        let params = [];

        // Verificar se há um termo de pesquisa
        if (search) {
            query += ` WHERE modelo LIKE ?`;
            params.push(`%${search}%`);
        }

        // Executar a query com os parâmetros
        const [rows] = await cx.query(query, params);
        
        // Retornar os resultados da consulta
        return rows; 
    } catch (error) {
        // Lançar o erro para ser tratado pelo chamador
        throw error; 
    } finally {
        if (cx) {
            cx.release(); // Liberar a conexão de volta ao pool
        }
    }
} 