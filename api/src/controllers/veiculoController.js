import * as Veiculo from '../models/VeiculoModel.js';
import * as responses from '../utils/response.js';

export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        // Verifica se o veículo existe e pertence ao usuário
        const veiculoExistente = await Veiculo.consultarPorId(id, req.loginId);
        if (!veiculoExistente) {
            return responses.notFound(res, { message: 'Veículo não encontrado' });
        }
        // Deleta o veículo
        const resultado = await Veiculo.deletar(id, req.loginId);
        if (resultado.affectedRows === 0) {
            return responses.error(res, { statusCode: 400, message: 'Não foi possível deletar o veículo' });
        }
        return responses.success(res, { message: 'Veículo deletado com sucesso' });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: 'Erro ao deletar veículo',
            error: error.message
        });
    }
};

export const cadastrar = async (req, res) => {
    try {
    console.log('=== INICIO CADASTRO VEICULO ===');
    console.log('Body recebido:', req.body);
    console.log('Usuario autenticado:', req.loginId);
        
        const veiculo = req.body;

        // Verificar se o corpo da requisição contém os dados necessários
        if (!veiculo || Object.keys(veiculo).length === 0) {
            console.log('ERRO: Dados do veículo não fornecidos');
            return responses.error(res, { statusCode: 400, message: 'Dados do veículo não fornecidos' });
        }
        
        // Validar os dados do veículo
        if (!veiculo.modelo || !veiculo.ano_fabricacao || !veiculo.ano_modelo || !veiculo.cor || !veiculo.num_portas || !veiculo.categoria_id || !veiculo.montadora_id || !veiculo.tipo_cambio || !veiculo.tipo_direcao) {
            console.log('ERRO: Dados incompletos', {
                modelo: !!veiculo.modelo,
                ano_fabricacao: !!veiculo.ano_fabricacao,
                ano_modelo: !!veiculo.ano_modelo,
                cor: !!veiculo.cor,
                num_portas: !!veiculo.num_portas,
                categoria_id: !!veiculo.categoria_id,
                montadora_id: !!veiculo.montadora_id,
                tipo_cambio: !!veiculo.tipo_cambio,
                tipo_direcao: !!veiculo.tipo_direcao
            });
            return responses.error(res, { statusCode: 400, message: 'Dados do veículo incompletos ou inválidos' });
        }

        // Adicionar o ID do usuário logado
        veiculo.usuario_id = req.loginId;
        console.log('Dados completos para cadastro:', veiculo);
        
        const novoVeiculo = await Veiculo.cadastrar(veiculo);
        console.log('Veículo cadastrado com ID:', novoVeiculo);
        console.log('=== FIM CADASTRO VEICULO ===');
        return responses.created(res, { message: 'Veículo cadastrado com sucesso', data: { veiculoId: novoVeiculo } });
    } catch (error) {
        console.error('ERRO NO CADASTRO:', error);
        return responses.error(res, { statusCode: 500, message: 'Erro ao cadastrar veículo', data: error.message });
    }
};

export const consultar = async (req, res) => {
    return responses.success(res, { message: 'Em desenvolvimento' });
}

export const consultarid = async (req, res) => {
    try {
        const id = req.params.id;
        const veiculo = await Veiculo.consultarPorId(id, req.loginId);
        if (!veiculo) {
            return responses.notFound(res, { message: 'Veículo não encontrado' });
        }
        return responses.success(res, { data: veiculo });
    } catch (error) {
        return responses.error(res, { statusCode: 500, message: 'Erro ao consultar veículo por id', data: error.message });
    }
};

export const consultarTodos = async (req, res) => {
    const search = req.query.search || '';
    try {
    const veiculos = await Veiculo.consultarTodos(search, req.loginId);
        // Verificar se foram encontrados veículos
        if (veiculos.length === 0) {
            return responses.notFound(res, { message: 'Nenhum veículo encontrado', data: [] });
        }
        return responses.success(res, { message: 'Veículos consultados com sucesso', data: veiculos });
    } catch (error) {
        return responses.error(res, { statusCode: 500, message: 'Erro ao consultar veículos', data: error.message });
    }
};

export const editar = async (req, res) => {
    try {
        const id = req.params.id;
        const dadosAtualizados = req.body;

        // Verifica se o veículo existe e pertence ao usuário
        const veiculoExistente = await Veiculo.consultarPorId(id, req.loginId);
        if (!veiculoExistente) {
            return responses.notFound(res, { message: 'Veículo não encontrado' });
        }

        // Atualiza o veículo
        const resultado = await Veiculo.editar(id, dadosAtualizados, req.loginId);
        if (resultado.affectedRows === 0) {
            return responses.error(res, { statusCode: 400, message: 'Não foi possível atualizar o veículo' });
        }

        // Retorna o veículo atualizado
        const veiculoAtualizado = await Veiculo.consultarPorId(id, req.loginId);
        return responses.success(res, { message: 'Veículo atualizado com sucesso', data: veiculoAtualizado });
    } catch (error) {
        return responses.error(res, { statusCode: 500, message: 'Erro ao editar veículo', data: error.message });
    }
};

