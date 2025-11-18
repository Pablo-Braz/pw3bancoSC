const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_API;

export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/usuario/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Erro ao efetuar login');
  }

  return json.data; // { token, usuario, ... }
}

export async function register({ nome, email, senha, cargo, avatar }) {
  const res = await fetch(`${BASE_URL}/usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, cargo, avatar }),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Erro ao cadastrar usuário');
  }

  return json; // mantém message e data
}
