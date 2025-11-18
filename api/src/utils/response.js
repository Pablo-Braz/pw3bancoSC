// Função utilitária para estilizar mensagens com emojis
export function formatMessage(type, message) {
  const emojis = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warn: "⚠️"
  };
  return `${emojis[type] || ""} ${message}`;
}



// Mantemos a API antiga (success, created, noContent, notFound, error)
// mas aplicamos as mensagens estilizadas com emojis via formatMessage.

const sendResponse = (res, { success = true, statusCode = 200, message = 'Operação realizada com sucesso', data = null, quant_rows = null } = {}) => {
  return res.status(statusCode).json({
    success,
    statusCode,
    message: formatMessage(success ? 'success' : 'error', message),
    data,
    quant_rows: Array.isArray(data) ? data.length : quant_rows ?? (data ? 1 : 0)
  });
};

export const success = (res, { message = 'Operação realizada com sucesso', data = null } = {}) =>
  sendResponse(res, { success: true, statusCode: 200, message, data });

export const created = (res, { message = 'Recurso criado com sucesso', data = null } = {}) =>
  sendResponse(res, { success: true, statusCode: 201, message, data });

export const noContent = (res, { message = 'Operação concluída sem conteúdo' } = {}) =>
  res.status(204).json({ success: true, statusCode: 204, message: formatMessage('success', message), data: null, quant_rows: 0 });

export const notFound = (res, { message = 'Recurso não encontrado' } = {}) =>
  sendResponse(res, { success: false, statusCode: 404, message, data: null, quant_rows: 0 });

export const error = (res, { statusCode = 500, message = 'Erro interno do servidor', data = null } = {}) =>
  sendResponse(res, { success: false, statusCode, message, data });
