const DB = require('../db');

module.exports = {
    modifyUsername: (id, username) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE users SET username=? WHERE id=?', 
            
            [username, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }

                acepted(results);

            })
        });
    },

    modifyPassword: (id, password) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE users SET password=? WHERE id=?', 
            
            [password, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }

                acepted(results);

            })
        });
    },

    modifyEmail: (id, email) => {
        return new Promise((acepted, rejected) => {
            DB.query('UPDATE users SET email=? WHERE id=?', 
            
            [email, id], (error, results) => {
                if(error) { 
                    rejected(error); 
                    return;
                }

                acepted(results);

            })
        });
    },

    deleteUser: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('DELETE FROM users WHERE id=?', [id], (error,results) =>{
                if(error) { 
                    rejected(error); 
                    return;
                }
                acepted(results);
            });
        });
    },

    getUser: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
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

    getAllUsers: (id) => {
        return new Promise((acepted, rejected) => {
            DB.query('SELECT * FROM users', [id], (error, results) => {
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