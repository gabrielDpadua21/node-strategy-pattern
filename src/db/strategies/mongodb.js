const ICrud = require('./interfaces/interfaceCrud');

class MongoDB extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log("Saved");
    }
}

module.exports = MongoDB;