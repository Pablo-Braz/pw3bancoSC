import pool from "../database/data.js";


export const cadastrar = async (categoriatipo , icone, data_cadastro, data_alteracao) => {    
    // Obter uma conexão do pool
    const cx = await pool.getConnection(); 
    try {
        // Desestruturar o objeto veiculo
        const { 
            tipo , 
            icone,
            data_cadastro, 
            data_alteracao} = categoria; 

        // Query para inserir um novo veículo
        const query = `INSERT INTO categoria (tipo , icone, data_cadastro, data_alteracao) VALUES (?, ?, ?, ?, )`;

        // Executar a query com os valores do categoria
        const [result] = await cx.query(query, [tipo , icone, data_cadastro, data_alteracao]);
    
        // Verificar se a inserção foi bem-sucedida
        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar categoria");
        } 
        // Retornar o ID do categoria inserido
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