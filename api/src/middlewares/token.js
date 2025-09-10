// Importa todas as exportações de Token.js como um objeto Token
import * as Token from '../models/Token.js';

// Inicializa um array vazio para armazenar sessões
let sessions = [];

// Define uma função middleware de autenticação
export const middlewareAutenticacao = async (req, res, next) => {
    try {        
        // Obtém o cabeçalho de autorização da requisição
        const authorizationHeader = req.headers['authorization'];
        
        // Verifica se o cabeçalho de autorização está presente
        if (!authorizationHeader) {
            // Retorna uma resposta de erro se o cabeçalho de autorização não for fornecido
            const retorno = {
                success: false,
                quant: 0,
                data: [],
                status:498,
                erro: 'Token de autenticação não fornecido'
            };
            return res.status(498).json(retorno);
        }

        // Divide o cabeçalho de autorização em duas partes: o tipo do token e o token em si
        const [bearer, token] = authorizationHeader.split(' ');

        // Verifica se o formato do token é válido
        if (bearer !== 'Bearer' || !token) {
            // Retorna uma resposta de erro se o formato do token for inválido
            const retorno = {
                success: false,
                quant: 0,
                data: [],
                status:498,
                erro: 'Formato de token inválido'
            };
            return res.status(498).json(retorno);
        }

        // Obtém o ID de login a partir do token
        const [loginId] = token.split('.');
        // Encontra o índice da sessão correspondente ao usuário
        let sessionIndex = sessions.findIndex(session => session.usuario == loginId);
        // Obtém a sessão do array de sessões
        let session_id = sessions[sessionIndex];
        // Obtém a hora atual
        let horaAtual = new Date();

        // Verifica se a sessão foi encontrada
        if(session_id){
            // Define um tempo limite de uma hora a partir da hora atual
            let fimTemp = new Date(horaAtual.getTime()+3600000);
            // Verifica se a validade da sessão é menor que o tempo limite
            if(session_id.validade < fimTemp){
                // Remove a sessão expirada do array de sessões
                sessions.splice(sessionIndex, 1);
                session_id = null;
            }
        }

        // Se a sessão não foi encontrada ou foi removida
        if(!session_id){
            // Consulta o token para obter a sessão
            session_id = await Token.consultar(token);
            if(session_id){
                // Verifica se a validade da sessão é maior que a hora atual
                if(session_id.validade > new Date()){
                    // Calcula o tempo restante para a sessão expirar em minutos
                    let tempoParaExpirar = (session_id.validade.getTime() - horaAtual.getTime())/60000;
                    if(tempoParaExpirar < 60){
                        // Se a sessão expira em menos de uma hora, estende a validade em 24 horas
                        let horas_extra_token = 24;
                        const t_ex = await Token.extender(loginId,horas_extra_token);
                    }
                    else{
                        // Adiciona a sessão ao array de sessões
                        sessions.push(session_id);
                    }
                }
                else{
                    // Retorna uma resposta de erro se o token estiver expirado
                    let retorno = {
                        success: false,
                        quant: 0,
                        data: [],
                        status:498,
                        erro: 'Token de autenticação expirou'
                    }
                    return res.status(498).json(retorno);
                }

            }
        }
        
        // Se a sessão é válida
        if(session_id){
            // Define o loginId na requisição para uso posterior
            req.loginId = loginId;
            // Chama o próximo middleware
            next();
        }
        else{
            // Retorna uma resposta de erro se o token for inválido
            let retorno = {
                success: false,
                quant: 0,
                data: [],
                status:498,
                erro: 'Token de autenticação inválido'
            }
            return res.status(498).json(retorno);
        }
               
    } catch (error) {
        // Trata erros internos do servidor e retorna uma resposta de erro
        console.error(error);
        let retorno = {
            success: false,
            quant: 0,
            data: [],
            status:500,
            erro: 'Erro interno do servidor: '+ error
        }
        return res.status(500).json(retorno);
    }
};

