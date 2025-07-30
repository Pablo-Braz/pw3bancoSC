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
        const [result] = await cx.query(query, [modelo,ano_fabricacao,ano_modelo,cor,num_portas,fotos,categoria_id,montadora_id,tipo_cambio,tipo_direcao]);
    
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