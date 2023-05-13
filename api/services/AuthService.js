const DB = require("../db");

module.exports = {
    registerUser: (user) => {
        console.log("toaquiiiiiii")
        return new Promise((acepted, rejected) => {
            DB.query('INSERT INTO users (username, password, email) values (?,?,?)', 
            
            [user.username, user.password, user.email], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }

                acepted(results.insertCodigo);

            })
        });
    },

    findUser: (username) => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
                if(error) {
                    rejected(error); 
                    return;
                }
                if(results.length > 0){
                    acepted(results[0]);
                }
                else{
                    acepted(false);
                }
            })
        });
    },

    getId: (username) => {
        return new Promise((aceito, rejeitado) => {
            DB.query('SELECT Id FROM users WHERE username = ?', [username], (error, results) => {
                if(error) {
                    rejeitado(error); 
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                }
                else{
                    aceito(false);
                }
            })
        });
    },




}