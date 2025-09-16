import * as Usuario from '../models/UsuarioModel.js';
import * as Token from '../models/Token.js';

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body || {};
        if (!email || !senha) {
            return res.status(400).json({ success: false, status: 400, erro: 'Email e senha são obrigatórios' });
        }

        const user = await Usuario.login(email, senha);
        if (!user) {
            return res.status(401).json({ success: false, status: 401, erro: 'Credenciais inválidas' });
        }

        const horas = 24;
        const sessao = await Token.criar(user.id, new Date(Date.now() + horas * 3600 * 1000));

        // Define cookie httpOnly com o token de sessão
        res.cookie('sid', sessao.chave_token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.MODE_ENV === 'production',
            maxAge: horas * 3600 * 1000
        });

        return res.status(200).json({
            success: true,
            status: 200,
            mensagem: 'Login realizado com sucesso',
            token: sessao.chave_token,
            usuario: { id: user.id, nome: user.nome, email: user.email }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ success: false, status: 500, erro: 'Erro interno do servidor' });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies?.sid || (req.headers.authorization?.split(' ')[1]);
        if (token) {
            const tokenData = await Token.consultar(token);
            if (tokenData?.usuario) {
                await Token.revogar(tokenData.usuario);
            }
        }
        res.clearCookie('sid');
        return res.status(200).json({ success: true, status: 200, mensagem: 'Logout realizado' });
    } catch (error) {
        console.error('Erro no logout:', error);
        return res.status(500).json({ success: false, status: 500, erro: 'Erro interno do servidor' });
    }
};

export const consultarLogado = async (req, res) => {
    if (!req.usuario) {
        return res.status(401).json({ success: false, status: 401, erro: 'Não autenticado' });
    }
    return res.status(200).json({ success: true, status: 200, data: req.usuario });
};

// Abaixo, handlers básicos utilizando o model de usuário
export const consultar = async (req, res) => {
    try {
        const filtro = req.query.search || '';
        const dados = await Usuario.consultar(filtro);
        return res.status(200).json({ success: true, status: 200, data: dados });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, erro: 'Erro ao consultar usuários' });
    }
};

export const consultarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const dados = await Usuario.consultarPorId(id);
        if (!dados || dados.length === 0) {
            return res.status(404).json({ success: false, status: 404, erro: 'Usuário não encontrado' });
        }
        return res.status(200).json({ success: true, status: 200, data: dados[0] });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, erro: 'Erro ao consultar usuário' });
    }
};

export const cadastrar = async (req, res) => {
    try {
        const novo = await Usuario.cadastrar(req.body || {});
        return res.status(201).json({ success: true, status: 201, data: novo });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, erro: 'Erro ao cadastrar usuário' });
    }
};

export const alterar = async (req, res) => {
    try {
        const usuario = { ...(req.body || {}), id: parseInt(req.params.id, 10) };
        const dados = await Usuario.alterar(usuario);
        return res.status(200).json({ success: true, status: 200, data: dados });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, erro: 'Erro ao alterar usuário' });
    }
};

export const deletar = async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.deletar(id);
        return res.status(200).json({ success: true, status: 200, mensagem: 'Usuário deletado' });
    } catch (error) {
        return res.status(500).json({ success: false, status: 500, erro: 'Erro ao deletar usuário' });
    }
};
