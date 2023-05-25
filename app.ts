import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname+'/.env' });

// Configurações do OAuth
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const GRANT_TYPE = 'authorization_code';

// Criação do cliente OAuth2
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Função para obter o URL de autorização
function getAuthorizationUrl() {
  const scopes = ['email', 'profile'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes
  });
  return url;
}

// Função para obter o token de acesso
async function getAccessToken(code: string) {
    const { tokens } = await oauth2Client.getToken(code);
    return tokens;
}

// Exemplo de uso
const authorizationUrl = getAuthorizationUrl();
console.log('Abra o seguinte URL no navegador e autorize o aplicativo:', authorizationUrl);

// Após o usuário autorizar o aplicativo e receber o código de autorização, você pode chamar a função getAccessToken para obter o token de acesso.
const authorizationCode = `${REDIRECT_URI}`;
getAccessToken(authorizationCode)
  .then(tokens => {
    console.log('Token de acesso obtido com sucesso!');
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
  })
  .catch(err => {
    console.error('Erro ao obter o token de acesso:', err);
  });
