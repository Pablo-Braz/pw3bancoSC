# Sistema LV

Este projeto é um sistema para divulgação e venda de veículos, permitindo que proprietários publiquem seus veículos e recebam ofertas de compra de outros usuários.

## Arquitetura

- **Backend:** API RestFull desenvolvida para gerenciar usuários, veículos e ofertas.
- **Frontend:** Aplicativo React Native para interação dos usuários.
- **Infraestrutura:** Todo o sistema é executado sobre Docker, facilitando a configuração e o deploy.

## Funcionalidades

- Cadastro e autenticação de usuários
- Publicação de veículos para venda
- Recebimento e gerenciamento de ofertas de compra

## API (Principais Rotas)

- **Autenticação / Usuários** (`/usuario`, `/usuario/login`): cadastro, login e gestão de perfis.
- **Instituições** (`/instituicao`, `/instituicoes`): cadastro e manutenção de instituições vinculadas a um organizador.
- **Vínculo Usuário-Instituição** (`/instituicao-usuario`): solicitações, aprovações e listagens de vínculos.
- **Categorias** (`/categoria`, `/categorias`): CRUD completo de categorias de veículos.
- **Veículos** (`/veiculo`, `/veiculos`): cadastro, consulta, atualização e remoção de veículos filtrados por usuário logado.

## Como executar

1. Clone o repositório.
2. Execute `docker-compose up` para iniciar todos os serviços.
3. Acesse o app React Native para utilizar o sistema.

## Requisitos

- Docker
- Docker Compose

## Observações

Este sistema foi desenvolvido para facilitar a negociação de veículos entre usuários, proporcionando uma experiência segura e eficiente.
