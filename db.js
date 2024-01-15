let mongoose = require('mongoose');
const server = '127.0.0.1:27017';

const database = 'Person';

class Database {
    constructor() {
        this.connect()
}
connect() {
            mongoose.connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successfuly');
            })
            .catch(err => {
                console.error('Error connecting');
            })
        }
    }

    module.exports = new Database()