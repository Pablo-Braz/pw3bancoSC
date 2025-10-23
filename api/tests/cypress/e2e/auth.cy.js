describe('Cadastro e Login', () => {
  it('Deve cadastrar um novo usuário', () => {
    cy.request('POST', 'http://localhost:3000/usuario', {
      nome: 'Teste',
      email: 'teste@teste.com',
      senha: '123456',
      cargo: 'user'
    }).its('status').should('eq', 201);
  });

  it('Deve logar com usuário cadastrado', () => {
    cy.request('POST', 'http://localhost:3000/usuario/login', {
      email: 'teste@teste.com',
      senha: '123456'
    }).its('status').should('eq', 200);
  });
});