const userModel = require('./models');

// Função para realizar o login de usuários
function login(req, res) {
    let { email, password } = req.body;

    userModel.getUser(email, password, (err, user) => {
        if (err || !user) {
            req.session.systemMessage = "Esse usuário não existe.";
            return res.render('index', { systemMessage: req.session.systemMessage });
        }

        if (email === "admin@gmail.com") {
            userModel.getAllUsers((err, users) => {
                if (err) {
                    console.error(err);
                    req.session.systemMessage = "Erro ao listar os usuários.";
                    return res.redirect('/');
                }

                req.session.currentUser = user;
                req.session.systemMessage = null;

                res.cookie('user_email', email);
                res.render('admin', { users: users, systemMessage: req.session.systemMessage });
            });
        } else if (user.length > 0) {
            req.session.currentUser = user[0];
            res.cookie('user_email', email);
            res.render('home', { currentUser: req.session.currentUser });
        } else {
            req.session.systemMessage = "Usuário e/ou senha inválidos.";
            return res.render('index', { systemMessage: req.session.systemMessage });
        }
    });
}

// Função de logout
function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.clearCookie('user_email');
            res.clearCookie('connect.sid');
            res.redirect('/');
        }
    });
}

// Função para exclusão de usuários
function deleteUser(req, res) {
    let email = req.params.email;
    if (email !== "admin@gmail.com") {
        userModel.deleteAnUser(email, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                req.session.systemMessage = "Usuário excluído com sucesso.";
            }

            userModel.getAllUsers((err, users) => {
                res.render('admin', { users: users, systemMessage: req.session.systemMessage });
            });
        });
    } else {
        userModel.getAllUsers((err, users) => {
            req.session.systemMessage = "Não é possível deletar o Administrador.";
            res.render('admin', { users: users, systemMessage: req.session.systemMessage });
        });
    }
}

// Função para registrar um usuário
function register(req, res) {
    let { name, email, password, confirmPassword } = req.body;
    userModel.getUser(email, password, (err, users) => {
        if (err) {
            console.error(err);
            req.session.systemMessage = "Erro ao verificar o email.";
            res.render('register', {systemMessage: req.session.systemMessage});
        } else {
            if (users.length > 0) {
                req.session.systemMessage = "Esse email já está cadastrado!";
                res.render('register', {systemMessage: req.session.systemMessage});
            } else {
                if (password === confirmPassword) {
                    userModel.registerAnUser(name, email, password, (err, newUser) => {
                        if (err) {
                            console.error(err);
                            req.session.systemMessage = "Erro ao cadastrar o usuário.";
                            res.render('register', {systemMessage: req.session.systemMessage});
                        } else {
                            userModel.getUser(email, password, (err, user) => {
                                req.session.currentUser = user[0];
                                res.cookie('user_email', email);
                                res.render('home', { currentUser: req.session.currentUser });
                            });
                        }
                    });
                } else {
                    req.session.systemMessage = "As senhas não coincidem!";
                    res.render('register', {systemMessage: req.session.systemMessage});
                }
            }
        }
    });
}

// Função para visualizar todos os cookies definidos
function viewCookies(req, res) {
    res.send(req.cookies);
}

module.exports = { 
    login, 
    register,
    logout, 
    deleteUser, 
    viewCookies
};