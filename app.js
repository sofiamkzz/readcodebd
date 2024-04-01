// Importar as dependências
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const controller = require('./controller');

// Configura o motor de visualização EJS
app.set('view engine', 'ejs');

// Middleware para servir os arquivos estáticos
app.use(express.static('public'));

// Middleware para analisar corpos de solicitação
app.use(bodyParser.urlencoded({ extended: true }));

// Adiciona o cookie-parser como middleware
app.use(cookieParser());

// Configuração do express-session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Rota para visualizar a tela de login de usuários
app.get('/', (req, res) => {
    res.render('index');
    
});

// Rota para visualizar a tela de registro de usuários
app.get('/register', (req, res) => {
    res.render('register');
});

// Rota para visualizar a homepage
app.get('/home', controller.login);

// Rota para visualizar todos os cookies definidos
app.get('/cookies', controller.viewCookies);

// Rota para logout
app.get('/logout', controller.logout);

// Rota para exclusão de usuários
app.get('/delete/:email', controller.deleteUser);

// Rota para processar os dados de login de usuários
app.post('/login', controller.login);

// Rota para processar os dados de registro de usuários
app.post('/register', controller.register);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
});
