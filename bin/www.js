const app = require('../index');
const syncDb = require('./sync-db.js');
const models = require('../models.js');

syncDb().then(() => {

    console.log('Sync DB');

    const port = 30000;
    app.listen(port, () => {
        console.log(`Server Started :: port - ${port}`);
    });
});
