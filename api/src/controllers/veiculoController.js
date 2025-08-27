export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        // Verifica se o veículo existe
        const veiculoExistente = await Veiculo.consultarPorId(id);
        if (!veiculoExistente) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Veículo não encontrado'
            });
        }
        // Deleta o veículo
        const resultado = await Veiculo.deletar(id);
        if (resultado.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Não foi possível deletar o veículo'
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Veículo deletado com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao deletar veículo',
            error: error.message
        });
    }
};
import * as Veiculo from '../models/VeiculoModel.js';

export const cadastrar = async (req, res) => {
    try {
        const veiculo = req.body;

        // Verificar se o corpo da requisição contém os dados necessários
        if (!veiculo || Object.keys(veiculo).length === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do veículo não fornecidos'
            });
        }
        // Validar os dados do veículo
        if (!veiculo.modelo || !veiculo.ano_fabricacao || !veiculo.ano_modelo || !veiculo.cor || !veiculo.num_portas || !veiculo.categoria_id || !veiculo.montadora_id || !veiculo.tipo_cambio || !veiculo.tipo_direcao) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Dados do veículo incompletos ou inválidos'
            });
        }
        
        const novoVeiculo = await Veiculo.cadastrar(veiculo);   
        res.status(201).json({
            success: true,
            status: 201,
            message: 'Veículo cadastrado com sucesso',
            veiculoId: novoVeiculo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao cadastrar veículo',
            error: error.message
        });
    }
};

export const consultar = async (req, res) => {
     res.status(200).json({
            success: true,
            status: 200,
            message: 'Em desenvolvimentosss'
        });
}

export const consultarid = async (req, res) => {
    try {
        const id = req.params.id;
        const veiculo = await Veiculo.consultarPorId(id);
        if (!veiculo) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Veículo não encontrado'
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            data: veiculo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao consultar veículo por id',
            error: error.message
        });
    }
};

export const consultarTodos = async (req, res) => {
    const search = req.query.search || '';
    try {
    const veiculos = await Veiculo.consultarTodos(search);
        // Verificar se foram encontrados veículos
        if (veiculos.length === 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Nenhum veículo encontrado',
                data: []
            });
        }
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Veículos consultados com sucesso',
            data: veiculos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao consultar veículos',
            error: error.message
        });
    }
};

export const editar = async (req, res) => {
    try {
        const id = req.params.id;
        const dadosAtualizados = req.body;

        // Verifica se o veículo existe
        const veiculoExistente = await Veiculo.consultarPorId(id);
        if (!veiculoExistente) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: 'Veículo não encontrado'
            });
        }

        // Atualiza o veículo
        const resultado = await Veiculo.editar(id, dadosAtualizados);
        if (resultado.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Não foi possível atualizar o veículo'
            });
        }

        // Retorna o veículo atualizado
        const veiculoAtualizado = await Veiculo.consultarPorId(id);
        res.status(200).json({
            success: true,
            status: 200,
            message: 'Veículo atualizado com sucesso',
            data: veiculoAtualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao editar veículo',
            error: error.message
        });
    }
};

