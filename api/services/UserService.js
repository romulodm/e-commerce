const DB = require('../db');

module.exports = {
    modifyUser: () => {
        return new Promise((aceito, rejeitado) => {
            DB.query('SELECT * FROM adminaccounts', (error, results) => {
                if(error) {
                    rejeitado(error);
                    return;
                };
                aceito(results);
            });
        });
    }
}