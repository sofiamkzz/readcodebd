const connection = require('./db');

// Função para buscar todos os usuários
function getAllUsers(callback) {
    const sql = 'SELECT * FROM users';
    connection.query(sql, callback);
}

// Função para buscar um usuário por e-mail e senha
function getUser(email, password, callback) {
    if (email && password) {
        const sql = 'SELECT * FROM users WHERE email = ? AND LOWER(password) = ?';
        connection.query(sql, [email, password], callback);
    } else {
        callback(null, []);
    }
}

// Função para registrar um usuário
function registerAnUser(name, email, password, callback) {
    if (name && email && password) {
        email = email.toLowerCase();
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.query(sql, [name, email, password], callback);
    } else {
        callback(null, []);
    }
}

// Função para excluir um usuário pelo e-mail
function deleteAnUser(email, callback) {
    if (email) {
        const sql = 'DELETE FROM users WHERE email = ?';
        connection.query(sql, [email], callback);
    } else {
        callback(null, []);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    registerAnUser,
    deleteAnUser
};