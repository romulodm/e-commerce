const DB = require("../db");

module.exports = {
    registerUser: (user) => {
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
    }
}