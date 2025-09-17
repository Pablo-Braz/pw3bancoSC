# 📱 Postman - Loja Veículos API

## 📁 Arquivos Criados

- `environment.json` - Environment com variáveis (token, base_url, user_id, user_name)
- `collection.json` - Collection completa com todas as rotas e scripts automáticos

## 🚀 Como Importar no Postman VS Code

### Método 1: Importar Environment
1. Abra o Postman no VS Code
2. Clique em **"Import"**
3. Selecione o arquivo `postman/environment.json`
4. O environment "Loja Veículos" será criado automaticamente

### Método 2: Importar Collection Completa
1. Clique em **"Import"**
2. Selecione o arquivo `postman/collection.json`
3. Toda a collection será importada com scripts automáticos

## ⚡ Funcionalidades Automáticas

### 🔐 Token Automático
- Ao fazer **Login** ou **Cadastro**, o token é salvo automaticamente na variável `{{token}}`
- Todas as rotas protegidas usam `Authorization: Bearer {{token}}`

### 📊 Scripts de Teste
- **Login**: Verifica sucesso e salva token
- **Cadastro**: Salva token automaticamente
- **Testes de Segurança**: Verifica se rotas sem token retornam 401

### 🔄 Variáveis Disponíveis
- `{{base_url}}` - URL base da API
- `{{token}}` - Token de autenticação (salvo automaticamente)
- `{{user_id}}` - ID do usuário logado
- `{{user_name}}` - Nome do usuário logado

## 📋 Rotas Organizadas

### 🔓 Autenticação
- Login (salva token automaticamente)
- Cadastrar Usuário (salva token automaticamente)

### 🚗 Veículos (todas protegidas)
- Listar Veículos
- Cadastrar Veículo
- Ver Veículo por ID
- Editar Veículo
- Deletar Veículo

### 👤 Usuários (protegidas)
- Ver Usuário Logado
- Listar Usuários

### 🛡️ Testes de Segurança
- Requisições sem token (deve retornar 401)

## 🎯 Como Usar

1. **Importe os arquivos** no Postman
2. **Selecione o environment** "Loja Veículos"
3. **Execute Login** - token será salvo automaticamente
4. **Teste as rotas protegidas** - funcionarão automaticamente com o token
5. **Veja o Console** para confirmações de token salvo

## ✅ Exemplo de Uso

1. Execute: `POST Login` 
2. Console mostra: "🔐 Token salvo automaticamente!"
3. Execute: `GET Listar Veículos`
4. Funciona automaticamente com o token salvo!

## 🔧 Personalização

Para alterar email/senha padrão, edite os requests de Login e Cadastro no body.